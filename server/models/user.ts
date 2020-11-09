import Sequelize, { DataTypes, ModelCtor } from "sequelize";
import sequelize from "../dbConfig";
import Todo from "./todo";
import { v4 as uuid } from "uuid";

// ANCHOR User Schema
/* eslint-disable @typescript-eslint/camelcase */
const User: ModelCtor<any> = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.hasMany(Todo, {
//   foreignKey: 'user_index', hooks:true,
// onDelete: 'CASCADE'
// })

export default User;
