// import required modules
const { Op } = require('sequelize');
const PasswordReset = require('../models/PasswordReset');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');
const sendMail = require('../helpers/sendMail');
const { hashPassword } = require('../helpers/checkers');
const { isEmpty } = require('../../common/helpers');

// password reset service
const passwordResetService = async (token, password) => {
  // fetch user by passwordResetToken
  const isToken = await PasswordReset.findOne({
    where: {
      passwordResetToken: token,
      passwordResetExpirationDate: { [Op.gte]: Date.now() },
    },
  });

  // check if token exists
  if (!isToken) {
    throw new ApplicationException(
      'Password reset link is invalid or has expired',
      400,
    );
  }

  // fetch user by email
  const user = await User.findOne({
    where: {
      email: isToken.email,
    },
  });

  // check if user exists
  if (isEmpty(user)) {
    throw new ApplicationException('User does not exist', 404);
  }

  const theHashedPassword = await hashPassword(password);

  // update password, password reset token and time
  await User.update(
    { password: theHashedPassword },
    {
      where: {
        id: user.id,
      },
    },
  );

  // send mail to user informing him/her of successful password change
  const passwordResetMessage = `<div><h2>Your password was changed successfully.</h2><p>Your new password is ${
    password
  }</p></div>`;

  await sendMail({
    email: user.email,
    subject: 'Your Stackoverflow-Lite account password has been changed',
    message: passwordResetMessage,
  });

  return isToken;
};

// export service
module.exports = passwordResetService;
