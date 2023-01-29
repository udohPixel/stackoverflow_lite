/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updatePersonalQuestnService = require('../services/updatePersonalQuestion.service');

// update/save question controller
const updatePersonalQuestionCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, body, CategoryId } = req.body;

    const UserId = req.user.id;
    const questionId = req.params.id;

    // update question service
    const question = await updatePersonalQuestnService(UserId, questionId, title, body, CategoryId);

    return apiResponse.success(res, 'Question updated successfully', question);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-question');
  }
};

// export controller
module.exports = updatePersonalQuestionCtrl;
