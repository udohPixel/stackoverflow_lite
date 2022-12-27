// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn, isTheAdmin } = require('../../../../users/middlewares/auth');
const {
  isAddQuestionValidated,
  isUpdatePersonalQuestionValidated,
} = require('../../../middlewares/questionValidator');

// import required controllers
const addQuestion = require('../../../controllers/addQuestion.controller');
const updatePersonalQuestion = require('../../../controllers/updatePersonalQuestion.controller');
const getAllQuestions = require('../../../controllers/getAllQuestions.controller');
const deleteQuestion = require('../../../controllers/deleteQuestion.controller');
const updateQuestionStatus = require('../../../controllers/updateQuestionStatus.controller');
const getQuestion = require('../../../controllers/getQuestion.controller');
const getAllAnswers = require('../../../../answers/controllers/getAllAnswers.controller');

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

/**
 * @desc    - route for adding question
 * @api     - /api/v1/questions/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isUpdatePersonalQuestionValidated, updatePersonalQuestion);

/**
 * @desc    - route for fetching all user questions
 * @api     - /api/v1/questions/
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/', getAllQuestions);

/**
 * @desc    - route for delete question
 * @api     - /api/v1/questions/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete('/:id', isLoggedIn, deleteQuestion);

/**
 * @desc    - route for updating question active status
 * @api     - /api/v1/questions/:id/status"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id/status', isLoggedIn, isTheAdmin, updateQuestionStatus);

/**
 * @desc    - route for fetching a question
 * @api     - /api/v1/questions/:id"
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/:id', getQuestion);

/**
 * @desc    - route for fetching all answers to a question
 * @api     - /api/v1/questions/:questionId/answers
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/:questionId/answers', getAllAnswers);

// export router
module.exports = router;
