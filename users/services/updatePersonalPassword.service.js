// import required modules
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');
const sendMail = require('../helpers/sendMail');
const { hashPassword } = require('../helpers/checkers');

// update personal user service
const updatePersonalPasswordService = async (userId, oldPassword, password) => {
  // fetch user by id from dB
  const user = await User.findOne({ where: { id: userId } });

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  // check if user-imputed old password matches password in dB
  const isMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isMatched) {
    throw new ApplicationException('Invalid password', 400);
  }

  // hash password
  const theHashedPassword = await hashPassword(password);

  // update password
  await User.update(
    { password: theHashedPassword },
    {
      where: {
        id: user.id,
      },
    },
  );

  // send mail to user informing him/her of successful password change
  const passwordResetMessage = '<div><h2>Your password was changed successfully.</h2><p></p></div>';

  await sendMail({
    email: user.email,
    subject: 'Your Stackoverflow Lite account password has been changed',
    message: passwordResetMessage,
  });

  return theHashedPassword;
};

// export service
module.exports = updatePersonalPasswordService;
