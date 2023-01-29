// import required modulesconst
const { Op } = require('sequelize');
const Category = require('../../categories/models/Category');
const { orderItemsBy } = require('../../common/helpers');
const { QUESTION_SORT_ARRAY } = require('../../settings/validator.config');
const User = require('../../users/models/User');
const Question = require('../models/Question');

const sortArray = QUESTION_SORT_ARRAY;

// app filters
const questionFilters = {

  // all questions filter function
  filterItems: async (queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { title: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by user
    if (queryStr.username) {
      const theUser = await User.findOne({
        where: {
          username: queryStr.username,
        },
        attributes: ['id'],
      });

      // check if user exist
      if (!theUser) {
        return [];
      }

      queryObject.UserId = theUser.id;
    }

    // find by category
    if (queryStr.category) {
      const theCategory = await Category.findOne({
        where: {
          title: queryStr.category,
        },
      });

      // check if category exist
      if (!theCategory) {
        return [];
      }

      queryObject.CategoryId = theCategory.id;
    }

    // find by total answers
    if (queryStr.totalAnswers) {
      queryObject.totalAnswers = queryStr.totalAnswers;
    }

    // find by whether or not question has an accepted answer
    if (queryStr.hasAcceptedAnswer) {
      queryObject.hasAcceptedAnswer = queryStr.hasAcceptedAnswer;
    }

    // sort result
    const sortData = orderItemsBy(queryStr.sort, sortArray);

    // find by all provided query
    return Question.findAll({
      where: queryObject,
      order: [
        [sortData.orderParam, sortData.orderValue],
      ],
    });
  },

};

// export
module.exports = questionFilters;
