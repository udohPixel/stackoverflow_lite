// import required libraries
const express = require('express');
const passport = require('passport');

// import required routes
const auth = require('../../users/routes/api/v1/auth.route');
const users = require('../../users/routes/api/v1/users.route');

// create express router
const router = express.Router();

// passport middleware
router.use(passport.initialize());

// passport authentication strategy
require('../../common/jwtAuth')(passport);

// api routes setup
router.use('/api/v1/auth', auth);
router.use('/api/v1/users', users);

module.exports = router;
