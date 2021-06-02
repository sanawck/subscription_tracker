
const { Model, DataTypes } = require("sequelize");
// const bcrypt = require('bcrypt');
const sequelize = require("../config/connection");


class Memberships extends Model {}

Memberships.init(
  {

    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    events_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Events",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Memberships",
  }
);

module.exports = Memberships;




// {
//   "user_id": 1,
//   "events_id": 1
// },
// {
//   "user_id": 1,
//   "events_id": 2
// },
// {
//   "user_id": 1,
//   "events_id": 3
// }