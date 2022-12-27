// import required modulesconst
const { Op } = require('sequelize');
const Category = require('../../categories/models/Category');
const ApplicationException = require('../../common/ApplicationException');
const Question = require('../models/Question');

// app filters
const userFilters = {

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

    // find by category
    if (queryStr.category) {
      const theCategory = await Category.findOne({
        where: {
          title: queryStr.category,
        },
      });

      // check if category exist
      if (!theCategory) {
        throw new ApplicationException('Category does not exist', 404);
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

    // find by keyword and category
    return Question.findAll({
      where: queryObject,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  },

  // personal questions filter function
  filterPersonalItems: async (theUserId, queryStr) => {
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

      // check if category exist
      if (!theCategory) {
        throw new ApplicationException('Category does not exist', 404);
      }

      queryObject.CategoryId = theCategory.id;
    }

    // find by total answers
    if (queryStr.totalAnswers) {
      queryObject.totalAnswers = queryStr.totalAnswers;
    }

    // find by hasAcceptedAnswer
    if (queryStr.hasAcceptedAnswer) {
      queryObject.hasAcceptedAnswer = queryStr.hasAcceptedAnswer;
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
        ['totalAnswers', 'DESC'],
      ],
    });
  },
};

// export
module.exports = userFilters;
