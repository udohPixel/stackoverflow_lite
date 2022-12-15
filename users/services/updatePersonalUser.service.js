// import required modules
const { Op } = require('sequelize');
const User = require('../models/User');
const ApplicationException = require('../../common/ApplicationException');

// update personal user service
const updatePersonalUserService = async (userId, userInfo) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    username,
    email,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  } = userInfo;

  // fetch user by id from dB
  const user = await User.findByPk(userId);

  // pass user-imputed values into userValues object
  const userValues = {
    firstname,
    lastname,
    username,
    email,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  };

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  // fetch user by email except current user from dB
  const isExistingEmail = await User.findAll(
    {
      where: {
        id: { [Op.ne]: userId },
        email: email.toLowerCase(),
      },
    },
  );

  // check if username already exists
  if (isExistingEmail) {
    throw new ApplicationException(
      'Email has already been taken. Try another',
      409,
    );
  }

  // fetch user by username except current user from dB
  const isExistingUsername = await User.findAll(
    {
      where: {
        id: { [Op.ne]: userId },
        username: username.toLowerCase(),
      },
    },
  );

  // check if username already exists
  if (isExistingUsername) {
    throw new ApplicationException(
      'Username has already been taken. Try another',
      409,
    );
  }

  // update user
  await User.update(
    userValues,
    {
      where: { id: userId },
    },
  );

  // get updated user
  const updatedUser = await User.findOne({
    where: {
      id: userId,
    },
    attributes: { exclude: ['password', 'roleId'] },
  });

  return updatedUser;
};

// export service
module.exports = updatePersonalUserService;
