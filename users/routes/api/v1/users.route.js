// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../middlewares/auth');
const { isUpdatePersonalUserValidated } = require('../../../middlewares/userValidator');

// import required controllers
const updatePersonalUser = require('../../../controllers/updatePersonalUser.controller');

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

// export router
module.exports = router;
