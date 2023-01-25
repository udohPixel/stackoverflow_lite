// import required modules
const Comment = require('../models/Comment');
const ApplicationException = require('../../common/ApplicationException');
const Answer = require('../../answers/models/Answer');

// update comment service
const updateCommentService = async (UserId, commentId, body, AnswerId) => {
  // fetch answer
  const answer = await Answer.findOne({
    where: { id: AnswerId },
    attributes: ['id'],
  });

  // check if answer exists or not in dB
  if (!answer) {
    throw new ApplicationException('Answer does not exist', 404);
  }

  // fetch comment from dB
  const comment = await Comment.findOne(
    {
      where: {
        id: commentId,
      },
    },
  );

  // check if comment already exits in dB
  if (!comment) {
    throw new ApplicationException('Comment does not exist', 404);
  }

  // check if currently logged in user is creator of the comment
  if (UserId !== comment.UserId) {
    throw new ApplicationException('You are not allowed to update comment', 403);
  }

  // update comment
  comment.body = body;
  comment.AnswerId = Number(AnswerId);
  comment.UserId = UserId;

  const updatedComment = await comment.save();

  return updatedComment;
};

// export service
module.exports = updateCommentService;
