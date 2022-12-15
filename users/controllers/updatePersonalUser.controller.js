/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updatePersonalUserService = require('../services/updatePersonalUser.service');

// update/save user controller
const updatePersonalUserCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      username,
      email,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;
    const userInfo = req.body;

    const userId = req.user.id;

    // update personal user service
    const user = await updatePersonalUserService(userId, userInfo);

    return apiResponse.success(res, 'Profile updated successfully', user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'personal-user-update');
  }
};

// export controller
module.exports = updatePersonalUserCtrl;
