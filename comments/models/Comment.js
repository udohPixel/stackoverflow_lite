const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');
// const Answer = require('../../answers/models/Answer');
// const User = require('../../users/models/User');

const Comment = sequelize.define(
  'Comment',
  {
  // Model attributes are defined here
    body: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    AnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

// create table, check & perform changes in table to match model
// User.hasMany(Comment);
// Answer.hasMany(Comment);
// sequelize.sync({ alter: true });

// export model
module.exports = Comment;
