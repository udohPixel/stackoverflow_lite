const { DataTypes } = require('sequelize');
const { sequelize } = require('../../providers/db');

const PasswordReset = sequelize.define(
  'PasswordReset',
  {
  // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordResetExpirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

// create table, check & perform changes in table to match model
// sequelize.sync({ alter: true });

// export model
module.exports = PasswordReset;
