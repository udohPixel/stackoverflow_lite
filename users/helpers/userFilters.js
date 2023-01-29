// import required modulesconst
const { Op } = require('sequelize');
const { orderItemsBy } = require('../../common/helpers');
const { USER_SORT_ARRAY } = require('../../settings/validator.config');
const User = require('../models/User');

const sortArray = USER_SORT_ARRAY;

// app features
const userFilters = {

  // search function
  filterItems: (queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { firstname: { [Op.like]: `%${queryStr.keyword}%` } },
          { lastname: { [Op.like]: `%${queryStr.keyword}%` } },
          { username: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // sort result
    const sortData = orderItemsBy(queryStr.sort, sortArray);

    // find by keyword
    return User.findAll({
      where: queryObject,
      order: [
        [sortData.orderParam, sortData.orderValue],
      ],
      attributes: {
        exclude: ['password', 'RoleId'],
      },
    });
  },
};

// export
module.exports = userFilters;
