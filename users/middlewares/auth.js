// import required libraries
const passport = require('passport');
const apiResponse = require('../../common/ApiResponse');
const ApplicationException = require('../../common/ApplicationException');
const {
  isAdmin,
} = require('../../common/helpers');

// isLoggedIn middleware
const isLoggedIn = passport.authenticate('jwt', { session: false });

// isTheAdmin middleware
const isTheAdmin = (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (isAdmin(userRole)) {
      next();
    }
    throw new ApplicationException('Unauthorized', 401);
  } catch (error) {
    return apiResponse.errorObject(res, error, 403, 'auth');
  }
};

// export middlewares
module.exports = {
  isLoggedIn,
  isTheAdmin,
};
