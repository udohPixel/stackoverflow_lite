// import require modules
const apiResponse = require('../../common/ApiResponse');
const updateUserStatusService = require('../services/updateUserStatus.service');

// update user status controller
const updateUserStatusCtrl = async (req, res) => {
  try {
    const userId = req.params.id;

    // update user status service
    const userState = await updateUserStatusService(userId);

    return apiResponse.success(
      res,
      'User status updated successfully',
      userState,
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-user-status');
  }
};

// export controller
module.exports = updateUserStatusCtrl;
