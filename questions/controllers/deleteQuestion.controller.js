/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteQuestionService = require('../services/deleteQuestion.service');

// delete/save question controller
const deleteQuestionCtrl = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { RoleId } = req.user;
    const questionId = req.params.id;

    // delete question service
    const question = await deleteQuestionService(UserId, RoleId, questionId);

    return apiResponse.success(res, 'Question deleted successfully', question);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete-question');
  }
};

// export controller
module.exports = deleteQuestionCtrl;
