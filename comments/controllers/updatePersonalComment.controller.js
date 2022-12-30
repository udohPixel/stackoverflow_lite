/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updatePersonalQuestnService = require('../services/updatePersonalComment.service');

// update/save comment controller
const updatePersonalCommentCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { body, AnswerId } = req.body;

    const UserId = req.user.id;
    const commentId = req.params.id;

    // update comment service
    const comment = await updatePersonalQuestnService(UserId, commentId, body, AnswerId);

    return apiResponse.success(res, 'Comment updated successfully', comment);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-comment');
  }
};

// export controller
module.exports = updatePersonalCommentCtrl;
