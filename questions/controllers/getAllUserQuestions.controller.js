// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllUserQuestionsService = require('../services/getAllUserQuestions.service');

// get all user questions controller
const getAllUserQuestionsCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const queryStr = req.query;

    // get all user questions service
    const questions = await getAllUserQuestionsService(username, queryStr);

    return apiResponse.success(res, 'Questions found successfully', questions);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-user-questions');
  }
};

// export controller
module.exports = getAllUserQuestionsCtrl;
