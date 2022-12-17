// import required modules
const { Op } = require('sequelize');
const Role = require('../../roles/models/Role');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// get user service
const getUserService = async (theUsername) => {
  // fetch admin by title
  const role = await Role.findOne({
    where: { title: 'Admin' },
  });

  // fetch user by username from dB
  const user = await User.findOne({
    where: {
      RoleId: { [Op.ne]: role.id },
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
