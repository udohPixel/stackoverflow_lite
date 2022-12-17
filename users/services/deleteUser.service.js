// import required modules
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// delete user service
const deleteUserService = async (userId) => {
  // fetch user by id from dB
  const user = await User.findByPk(userId);

  // check if user exists with provided id
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  // delete user
  await User.destroy({
    where: {
      id: userId,
    },
  });

  return user;
};

// export service
module.exports = deleteUserService;
