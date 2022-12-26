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

    // find by total votes
    if (queryStr.totalVotes) {
      queryObject.totalVotes = queryStr.totalVotes;
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
};

// export
module.exports = userFilters;
