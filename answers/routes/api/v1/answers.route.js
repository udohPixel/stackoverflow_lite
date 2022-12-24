// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddAnswerValidated,
} = require('../../../middlewares/answerValidator');

// import required controllers
const addAnswer = require('../../../controllers/addAnswer.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for adding answer
 * @api     - /api/v1/answers
 * @access  - PRIVATE
 * @type    - POST
 */
router.post('/', isLoggedIn, isAddAnswerValidated, addAnswer);

// export router
module.exports = router;
