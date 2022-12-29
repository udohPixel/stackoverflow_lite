// import required modules
const ApplicationException = require('../../common/ApplicationException');
const Answer = require('../../answers/models/Answer');

// import Comment model
const Comment = require('../models/Comment');

// add comment service
const addCommentService = async (UserId, body, AnswerId) => {
  // fetch comment
  const comment = await Comment.findOne({
    where: { body },
  });

  // check if comment exists or not in dB
  if (comment) {
    throw new ApplicationException('Comment has already been added. Try another');
  }

  // save new comment object in DB
  const newComment = Comment.create({
    UserId, body, AnswerId: Number(AnswerId),
  });

  // fetch all comments
  const allComments = await Comment.findAll({
    where: {
      AnswerId: Number(AnswerId),
    },
  });

  // update totalComments
  await Answer.update(
    { totalComments: allComments.length + 1 },
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
