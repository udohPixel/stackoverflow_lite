// import required modules
const crypto = require('crypto');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');
const sendMail = require('../helpers/sendMail');
const { randomHash } = require('../helpers/checkers');
const PasswordReset = require('../models/PasswordReset');

// password forgot service
const passwordForgotService = async (email, protocol, host) => {
  // fetch user by email
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  // check if user exists
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  // generate password reset token
  const token = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = randomHash(token);

  // set expiration date to 3 days
  const passwordResetExpirationDate = Date.now() + 3 * 24 * 60 * 60 * 1000;

  // create password reset token and email
  await PasswordReset.create({
    email: user.email,
    passwordResetToken,
    passwordResetExpirationDate,
  });

  // send mail to user containing password reset link
  const link = `${protocol}://${host}/password/reset/${passwordResetToken}`;

  const passwordResetLink = `<div style='background-color: #ffffff; color: #000000'><h2>Please confirm the reset of your password by clicking the button below:</h2></div> <div><a target='_blank'  href='${
    link
  }' data-saferedirecturl='https://www.google.com/url?q=${
    link
  }'>Reset Password</a></div>`;

  const passwordResetMessage = passwordResetLink;

  await sendMail({
    email: user.email,
    subject: 'Stackoverflow Lite account password reset',
    message: passwordResetMessage,
  });

  return passwordResetToken;
};

// export service
module.exports = passwordForgotService;
