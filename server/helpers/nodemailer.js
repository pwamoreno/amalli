const nodemailer = require("nodemailer");

const accountEmail = "dontreader23@gmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Try 587 instead of 465
  secure: false,
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

module.exports = { transporter };
