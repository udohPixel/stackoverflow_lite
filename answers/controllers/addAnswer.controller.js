// import required modules
const apiResponse = require('../../common/ApiResponse');
const addAnswerService = require('../services/addAnswer.service');

// add answer controller
const addAnswerCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { body, QuestionId } = req.body;

    const UserId = req.user.id;

    // add answer service
    const answer = await addAnswerService(UserId, body, QuestionId);

    return apiResponse.success(res, 'Answer added successfully', answer, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'add-answer');
  }
};

// export controller
module.exports = addAnswerCtrl;
