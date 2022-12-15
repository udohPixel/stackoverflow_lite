// import required libraries
const express = require('express');

// import required middlewares
const {
  isLoginValidated,
  isRegistrationValidated,
} = require('../../../middlewares/userValidator');

// import required controllers
const registration = require('../../../controllers/registration.controller');
const login = require('../../../controllers/login.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for registration of users
 * @api     - /api/v1/auth/register
 * @access  - PUBLIC
 * @type    - POST
 */
router.post('/register', isRegistrationValidated, registration);

/**
 * @desc    - route for login of users
 * @api     - /api/v1/auth/login
 * @access  - PUBLIC
 * @type    - POST
 */
router.post('/login', isLoginValidated, login);

// export router
module.exports = router;
