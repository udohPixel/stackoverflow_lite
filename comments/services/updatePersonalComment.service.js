// import required modules
const Comment = require('../models/Comment');
const ApplicationException = require('../../common/ApplicationException');

// update comment service
const updateCommentService = async (UserId, commentId, body, AnswerId) => {
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
    throw new ApplicationException('Unauthorized', 401);
  }

  // update comment
  await Comment.update(
    {
      body, AnswerId, UserId,
    },
    {
      where: {
        id: commentId,
      },
    },
  );

  // get updated comment
  const updatedComment = await Comment.findByPk(commentId);

  return updatedComment;
};

// export service
module.exports = updateCommentService;
