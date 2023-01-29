// import require modules
const apiResponse = require('../../common/ApiResponse');
const updateAcceptedAnswerService = require('../services/updateAcceptedAnswer.service');

// update accepted answer controller
const updateAcceptedAnswerCtrl = async (req, res) => {
  try {
    const answerId = req.params.id;
    const UserId = req.user.id;

    // update accepted answer service
    const acceptedAnswer = await updateAcceptedAnswerService(UserId, answerId);

    return apiResponse.success(
      res,
      'Accepted answer updated successfully',
      acceptedAnswer,
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-accepted-answer');
  }
};

// export controller
module.exports = updateAcceptedAnswerCtrl;
