const getNewsletterTemplate = (subject, content) => {
  return {
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 40px 30px; background: #f9f9f9; }
          .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; }
          .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💎 Your Jewelry Newsletter</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="https://yourwebsite.com/unsubscribe" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// const getNewsletterTemplate = () => {
//   return {
//     subject: "💎 Welcome to Our Jewelry Newsletter!",
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body {
//             font-family: 'Georgia', serif;
//             line-height: 1.6;
//             color: #333;
//             margin: 0;
//             padding: 0;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             background: #ffffff;
//           }
//           .header {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             padding: 40px 20px;
//             text-align: center;
//           }
//           .header h1 {
//             margin: 0;
//             font-size: 32px;
//             font-weight: normal;
//           }
//           .content {
//             padding: 40px 30px;
//             background: #f9f9f9;
//           }
//           .welcome-text {
//             font-size: 18px;
//             margin-bottom: 20px;
//           }
//           .benefit-box {
//             background: white;
//             border-left: 4px solid #667eea;
//             padding: 15px 20px;
//             margin: 15px 0;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//           }
//           .benefit-box h3 {
//             margin: 0 0 8px 0;
//             color: #667eea;
//             font-size: 16px;
//           }
//           .benefit-box p {
//             margin: 0;
//             color: #666;
//             font-size: 14px;
//           }
//           .button {
//             background: #667eea;
//             color: white;
//             padding: 15px 40px;
//             text-decoration: none;
//             border-radius: 5px;
//             display: inline-block;
//             margin-top: 20px;
//             font-weight: bold;
//           }
//           .footer {
//             text-align: center;
//             padding: 20px;
//             color: #999;
//             font-size: 12px;
//             background: #f9f9f9;
//           }
//           .divider {
//             height: 1px;
//             background: #e0e0e0;
//             margin: 30px 0;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>✨ Welcome to Our Jewelry Collection ✨</h1>
//           </div>
//           <div class="content">
//             <p class="welcome-text">Hi there! 👋</p>
//             <p class="welcome-text">
//               Thank you for joining our exclusive jewelry newsletter! We're thrilled to have you as part of our community.
//             </p>

//             <div class="divider"></div>

//             <h2 style="color: #667eea; font-size: 22px;">What You'll Get:</h2>

//             <div class="benefit-box">
//               <h3>🎁 Exclusive Early Access</h3>
//               <p>Be the first to see and purchase our new jewelry collections before anyone else.</p>
//             </div>

//             <div class="benefit-box">
//               <h3>💰 Special Subscriber Discounts</h3>
//               <p>Enjoy exclusive deals and discounts available only to our newsletter subscribers.</p>
//             </div>

//             <div class="benefit-box">
//               <h3>✨ Style Tips & Trends</h3>
//               <p>Get expert jewelry styling advice and stay updated on the latest trends.</p>
//             </div>

//             <div class="benefit-box">
//               <h3>🎉 Birthday Surprises</h3>
//               <p>Receive special birthday gifts and exclusive offers during your special month.</p>
//             </div>

//             <div style="text-align: center; margin-top: 30px;">
//               <a href="https://yourwebsite.com/shop" class="button">Shop Our Collection</a>
//             </div>

//             <p style="margin-top: 30px; color: #666; font-size: 14px;">
//               Keep an eye on your inbox for weekly updates, special promotions, and stunning new pieces!
//             </p>
//           </div>

//           <div class="footer">
//             <p>You're receiving this email because you subscribed to our newsletter.</p>
//             <p>© 2024 Your Jewelry Company. All rights reserved.</p>
//             <p>
//               <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> |
//               <a href="#" style="color: #667eea; text-decoration: none;">Manage Preferences</a>
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `,
//   };
// };

const getWelcomeTemplate = () => {
  return {
    subject: "Welcome to Our Jewelry Newsletter!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 32px; font-weight: normal; }
          .content { padding: 40px 30px; background: #f9f9f9; }
          .benefit-box { background: white; border-left: 4px solid #667eea; padding: 15px 20px; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .benefit-box h3 { margin: 0 0 8px 0; color: #667eea; font-size: 16px; }
          .button { background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Welcome to Amalli Jewelry Newsletter ✨</h1>
          </div>
          <div class="content">
            <p style="font-size: 18px;">Hi there! 👋</p>
            <p>Thank you for joining our exclusive jewelry newsletter!</p>
            
            <h2 style="color: #667eea;">What You'll Get:</h2>
            
            <div class="benefit-box">
              <h3>🎁 Exclusive Early Access</h3>
              <p>Be the first to see new collections before anyone else.</p>
            </div>
            
            <div class="benefit-box">
              <h3>💰 Special Subscriber Discounts</h3>
              <p>Enjoy exclusive deals available only to subscribers.</p>
            </div>
            
            <div class="benefit-box">
              <h3>✨ Style Tips & Trends</h3>
              <p>Get expert jewelry styling advice and latest trends.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://amalli.vercel.app/shop/home" class="button">Shop Our Collection</a>
            </div>
          </div>
          <div class="footer">
            <p>© 2025 Amalli Jewelry. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

module.exports = { getNewsletterTemplate, getWelcomeTemplate };