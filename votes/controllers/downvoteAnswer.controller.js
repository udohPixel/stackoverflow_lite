// import required modules
const apiResponse = require('../../common/ApiResponse');
const downvoteAnswerService = require('../services/downvoteAnswer.service');

// downvote answer controller
const downvoteAnswerCtrl = async (req, res) => {
  try {
    const AnswerId = req.params.id;
    const UserId = req.user.id;

    // downvote answer service
    const vote = await downvoteAnswerService(AnswerId, UserId);

    return apiResponse.success(res, 'Answer downvoted successfully', vote, 200);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'downvote-answer');
  }
};

// export controller
module.exports = downvoteAnswerCtrl;
