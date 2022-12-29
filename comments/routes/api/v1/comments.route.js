// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn } = require('../../../../users/middlewares/auth');
const {
  isAddCommentValidated,
} = require('../../../middlewares/commentValidator');

// import required controllers
const addComment = require('../../../controllers/addComment.controller');

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

// export router
module.exports = router;
