const pug = require('pug');
const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.email = user.email;
    this.username = user.username;
    this.url = url;
    this.from = `job.ir ${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    // TODO : create pug template for email

    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      username: this.username,
      url: this.url,
      subject
    });

    const mailOption = {
      from: this.from,
      to: this.email,
      subject,
      html
    };

    await this.newTransport.sendMail(mailOption);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
module.exports = Email;
