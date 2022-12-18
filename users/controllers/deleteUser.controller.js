// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteUserService = require('../services/deleteUser.service');

// delete user controller
const deleteUserCtrl = async (req, res) => {
  try {
    const userId = req.params.id;
    const adminRoleId = req.user.RoleId;

    // delete user service
    const user = await deleteUserService(userId, adminRoleId);

    return apiResponse.success(res, 'User deleted successfully', user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete-user');
  }
};

// export controller
module.exports = deleteUserCtrl;
