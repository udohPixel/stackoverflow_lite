/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteAnswerService = require('../services/deleteAnswer.service');

// delete/save answer controller
const deleteAnswerCtrl = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { RoleId } = req.user;
    const answerId = req.params.id;

    // delete answer service
    const answer = await deleteAnswerService(UserId, RoleId, answerId);

    return apiResponse.success(res, 'Answer deleted successfully', answer);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete-answer');
  }
};

// export controller
module.exports = deleteAnswerCtrl;
