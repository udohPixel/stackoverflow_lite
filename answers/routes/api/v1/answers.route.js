// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddAnswerValidated,
  isUpdatePersonalAnswerValidated,
} = require('../../../middlewares/answerValidator');

// import required controllers
const addAnswer = require('../../../controllers/addAnswer.controller');
const updateAcceptedAnswer = require('../../../controllers/updateAcceptedAnswer.controller');
const deleteAnswer = require('../../../controllers/deleteAnswer.controller');
const updatePersonalAnswer = require('../../../controllers/updatePersonalAnswer.controller');
const upvoteAnswer = require('../../../../votes/controllers/upvoteAnswer.controller');
const downvoteAnswer = require('../../../../votes/controllers/upvoteAnswer.controller');

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

/**
 * @desc    - route for updating accepted answer
 * @api     - /api/v1/answers/:id/accepted/update
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id/accepted/update', isLoggedIn, updateAcceptedAnswer);

/**
 * @desc    - route for delete answer
 * @api     - /api/v1/answers/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete('/:id', isLoggedIn, deleteAnswer);

/**
 * @desc    - route for updating personal answer
 * @api     - /api/v1/answers/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isUpdatePersonalAnswerValidated, updatePersonalAnswer);

/**
 * @desc    - route for upvoting an answer
 * @api     - /api/v1/answers/:id/upvote
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id/upvote', isLoggedIn, upvoteAnswer);

/**
 * @desc    - route for downvoting an answer
 * @api     - /api/v1/answers/:id/downvote
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id/downvote', isLoggedIn, downvoteAnswer);

// export router
module.exports = router;
