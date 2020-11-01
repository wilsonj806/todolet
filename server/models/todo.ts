import { DataTypes, ModelCtor } from 'sequelize'
import sequelize from '../dbConfig';
import User from './user';


// TODO Add foreign key for User
// ANCHOR Todo Schema
/* eslint-disable @typescript-eslint/camelcase */
const Todo: ModelCtor<any> = sequelize.define('Todo',{
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date()
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});
/* eslint-enable @typescript-eslint/camelcase */


export default Todo;
