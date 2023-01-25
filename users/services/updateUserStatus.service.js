// import required modules
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// update user status service
const updateUserStatusService = async (userId) => {
  // fetch current user status
  const user = await User.findOne(
    {
      where: {
        id: userId,
      },
      attributes: {
        exclude: ['password', 'RoleId'],
      },
    },
  );

  // check if user exists
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  const theUserValues = {
    // toggle user active status
    isActive: user.isActive = !user.isActive,
  };

  // update user status
  await User.update(
    theUserValues,
    {
      where: {
        id: userId,
      },
    },
  );

  return user;
};

// export service
module.exports = updateUserStatusService;
