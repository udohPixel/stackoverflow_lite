const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');
// const Answer = require('../../answers/models/Answer');
// const User = require('../../users/models/User');

const Vote = sequelize.define(
  'Vote',
  {
  // Model attributes are defined here
    AnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isUpvote: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

// create table, check & perform changes in table to match model
// Answer.hasMany(Vote);
// User.hasMany(Vote);
// sequelize.sync({ alter: true });

// export model
module.exports = Vote;
