// import required modules
const Comment = require('../models/Comment');
const ApplicationException = require('../../common/ApplicationException');
const { isAdmin } = require('../../common/helpers');
const Role = require('../../roles/models/Role');
const Answer = require('../../answers/models/Answer');
const { sequelize } = require('../../providers/db');

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
    throw new ApplicationException('You are not allowed to delete comment', 403);
  }

  // delete comment
  await Comment.destroy(
    {
      where: {
        id: commentId,
      },
    },
  );

  await Answer.update(
    { totalComments: sequelize.literal('totalComments - 1') },
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
