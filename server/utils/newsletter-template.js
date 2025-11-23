const getNewsletterTemplate = (subject, content, options = {}) => {
  const unsubscribeUrl = options.unsubscribeUrl || "#";

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
            <p>You're receiving this email because you subscribed to our newsletter.</p>
            <p><a href="${unsubscribeUrl}" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

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

const getUnsubscribeTemplate = () => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; font-size: 16px; }
            .checkmark {
              font-size: 60px;
              color: #4CAF50;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">✓</div>
            <h1>You've Been Unsubscribed</h1>
            <p>You will no longer receive emails from us.</p>
            <p>We're sorry to see you go!</p>
          </div>
        </body>
      </html>
    `;
};

module.exports = {
  getNewsletterTemplate,
  getWelcomeTemplate,
  getUnsubscribeTemplate,
};
