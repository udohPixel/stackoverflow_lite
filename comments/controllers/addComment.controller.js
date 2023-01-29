// import required modules
const apiResponse = require('../../common/ApiResponse');
const addCommentService = require('../services/addComment.service');

// add comment controller
const addCommentCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { body, AnswerId } = req.body;

    const UserId = req.user.id;

    // add comment service
    const comment = await addCommentService(UserId, body, AnswerId);

    return apiResponse.success(res, 'Comment added successfully', comment, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'add-comment');
  }
};

// export controller
module.exports = addCommentCtrl;
