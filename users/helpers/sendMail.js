// import required modules
const nodeMailer = require('nodemailer');
const mailConfig = require('../../settings/mailer.config');

// send mail function
const sendMail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: mailConfig.SMTP_HOST,
    port: mailConfig.SMTP_PORT,
    service: mailConfig.SMTP_SERVICE,
    auth: {
      user: mailConfig.SMTP_MAIL,
      pass: mailConfig.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: mailConfig.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  transporter.sendMail(mailOptions);
};

// export node mailer
module.exports = sendMail;
