const crypto = require("crypto");
const { transporter } = require("../../helpers/nodemailer");
const Newsletter = require("../../models/Newsletter");
const {
  getWelcomeTemplate,
  getNewsletterTemplate,
  getUnsubscribeTemplate,
} = require("../../utils/newsletter-template");

const newsletterSignup = async (req, res) => {
  try {
    if (!req.body) {
      // console.log("No request body received");
      return res.status(400).json({
        success: false,
        message: "No request body received",
      });
    }

    const { email } = req.body;
    // console.log("Extracted email:", email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({
          success: false,
          message: "Email already subscribed",
        });
      } else {
        // Reactivate subscription
        existingSubscriber.active = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
      }
    } else {
      // Create new subscriber
      await Newsletter.create({ email });
    }

    const template = getWelcomeTemplate();
    // console.log(template.subject, template.html);

    const mailOptions = {
      from: '"Amalli" <support@amallijewelry.com>',
      to: email,
      subject: template.subject,
      html: template.html,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ New subscriber added:", email);

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Error in newsletter signup:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
};

const sendNewsletter = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: "Subject and content are required",
      });
    }

    const newsletterSubscribers = await Newsletter.find({ active: true });

    if (newsletterSubscribers.length === 0) {
      return res.json({
        success: true,
        message: "No subscribers to send to",
        sent: 0,
      });
    }

    let successCount = 0;
    let failCount = 0;

    for (const subscriber of newsletterSubscribers) {
      try {
        const unsubscribeToken = crypto.randomBytes(32).toString("hex");
        subscriber.unsubscribeToken = unsubscribeToken;
        await subscriber.save();

        const template = getNewsletterTemplate(subject, content, {
          unsubscribeUrl: `${process.env.UNSUB_URL}/unsubscribe?token=${unsubscribeToken}`,
        });

        const mailOptions = {
          from: '"Amalli" <support@amallijewelry.com>',
          to: subscriber.email,
          subject: template.subject,
          html: template.html,
        };

        await transporter.sendMail(mailOptions);

        subscriber.lastEmailSent = new Date();
        await subscriber.save();

        successCount++;
        console.log(`✅ Sent to: ${subscriber.email}`);
      } catch (error) {
        failCount++;
        console.error(
          `❌ Failed to send to ${subscribers.email}:`,
          error.message
        );
      }
    }

    res.json({
      success: true,
      message: "Newsletter sent",
      sent: successCount,
      failed: failCount,
      total: newsletterSubscribers.length,
    });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to send newsletter" });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    if (subscriber.active === false) {
      return res
        .status(200)
        .json({ success: false, message: "Already unsubscribed" });
    }

    subscriber.active = false;
    await subscriber.save();

    res.json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    res.status(500).json({ success: false, message: "Failed to unsubscribe" });
  }
};

const unsubscribeWithToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("Invalid unsubscribe link");
    }

    const subscriber = await Newsletter.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res.status(404).send("Unsubscribe link is invalid or expired");
    }

    // if (!subscriber.active) {
    //   const html = getUnsubscribeTemplate('already');
    //   return res.send(html);
    // }

    subscriber.active = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    const html = getUnsubscribeTemplate();

    res.send(html);
  } catch (error) {
    console.error("Error unsubscribing:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
};

module.exports = {
  newsletterSignup,
  sendNewsletter,
  unsubscribe,
  unsubscribeWithToken,
};
