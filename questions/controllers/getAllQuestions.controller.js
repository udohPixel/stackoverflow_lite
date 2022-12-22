// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllQuestionsService = require('../services/getAllQuestions.service');

// get all questions controller
const getAllQuestionsCtrl = async (req, res) => {
  try {
    const queryStr = req.query;

    // get all questions service
    const questions = await getAllQuestionsService(queryStr);

    return apiResponse.success(res, 'Questions found successfully', questions);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-questions');
  }
};

// export controller
module.exports = getAllQuestionsCtrl;
