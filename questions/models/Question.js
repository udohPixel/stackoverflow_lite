const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');
// const Category = require('../../categories/models/Category');
// const User = require('../../users/models/User');

const Question = sequelize.define(
  'Question',
  {
  // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAnswers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    hasAcceptedAnswer: {
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
// User.hasMany(Question);
// Category.hasMany(Question);
// sequelize.sync({ alter: true });

// export model
module.exports = Question;
