// import required modules
const { Op } = require('sequelize');
const Answer = require('../../answers/models/Answer');
const Vote = require('../models/Vote');
const ApplicationException = require('../../common/ApplicationException');
const { isEmpty } = require('../../common/helpers');

const downvoteAnswerService = async (AnswerId, UserId) => {
  // fetch answer by id from dB
  const answer = await Answer.findByPk(AnswerId);

  // check if answer exists
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  const userOption = { UserId: { [Op.eq]: UserId } };
  const answerOption = { AnswerId: { [Op.eq]: AnswerId } };

  // fetch user voted answer
  const hasVotedAnswer = await Vote.findAll({
    where: {
      [Op.and]: [
        userOption,
        answerOption,
      ],
    },
  });

  // check if user has voted answer
  if (isEmpty(hasVotedAnswer)) {
    // create new user answer downvote
    const newDownvote = await Vote.create({
      AnswerId: Number(AnswerId), UserId, isUpvote: false,
    });

    // increase total answer downvotes
    await Answer.update(
      { downVotes: answer.downVotes + 1 },
      {
        where: { id: AnswerId },
      },
    );

    return newDownvote;
  }

  // fetch user downvoted answer
  const hasDownvotedAnswer = await Vote.findOne({
    where: {
      [Op.and]: [
        userOption,
        answerOption,
        { isUpvote: { [Op.eq]: false } },
      ],
    },
  });

  // check if user has downvoted answer
  if (hasDownvotedAnswer) {
    throw new ApplicationException('You have already downvoted this answer');
  }

  // update user downvoted answer
  const updatedDownvote = await Vote.update(
    { isUpvote: false },
    {
      where: {
        [Op.and]: [
          userOption,
          answerOption,
        ],
      },
    },
  );

  // decrease total answer upvotes & increase total answer downvotes
  await Answer.update(
    {
      upVotes: answer.upVotes - 1,
      downVotes: answer.downVotes + 1,
    },
    {
      where: { id: AnswerId },
    },
  );

  return updatedDownvote;
};

// export service
module.exports = downvoteAnswerService;
