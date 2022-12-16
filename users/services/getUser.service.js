// import required modules
const { Op } = require('sequelize');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// get user service
const getUserService = async (theUsername) => {
  // fetch user by username from dB
  const user = await User.findOne({
    where: {
      roleId: { [Op.ne]: '80692679' },
      username: theUsername.toLowerCase(),
    },
    attributes: {
      exclude: ['password', 'roleId'],
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
