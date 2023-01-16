// import required modules
const { Op } = require('sequelize');
const Answer = require('../../answers/models/Answer');
const Vote = require('../models/Vote');
const ApplicationException = require('../../common/ApplicationException');

const downvoteAnswerService = async (AnswerId, UserId) => {
  // fetch answer by id from dB
  const answer = await Answer.findByPk(AnswerId);

  // check if answer exists
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // fetch user voted answer
  const hasVotedAnswer = await Vote.findOne({
    where: {
      [Op.and]: [
        { UserId: { [Op.eq]: UserId } },
        { AnswerId: { [Op.eq]: AnswerId } },
      ],
    },
  });

  // check if user has voted answer
  if (!hasVotedAnswer) {
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

  // check if user has downvoted answer
  if (hasVotedAnswer.isUpvote === false) {
    throw new ApplicationException('You have already downvoted this answer');
  }

  hasVotedAnswer.isUpvote = false;

  // update user downvoted answer
  const updatedDownvote = await hasVotedAnswer.save();

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
