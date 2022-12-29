// import required modules
const { Op } = require('sequelize');
const Answer = require('../../answers/models/Answer');
const Vote = require('../models/Vote');
const ApplicationException = require('../../common/ApplicationException');
const { isEmpty } = require('../../common/helpers');

const upvoteAnswerService = async (AnswerId, UserId) => {
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
    // create new user answer upvote
    const newUpvote = await Vote.create({
      AnswerId: Number(AnswerId), UserId, isUpvote: true,
    });

    // increase total answer downvotes
    await Answer.update(
      { upVotes: answer.upVotes + 1 },
      {
        where: { id: AnswerId },
      },
    );

    return newUpvote;
  }

  // fetch user upvoted answer
  const hasUpvotedAnswer = await Vote.findOne({
    where: {
      [Op.and]: [
        userOption,
        answerOption,
        { isUpvote: { [Op.eq]: true } },
      ],
    },
  });

  // check if user has upvoted answer
  if (hasUpvotedAnswer) {
    throw new ApplicationException('You have already upvoted this answer');
  }

  // update user upvoted answer
  const updatedUpvote = await Vote.update(
    { isUpvote: true },
    {
      where: {
        [Op.and]: [
          userOption,
          answerOption,
        ],
      },
    },
  );

  // increase total answer downvotes
  await Answer.update(
    {
      downVotes: answer.downVotes - 1,
      upVotes: answer.upVotes + 1,
    },
    {
      where: { id: AnswerId },
    },
  );

  return updatedUpvote;
};

// export service
module.exports = upvoteAnswerService;
