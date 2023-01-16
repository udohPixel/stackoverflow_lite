// import required modules
const { Op } = require('sequelize');
const Answer = require('../../answers/models/Answer');
const Vote = require('../models/Vote');
const ApplicationException = require('../../common/ApplicationException');

const upvoteAnswerService = async (AnswerId, UserId) => {
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
    // create new user answer upvote
    const newUpvote = await Vote.create({
      AnswerId: Number(AnswerId), UserId, isUpvote: true,
    });

    // increase total answer upvotes
    await Answer.update(
      { upVotes: answer.upVotes + 1 },
      {
        where: { id: AnswerId },
      },
    );

    return newUpvote;
  }

  // check if user has upvoted answer
  if (hasVotedAnswer.isUpvote === true) {
    throw new ApplicationException('You have already upvoted this answer');
  }

  hasVotedAnswer.isUpvote = true;

  // update user upvoted answer
  const updatedUpvote = await hasVotedAnswer.save();

  // decrease total answer downvotes & increase total answer upvotes
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
