// import required modules
const ApplicationException = require('../../common/ApplicationException');
const { sequelize } = require('../../providers/db');
const Answer = require('../../answers/models/Answer');

// import Comment model
const Comment = require('../models/Comment');

// add comment service
const addCommentService = async (UserId, body, AnswerId) => {
  // fetch answer
  const answer = await Answer.findOne({
    where: { id: AnswerId },
    attributes: ['id'],
  });

  // check if answer exists or not in dB
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // save new comment object in DB
  const newComment = Comment.create({
    UserId, body, AnswerId: Number(AnswerId),
  });

  // update totalComments
  await Answer.update(
    { totalComments: sequelize.literal('totalComments + 1') },
    {
      where: {
        id: Number(AnswerId),
      },
    },
  );

  return newComment;
};

// export service
module.exports = addCommentService;
