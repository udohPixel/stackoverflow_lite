// import required modulesconst
const { Op } = require('sequelize');
const User = require('../models/User');

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

    // find by keyword
    return User.findAll({
      where: queryObject,
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: {
        exclude: ['password', 'roleId'],
      },
    });
  },
};

// export
module.exports = userFilters;
