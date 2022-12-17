// import required modules
const apiResponse = require('../../common/ApiResponse');
const deleteUserService = require('../services/deleteUser.service');

// delete user controller
const deleteUserCtrl = async (req, res) => {
  try {
    const userId = req.params.id;

    // delete user service
    const user = await deleteUserService(userId);

    return apiResponse.success(res, 'User deleted successfully', user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, 'delete_user');
  }
};

// export controller
module.exports = deleteUserCtrl;
