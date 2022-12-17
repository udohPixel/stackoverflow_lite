// import required libraries
const passport = require('passport');
const apiResponse = require('../../common/ApiResponse');
const ApplicationException = require('../../common/ApplicationException');
const Role = require('../../roles/models/Role');

const {
  isAdmin,
} = require('../../common/helpers');

// isLoggedIn middleware
const isLoggedIn = passport.authenticate('jwt', { session: false });

// isTheAdmin middleware
const isTheAdmin = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.user.RoleId);
    if (isAdmin(role.title)) {
      await next();
    } else {
      throw new ApplicationException('Unauthorized', 401);
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, 'auth');
  }
};

// export middlewares
module.exports = {
  isLoggedIn,
  isTheAdmin,
};
