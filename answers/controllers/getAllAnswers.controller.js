// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllAnswersService = require('../services/getAllAnswers.service');

// get all answers controller
const getAllAnswersCtrl = async (req, res) => {
  try {
    const { QuestionId } = req.body;
    const queryStr = req.query;

    // get all answers service
    const answers = await getAllAnswersService(QuestionId, queryStr);

    return apiResponse.success(res, 'Answers found successfully', answers);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-answers');
  }
};

// export controller
module.exports = getAllAnswersCtrl;
