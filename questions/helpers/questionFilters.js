// import required modulesconst
const { Op } = require('sequelize');
const Category = require('../../categories/models/Category');
const Question = require('../models/Question');

// app features
const userFilters = {

  // search function
  filterItems: async (theUserId, queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { title: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by category
    if (queryStr.category) {
      const theCategory = await Category.findOne({
        where: {
          title: queryStr.category,
        },
      });

      queryObject.CategoryId = theCategory.id;
    }

    // find by keyword and category
    return Question.findAll({
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
