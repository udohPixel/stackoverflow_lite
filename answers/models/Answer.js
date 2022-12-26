const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');
// const Question = require('../../questions/models/Question');
// const User = require('../../users/models/User');

const Answer = sequelize.define(
  'Answer',
  {
  // Model attributes are defined here
    body: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    QuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalVotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    isAcceptedAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true },
);

// create table, check & perform changes in table to match model
// Question.hasMany(Answer);
// User.hasMany(Answer);
// sequelize.sync({ alter: true });

// export model
module.exports = Answer;