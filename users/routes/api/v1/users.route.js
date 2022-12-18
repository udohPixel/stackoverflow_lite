// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn, isTheAdmin } = require('../../../middlewares/auth');
const {
  isUpdatePersonalUserValidated,
  isUpdatePersonalPasswordValidated,
  isUpdateUserValidated,
} = require('../../../middlewares/userValidator');

// import required controllers
const updatePersonalUser = require('../../../controllers/updatePersonalUser.controller');
const updatePersonalPassword = require('../../../controllers/updatePersonalPassword.controller');
const getAllUsers = require('../../../controllers/getAllUsers.controller');
const getUser = require('../../../controllers/getUser.controller');
const updateUser = require('../../../controllers/updateUser.controller');
const deleteUser = require('../../../controllers/deleteUser.controller');
const updateUserStatus = require('../../../controllers/updateUserStatus.controller');

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

/**
 * @desc    - route for fetching any user by username
 * @api     - /api/v1/users/:username
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/:username', getUser);

/**
 * @desc    - route for updating user
 * @api     - /api/v1/users/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isTheAdmin, isUpdateUserValidated, updateUser);

/**
 * @desc    - route for deleting user
 * @api     - /api/v1/users/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete('/:id', isLoggedIn, isTheAdmin, deleteUser);

/**
 * @desc    - route for updating user active status
 * @api     - /api/v1/users/:id/status"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id/status', isLoggedIn, isTheAdmin, updateUserStatus);

// export router
module.exports = router;
