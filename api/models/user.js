"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide your First Name",
          },
          notEmpty: {
            msg: "Please provide your First Name.",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide your Last Name",
          },
          notEmpty: {
            msg: "Please provide your last name.",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email address was already used. Try sign in",
        },
        validate: {
          notNull: {
            msg: "Please provide your e-mail address",
          },
          notEmpty: {
            msg: "Please provide your e-mail address",
          },
          isEmail: {
            msg: "Please enter a valid email address.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Course);
  };

  return User;
};
