// import required modules
const { Op } = require('sequelize');
const User = require('../models/User');
const { isEmpty } = require('../../common/helpers');
const ApplicationException = require('../../common/ApplicationException');

// update user service
const updateUserService = async (userId, adminRoleId, userInfo) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    username,
    email,
    RoleId,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  } = userInfo;

  // fetch user by id from dB
  const user = await User.findOne(
    {
      where: {
        RoleId: { [Op.ne]: adminRoleId }, // should not update admin info
        id: userId,
      },
      attributes: {
        exclude: ['password'],
      },
    },
  );

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException('User does not exist', 404);
  }

  // fetch user by email except current user from dB
  const userWithEmail = await User.findAll(
    {
      where: {
        id: { [Op.ne]: userId },
        email: email.toLowerCase(),
        attributes: ['id', 'email'],
      },
    },
  );

  // check if username already exists
  if (!isEmpty(userWithEmail)) {
    throw new ApplicationException(
      'Email has already been taken. Try another',
      409,
    );
  }

  // fetch user by username except current user from dB
  const userWithUsername = await User.findAll(
    {
      where: {
        id: { [Op.ne]: userId },
        username: username.toLowerCase(),
        attributes: ['id', 'username'],
      },
    },
  );

  // check if username already exists
  if (!isEmpty(userWithUsername)) {
    throw new ApplicationException(
      'Username has already been taken. Try another',
      409,
    );
  }

  // update user
  user.firstname = firstname;
  user.lastname = lastname;
  user.username = username;
  user.email = email;
  user.RoleId = RoleId;
  user.bio = bio;
  user.facebook = facebook;
  user.youtube = youtube;
  user.instagram = instagram;
  user.linkedIn = linkedIn;
  user.twitter = twitter;

  const updatedUser = await user.save();

  return updatedUser;
};

// export service
module.exports = updateUserService;
