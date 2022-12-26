// import required modules
const apiResponse = require('../../common/ApiResponse');
const getAllUserAnswersService = require('../services/getAllUserAnswers.service');

// get all user answers controller
const getAllUserAnswersCtrl = async (req, res) => {
  try {
    const { username } = req.params;
    const queryStr = req.query;

    // get all user answers service
    const answers = await getAllUserAnswersService(username, queryStr);

    return apiResponse.success(res, 'Answers found successfully', answers);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'get-all-user-answers');
  }
};

// export controller
module.exports = getAllUserAnswersCtrl;
