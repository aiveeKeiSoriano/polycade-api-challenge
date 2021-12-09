
import { Sequelize } from 'sequelize/dist';
import config from './config/database.js'

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

