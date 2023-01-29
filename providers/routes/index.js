// import required libraries
const express = require('express');
const passport = require('passport');

// import required routes
const auth = require('../../users/routes/api/v1/auth.route');
const users = require('../../users/routes/api/v1/users.route');
const categories = require('../../categories/routes/api/v1/categories.route');
const questions = require('../../questions/routes/api/v1/questions.route');
const answers = require('../../answers/routes/api/v1/answers.route');
const comments = require('../../comments/routes/api/v1/comments.route');

// create express router
const router = express.Router();

// passport middleware
router.use(passport.initialize());

// passport authentication strategy
require('../../common/jwtAuth')(passport);

// api routes setup
router.use('/api/v1/auth', auth);
router.use('/api/v1/users', users);
router.use('/api/v1/categories', categories);
router.use('/api/v1/questions', questions);
router.use('/api/v1/answers', answers);
router.use('/api/v1/comments', comments);

module.exports = router;
