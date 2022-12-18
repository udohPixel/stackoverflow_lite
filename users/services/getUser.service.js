// import required modules
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// get user service
const getUserService = async (theUsername) => {
  // fetch user by username from dB
  const user = await User.findOne({
    where: {
      username: theUsername.toLowerCase(),
    },
    attributes: {
      exclude: ['password', 'RoleId'],
    },
  });

  // check if user exists with provided username
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  return user;
};

// export service
module.exports = getUserService;
