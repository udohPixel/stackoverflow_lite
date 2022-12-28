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
 * @desc    - route for adding answer
 * @api     - /api/v1/answers/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isUpdatePersonalAnswerValidated, updatePersonalAnswer);

// export router
module.exports = router;
