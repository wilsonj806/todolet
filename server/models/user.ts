import { DataTypes, ModelCtor } from 'sequelize'
import sequelize from '../dbConfig';


// ANCHOR User Schema
/* eslint-disable @typescript-eslint/camelcase */
const User: ModelCtor<any> = sequelize.define('User',{
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default User;
