const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');

const Category = sequelize.define(
  'Category',
  {
  // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);

// create table, check & perform changes in table to match model
// sequelize.sync({ alter: true });

// export model
module.exports = Category;
