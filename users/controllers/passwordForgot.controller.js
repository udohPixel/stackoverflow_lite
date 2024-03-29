// import required modules
const apiResponse = require('../../common/ApiResponse');
const passwordForgotService = require('../services/passwordForgot.service');

// forgot password controller
const passwordForgotCtrl = async (req, res) => {
  try {
    // get all required params
    const { email } = req.body;
    const { protocol } = req;
    const host = req.hostname;

    // forgot password service
    await passwordForgotService(email, protocol, host);

    return apiResponse.success(res, 'Email sent successfully');
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'forgot-password');
  }
};

// export controller
module.exports = passwordForgotCtrl;
