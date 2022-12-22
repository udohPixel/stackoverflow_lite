// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddQuestionValidated,
  isUpdatePersonalQuestionValidated,
} = require('../../../middlewares/questionValidator');

// import required controllers
const addQuestion = require('../../../controllers/addQuestion.controller');
const getAllUserQuestions = require('../../../controllers/getAllUserQuestions.controller');
const updatePersonalQuestion = require('../../../controllers/updatePersonalQuestion.controller');
const getAllQuestions = require('../../../controllers/getAllQuestions.controller');
const deleteQuestion = require('../../../controllers/deleteQuestion.controller');

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
 * @desc    - route for fetching all user questions
 * @api     - /api/v1/questions/:username
 * @access  - PUBLIC
 * @type    - GET
 */
router.get('/:username', getAllUserQuestions);

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
 * @desc    - route for delete category
 * @api     - /api/v1/questions/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete('/:id', isLoggedIn, deleteQuestion);

// export router
module.exports = router;
