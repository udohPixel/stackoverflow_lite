// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../middlewares/auth');
const {
  isUpdatePersonalUserValidated,
  isUpdatePersonalPasswordValidated,
} = require('../../../middlewares/userValidator');

// import required controllers
const updatePersonalUser = require('../../../controllers/updatePersonalUser.controller');
const updatePersonalPassword = require('../../../controllers/updatePersonalPassword.controller');
const getAllUsers = require('../../../controllers/getAllUsers.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for updating personal user
 * @api     - /api/v1/users
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/', isLoggedIn, isUpdatePersonalUserValidated, updatePersonalUser);

/**
 * @desc    - route to update personal user password
 * @api     - /api/v1/users/password/update"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  '/password/update',
  isLoggedIn,
  isUpdatePersonalPasswordValidated,
  updatePersonalPassword,
);

/**
 * @desc    - route for fetching all users by id and username
 * @api     - /api/v1/users
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/', getAllUsers);

// export router
module.exports = router;
