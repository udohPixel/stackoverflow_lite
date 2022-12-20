// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddQuestionValidated,
} = require('../../../middlewares/questionValidator');

// import required controllers
const addQuestion = require('../../../controllers/addQuestion.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for adding question
 * @api     - /api/v1/questions
 * @access  - PRIVATE
 * @type    - POST
 */
router.post('/', isLoggedIn, isAddQuestionValidated, addQuestion);

// export router
module.exports = router;
