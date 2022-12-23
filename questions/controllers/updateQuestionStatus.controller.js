// import require modules
const apiResponse = require('../../common/ApiResponse');
const updateQuestionStatusService = require('../services/updateQuestionStatus.service');

// update question status controller
const updateQuestionStatusCtrl = async (req, res) => {
  try {
    const questionId = req.params.id;

    // update question status service
    const questionStatus = await updateQuestionStatusService(questionId);

    return apiResponse.success(
      res,
      'Question status updated successfully',
      questionStatus,
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-question-status');
  }
};

// export controller
module.exports = updateQuestionStatusCtrl;
