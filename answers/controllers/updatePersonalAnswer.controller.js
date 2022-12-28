/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updatePersonalQuestnService = require('../services/updatePersonalAnswer.service');

// update/save answer controller
const updatePersonalAnswerCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { body, QuestionId } = req.body;

    const UserId = req.user.id;
    const answerId = req.params.id;

    // update answer service
    const answer = await updatePersonalQuestnService(UserId, answerId, body, QuestionId);

    return apiResponse.success(res, 'Answer updated successfully', answer);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-answer');
  }
};

// export controller
module.exports = updatePersonalAnswerCtrl;
