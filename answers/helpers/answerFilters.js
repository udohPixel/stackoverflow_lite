// import required modulesconst
const { Op } = require('sequelize');
const { orderItemsBy } = require('../../common/helpers');
const { ANSWER_SORT_ARRAY } = require('../../settings/validator.config');
const Answer = require('../models/Answer');
const User = require('../../users/models/User');

const sortArray = ANSWER_SORT_ARRAY;

// app filters
const answerFilters = {

  // all answers filter function
  filterItems: async (QuestionId, queryStr) => {
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

    // find by up votes
    if (queryStr.upVotes) {
      queryObject.upVotes = queryStr.upVotes;
    }

    // find by down votes
    if (queryStr.downVotes) {
      queryObject.downVotes = queryStr.downVotes;
    }

    // find by accepted answer
    if (queryStr.isAcceptedAnswer) {
      queryObject.isAcceptedAnswer = queryStr.isAcceptedAnswer;
    }

    // find by total comments
    if (queryStr.totalComments) {
      queryObject.totalComments = queryStr.totalComments;
    }

    // sort result
    const sortData = orderItemsBy(queryStr.sort, sortArray);

    // find by keyword and total votes
    return Answer.findAll({
      where: {
        [Op.and]: [
          queryObject,
          { QuestionId: { [Op.eq]: QuestionId } },
        ],
      },
      order: [
        [sortData.orderParam, sortData.orderValue],
      ],
    });
  },

};

// export
module.exports = answerFilters;
