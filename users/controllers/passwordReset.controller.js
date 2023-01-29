// import required modules
const apiResponse = require('../../common/ApiResponse');
const passwordResetService = require('../services/passwordReset.service');

// reset password controller
const passwordResetCtrl = async (req, res) => {
  try {
    // get all required params
    const { token } = req.params;

    const { password } = req.body;

    // reset password service
    await passwordResetService(token, password);

    return apiResponse.success(res, 'Password was reset successfully');
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'reset-password');
  }
};

// export controller
module.exports = passwordResetCtrl;
