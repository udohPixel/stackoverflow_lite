/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteCommentService = require('../services/deleteComment.service');

// delete/save comment controller
const deleteCommentCtrl = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { RoleId } = req.user;
    const commentId = req.params.id;

    // delete comment service
    const comment = await deleteCommentService(UserId, RoleId, commentId);

    return apiResponse.success(res, 'Comment deleted successfully', comment);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete-comment');
  }
};

// export controller
module.exports = deleteCommentCtrl;
