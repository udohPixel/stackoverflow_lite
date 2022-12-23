// import required modules
const apiResponse = require('../../common/ApiResponse');
const getQuestionService = require('../services/getQuestion.service');

// get question controller
const getQuestionCtrl = async (req, res) => {
  try {
    const questionId = req.params.id;

    // get question service
    const question = await getQuestionService(questionId);

    return apiResponse.success(res, 'Question found successfully', question);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-question');
  }
};

// export controller
module.exports = getQuestionCtrl;
