// import required modules
const ApplicationException = require('../../common/ApplicationException');
const { isEmpty } = require('../../common/helpers');
const { hashPassword } = require('../helpers/checkers');

// import User model
const User = require('../models/User');

// register service
const registrationService = async (firstname, lastname, username, email, password) => {
  // fetch user by email from dB
  const userWithEmail = await User.findOne({
    where: { email: email.toLowerCase() },
  });

  // check if email exists or not in dB
  if (!isEmpty(userWithEmail)) {
    throw new ApplicationException('Email has already been taken. Try another');
  }

  // fetch user by username from dB
  const userWithUsername = await User.findAll({
    where: { username: username.toLowerCase() },
  });

  // check if username exists or not in dB
  if (!isEmpty(userWithUsername)) {
    throw new ApplicationException('Username has already been taken. Try another');
  }

  // hash the raw password
  const hashedPassword = await hashPassword(password);

  // save new user object in DB
  const newUser = User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

// export service
module.exports = registrationService;
