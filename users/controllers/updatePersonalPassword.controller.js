// import required modules
const apiResponse = require('../../common/ApiResponse');
const updatePersonalPasswordService = require('../services/updatePersonalPassword.service');

// update/save user password controller
const updatePersonalPasswordCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { oldPassword, password } = req.body;

    const userId = req.user.id;

    // update personal password service
    await updatePersonalPasswordService(
      userId,
      oldPassword,
      password,
    );

    return apiResponse.success(
      res,
      'Password updated successfully',
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'personal-password-update');
  }
};

// export controller
module.exports = updatePersonalPasswordCtrl;
