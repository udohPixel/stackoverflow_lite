const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');

const Role = sequelize.define(
  'Role',
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
module.exports = Role;
