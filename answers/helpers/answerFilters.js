// import required modulesconst
const { Op } = require('sequelize');
const Answer = require('../models/Answer');

// app filters
const userFilters = {

  // all answers filter function
  filterItems: async (questionId, queryStr) => {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject = {
        [Op.or]: [
          { body: { [Op.like]: `%${queryStr.keyword}%` } },
        ],
      };
    }

    // find by up votes
    if (queryStr.upVotes) {
      queryObject.upVotes = queryStr.upVotes;
    }

    // find by down votes
    if (queryStr.downVotes) {
      queryObject.downVotes = queryStr.downVotes;
    }

    // find by keyword and total votes
    return Answer.findAll({
      where: {
        [Op.and]: [
          queryObject,
          { QuestionId: { [Op.eq]: questionId } },
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

    // find by up votes
    if (queryStr.upVotes) {
      queryObject.upVotes = queryStr.upVotes;
    }

    // find by down votes
    if (queryStr.downVotes) {
      queryObject.downVotes = queryStr.downVotes;
    }

    // find by keyword and total votes
    return Answer.findAll({
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
