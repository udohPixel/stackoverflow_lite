// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddCommentValidated,
  isUpdatePersonalCommentValidated,
} = require('../../../middlewares/commentValidator');

// import required controllers
const addComment = require('../../../controllers/addComment.controller');
const updatePersonalComment = require('../../../controllers/updatePersonalComment.controller');
const deleteComment = require('../../../controllers/deleteComment.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for adding comment
 * @api     - /api/v1/comments
 * @access  - PRIVATE
 * @type    - POST
 */
router.post('/', isLoggedIn, isAddCommentValidated, addComment);

/**
 * @desc    - route for updating personal comment
 * @api     - /api/v1/comments/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put('/:id', isLoggedIn, isUpdatePersonalCommentValidated, updatePersonalComment);

/**
 * @desc    - route for deleting comment
 * @api     - /api/v1/comments/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete('/:id', isLoggedIn, deleteComment);

// export router
module.exports = router;
