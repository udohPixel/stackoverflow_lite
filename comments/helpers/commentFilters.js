// import required modulesconst
const { Op } = require('sequelize');
const Comment = require('../models/Comment');

// app filters
const userFilters = {

  // all comments filter function
  filterItems: async (answerId, queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { body: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by keyword only
    return Comment.findAll({
      where: {
        [Op.and]: [
          queryObject,
          { AnswerId: { [Op.eq]: answerId } },
        ],
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  },

  filterPersonalItems: (theUserId, queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { body: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by keyword only
    return Comment.findAll({
      where: {
        [Op.and]: [
          queryObject,
          { UserId: { [Op.eq]: theUserId } },
        ],
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  },
};

// export
module.exports = userFilters;
