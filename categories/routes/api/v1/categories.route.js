// import required libraries
const express = require('express');

// import required middlewares
const { isLoggedIn, isTheAdmin } = require('../../../../users/middlewares/auth');
const {
  isAddCategoryValidated,
} = require('../../../middlewares/categoryValidator');

// import required controllers
const addCategory = require('../../../controllers/addCategory.controller');

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for updating personal category
 * @api     - /api/v1/categories
 * @access  - PRIVATE
 * @type    - POST
 */
router.post('/', isLoggedIn, isTheAdmin, isAddCategoryValidated, addCategory);

// export router
module.exports = router;
