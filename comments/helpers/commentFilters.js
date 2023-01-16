// import required modulesconst
const { Op } = require('sequelize');
const { orderItemsBy } = require('../../common/helpers');
const { COMMENT_SORT_ARRAY } = require('../../settings/validator.config');
const User = require('../../users/models/User');
const Comment = require('../models/Comment');

const sortArray = COMMENT_SORT_ARRAY;

// app filters
const commentFilters = {

  // all comments filter function
  filterItems: async (AnswerId, queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { body: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by user
    if (queryStr.username) {
      const theUser = await User.findOne({
        where: {
          username: queryStr.username,
        },
      });

      // check if user exist
      if (!theUser) {
        return [];
      }

      queryObject.UserId = theUser.id;
    }

    // sort result
    const sortData = orderItemsBy(queryStr.sort, sortArray);

    // find by keyword only
    return Comment.findAll({
      where: {
        [Op.and]: [
          queryObject,
          { AnswerId: { [Op.eq]: AnswerId } },
        ],
      },
      order: [
        [sortData.orderParam, sortData.orderValue],
      ],
    });
  },

};

// export
module.exports = commentFilters;
