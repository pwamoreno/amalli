const { transporter } = require("../../helpers/nodemailer");
const Newsletter = require("../../models/Newsletter");
const { getWelcomeTemplate } = require("../../utils/newsletter-template");

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

module.exports = { newsletterSignup };