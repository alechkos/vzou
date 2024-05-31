import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()


export const sequelize = new Sequelize(
  'avds', //enter you local db name
  'postgres', // do no touch
  process.env.TEST_DB_PASSWORD, // enter your local db password
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }
)