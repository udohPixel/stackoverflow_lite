// import required modules
const Comment = require('../models/Comment');
const ApplicationException = require('../../common/ApplicationException');
const { isAdmin } = require('../../common/helpers');
const Role = require('../../roles/models/Role');
const Answer = require('../../answers/models/Answer');

// delete comment service
const deleteCommentService = async (UserId, RoleId, commentId) => {
  // fetch comment by id from dB
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

  // fetch role by id from dB
  const role = await Role.findByPk(RoleId);

  // check if currently logged in user is creator of the comment
  if (!((UserId === comment.UserId) || isAdmin(role.title))) {
    throw new ApplicationException('Unauthorized', 401);
  }

  // delete comment
  await Comment.destroy(
    {
      where: {
        id: commentId,
      },
    },
  );

  // fetch all comments
  const allComments = await Comment.findAll({
    where: {
      AnswerId: Number(comment.AnswerId),
    },
  });

  // update totalComments
  await Answer.update(
    { totalComments: allComments.length },
    {
      where: {
        id: Number(comment.AnswerId),
      },
    },
  );

  return comment;
};

// export service
module.exports = deleteCommentService;
