/* eslint-disable no-unused-vars */
// import required modules
const apiResponse = require('../../common/ApiResponse');
const updateUserService = require('../services/updateUser.service');

// update/save user controller
const updateUserCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      username,
      email,
      RoleId,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;
    const userInfo = req.body;

    const userId = req.params.id;
    const adminRoleId = req.user.RoleId;

    // update user service
    const user = await updateUserService(userId, adminRoleId, userInfo);

    return apiResponse.success(res, 'User updated successfully', user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'update-user');
  }
};

// export controller
module.exports = updateUserCtrl;
