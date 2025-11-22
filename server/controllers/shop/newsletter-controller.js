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
    console.log("Extracted email:", email);

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
    console.log(template.subject, template.html);

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

// controllers/shop/newsletter-controller.js
// const transporter = require("../../helpers/nodemailer"); // Adjust path as needed

// const newsletterSignup = async (req, res) => {
//   console.log('=== NEWSLETTER SIGNUP REQUEST ===');
//   console.log('Request body:', req.body);
//   console.log('Request headers:', req.headers);
//   console.log('Content-Type:', req.headers['content-type']);

//   try {
//     // Check if req.body exists
//     if (!req.body) {
//       console.log('❌ No request body received');
//       return res.status(400).json({
//         success: false,
//         message: 'No request body received'
//       });
//     }

//     const { email } = req.body;
//     console.log('Extracted email:', email);

//     if (!email) {
//       console.log('❌ Email is missing from request body');
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       console.log('❌ Invalid email format:', email);
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide a valid email address'
//       });
//     }

//     console.log('✅ Valid email received:', email);

//     // Try to send welcome email
//     try {
//       const mailOptions = {
//         from: '"Amalli Store" <dontreader23@gmail.com>',
//         to: email,
//         subject: 'Welcome to Amalli Newsletter! 🌟',
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2 style="color: #333;">Welcome to Amalli Newsletter!</h2>
//             <p>Thank you for subscribing to our newsletter.</p>
//             <p>We're excited to have you in our fashion community!</p>
//           </div>
//         `
//       };

//       await transporter.sendMail(mailOptions);
//       console.log('✅ Welcome email sent to:', email);

//     } catch (emailError) {
//       console.error('❌ Failed to send welcome email:', emailError);
//       // Continue with subscription even if email fails
//     }

//     // Save subscription to console for now
//     console.log('✅ Newsletter subscription successful:', email);

//     res.status(200).json({
//       success: true,
//       message: 'Successfully subscribed to our newsletter!'
//     });

//   } catch (error) {
//     console.error('❌ Newsletter signup error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Subscription failed. Please try again.'
//     });
//   }
// };

// module.exports = { newsletterSignup };
