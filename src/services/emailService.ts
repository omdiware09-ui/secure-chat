/**
 * Email Service - Handles all email notifications
 * Includes welcome emails, security alerts, and account notifications
 */

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const emailService = {
  /**
   * Welcome Email with Vault PIN
   */
  generateWelcomeEmail: (
    name: string,
    email: string,
    userId: string,
    vaultPin: string
  ): EmailTemplate => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #121212; color: #E0E0E0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .card { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 40px; margin: 20px 0; }
            .header { text-align: center; margin-bottom: 40px; }
            .title { font-size: 32px; font-weight: bold; color: #FFFFFF; margin: 20px 0; }
            .subtitle { font-size: 16px; color: #808080; margin: 10px 0; }
            .credentials { background: #0a0a0a; border: 2px solid #007AFF; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
            .credential-label { font-size: 12px; color: #808080; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
            .credential-value { font-size: 28px; font-weight: bold; color: #007AFF; font-family: monospace; letter-spacing: 4px; margin: 10px 0; }
            .warning { color: #FF453A; font-size: 12px; font-weight: bold; margin-top: 10px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; color: #FFFFFF; margin-bottom: 15px; }
            .section-content { font-size: 14px; line-height: 1.6; color: #E0E0E0; }
            .list-item { margin: 10px 0; padding-left: 20px; }
            .list-item:before { content: "✓ "; color: #007AFF; font-weight: bold; margin-right: 10px; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #808080; }
            .button { display: inline-block; background: #007AFF; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <div class="title">Welcome to Silent Sanctuary</div>
                <div class="subtitle">Your secure, encrypted communication platform</div>
              </div>

              <div class="section">
                <div class="section-content">
                  Hello ${name},<br><br>
                  Thank you for joining Silent Sanctuary. Your account has been created with end-to-end encryption enabled. 
                  Below are your essential credentials for accessing the platform.
                </div>
              </div>

              <div class="credentials">
                <div class="credential-label">Your User ID</div>
                <div class="credential-value">${userId}</div>
                <div class="warning">SAVE THIS ID - You will need it to log in</div>
              </div>

              <div class="credentials">
                <div class="credential-label">Your Vault PIN</div>
                <div class="credential-value">${vaultPin}</div>
                <div class="warning">SAVE THIS PIN - Required to access your chats</div>
              </div>

              <div class="section">
                <div class="section-title">Security Information</div>
                <div class="section-content">
                  <div class="list-item">User ID: Use this to log in to your account</div>
                  <div class="list-item">Vault PIN: Required to unlock your chat vault</div>
                  <div class="list-item">Password: Keep this secure and never share</div>
                  <div class="list-item">All messages are encrypted end-to-end</div>
                  <div class="list-item">Messages are deleted when you log out</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Getting Started</div>
                <div class="section-content">
                  <div class="list-item">Save your User ID and Vault PIN in a secure location</div>
                  <div class="list-item">Log in with your User ID and password</div>
                  <div class="list-item">Enter your Vault PIN to access your chats</div>
                  <div class="list-item">Start secure conversations with friends</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Privacy & Security</div>
                <div class="section-content">
                  We take your privacy seriously. Your conversations are protected by:
                  <div class="list-item">End-to-end encryption (AES-256)</div>
                  <div class="list-item">Zero-knowledge architecture</div>
                  <div class="list-item">No data storage in browser</div>
                  <div class="list-item">Account lockout after 3 failed attempts</div>
                  <div class="list-item">Device verification for new logins</div>
                </div>
              </div>

              <div style="text-align: center;">
                <a href="https://silendsanctuary.com/login" class="button">Go to Login</a>
              </div>

              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>If you did not create this account, please contact support immediately.</p>
                <p>&copy; 2026 Silent Sanctuary. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Welcome to Silent Sanctuary

Hello ${name},

Thank you for joining Silent Sanctuary. Your account has been created with end-to-end encryption enabled.

YOUR USER ID: ${userId}
SAVE THIS ID - You will need it to log in

YOUR VAULT PIN: ${vaultPin}
SAVE THIS PIN - Required to access your chats

SECURITY INFORMATION:
✓ User ID: Use this to log in to your account
✓ Vault PIN: Required to unlock your chat vault
✓ Password: Keep this secure and never share
✓ All messages are encrypted end-to-end
✓ Messages are deleted when you log out

GETTING STARTED:
✓ Save your User ID and Vault PIN in a secure location
✓ Log in with your User ID and password
✓ Enter your Vault PIN to access your chats
✓ Start secure conversations with friends

PRIVACY & SECURITY:
We take your privacy seriously. Your conversations are protected by:
✓ End-to-end encryption (AES-256)
✓ Zero-knowledge architecture
✓ No data storage in browser
✓ Account lockout after 3 failed attempts
✓ Device verification for new logins

This is an automated message. Please do not reply to this email.
If you did not create this account, please contact support immediately.

© 2026 Silent Sanctuary. All rights reserved.
    `;

    return {
      subject: 'Welcome to Silent Sanctuary - Your Vault PIN Inside',
      html,
      text,
    };
  },

  /**
   * Account Lockout Notification Email
   */
  generateAccountLockoutEmail = (
    name: string,
    email: string,
    lockDuration: number
  ): EmailTemplate => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #121212; color: #E0E0E0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .card { background: #1a1a1a; border: 1px solid #FF453A; border-radius: 8px; padding: 40px; margin: 20px 0; }
            .header { text-align: center; margin-bottom: 40px; }
            .title { font-size: 32px; font-weight: bold; color: #FF453A; margin: 20px 0; }
            .subtitle { font-size: 16px; color: #808080; margin: 10px 0; }
            .alert-box { background: #FF453A; color: white; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
            .alert-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .alert-content { font-size: 14px; line-height: 1.6; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; color: #FFFFFF; margin-bottom: 15px; }
            .section-content { font-size: 14px; line-height: 1.6; color: #E0E0E0; }
            .list-item { margin: 10px 0; padding-left: 20px; }
            .list-item:before { content: "• "; color: #FF453A; font-weight: bold; margin-right: 10px; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #808080; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <div class="title">⚠️ Account Security Alert</div>
                <div class="subtitle">Your account has been temporarily locked</div>
              </div>

              <div class="alert-box">
                <div class="alert-title">Account Locked for ${lockDuration} Minutes</div>
                <div class="alert-content">
                  Your account was locked after 3 failed login attempts.
                  This is a security measure to protect your account from unauthorized access.
                </div>
              </div>

              <div class="section">
                <div class="section-title">What Happened?</div>
                <div class="section-content">
                  We detected 3 failed login attempts on your account. To protect your security, 
                  we've temporarily locked your account for ${lockDuration} minutes.
                </div>
              </div>

              <div class="section">
                <div class="section-title">What You Can Do</div>
                <div class="section-content">
                  <div class="list-item">Wait ${lockDuration} minutes before attempting to log in again</div>
                  <div class="list-item">Make sure you're using the correct User ID and password</div>
                  <div class="list-item">If you forgot your password, use the password recovery option</div>
                  <div class="list-item">If this wasn't you, change your password immediately</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Security Tips</div>
                <div class="section-content">
                  <div class="list-item">Use a strong, unique password</div>
                  <div class="list-item">Never share your User ID or Vault PIN</div>
                  <div class="list-item">Enable device verification for new logins</div>
                  <div class="list-item">Log out when finished using the platform</div>
                </div>
              </div>

              <div class="footer">
                <p>This is an automated security alert. Please do not reply to this email.</p>
                <p>If you did not attempt to log in, your account may be compromised. Contact support immediately.</p>
                <p>&copy; 2026 Silent Sanctuary. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
ACCOUNT SECURITY ALERT
Your account has been temporarily locked

⚠️ Account Locked for ${lockDuration} Minutes

Your account was locked after 3 failed login attempts.
This is a security measure to protect your account from unauthorized access.

WHAT HAPPENED?
We detected 3 failed login attempts on your account. To protect your security, 
we've temporarily locked your account for ${lockDuration} minutes.

WHAT YOU CAN DO:
• Wait ${lockDuration} minutes before attempting to log in again
• Make sure you're using the correct User ID and password
• If you forgot your password, use the password recovery option
• If this wasn't you, change your password immediately

SECURITY TIPS:
• Use a strong, unique password
• Never share your User ID or Vault PIN
• Enable device verification for new logins
• Log out when finished using the platform

This is an automated security alert. Please do not reply to this email.
If you did not attempt to log in, your account may be compromised. Contact support immediately.

© 2026 Silent Sanctuary. All rights reserved.
    `;

    return {
      subject: '⚠️ Security Alert: Your Account Has Been Locked',
      html,
      text,
    };
  },

  /**
   * Send Email (Mock Implementation)
   * In production, integrate with email service like SendGrid, AWS SES, etc.
   */
  sendEmail: async (
    to: string,
    subject: string,
    html: string,
    text: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
      // Mock email sending
      console.log(`📧 Email sent to ${to}`);
      console.log(`Subject: ${subject}`);
      
      // In production, integrate with email service:
      // const response = await sendgrid.send({
      //   to,
      //   from: 'noreply@silendsanctuary.com',
      //   subject,
      //   html,
      //   text,
      // });
      
      return {
        success: true,
        messageId: `msg_${Date.now()}`,
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Send Welcome Email
   */
  sendWelcomeEmail: async (
    name: string,
    email: string,
    userId: string,
    vaultPin: string
  ) => {
    const template = emailService.generateWelcomeEmail(name, email, userId, vaultPin);
    return emailService.sendEmail(email, template.subject, template.html, template.text);
  },

  /**
   * Send Account Lockout Email
   */
  sendAccountLockoutEmail: async (
    name: string,
    email: string,
    lockDuration: number
  ) => {
    const template = emailService.generateAccountLockoutEmail(name, email, lockDuration);
    return emailService.sendEmail(email, template.subject, template.html, template.text);
  },
};
