import { Sequelize, Dialect } from 'sequelize';

const configObj = {
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const sequelize = new Sequelize(configObj)

export default sequelize