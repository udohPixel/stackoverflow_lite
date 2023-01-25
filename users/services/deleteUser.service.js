// import required modules
const { Op } = require('sequelize');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// delete user service
const deleteUserService = async (userId, adminRoleId) => {
  // fetch user by id from dB
  const user = await User.findOne(
    {
      where: {
        RoleId: { [Op.ne]: adminRoleId }, // should not delete admin info
        id: userId,
      },
      attributes: {
        exclude: ['password', 'RoleId'],
      },
    },
  );

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
