import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

// It is a production db connection, when we will finish this proj -> uncomment this
// const DB_NAME = process.env.NODE_ENV === 'dev' ?process.env.TEST_DB_NAME!: process.env.DB_NAME!
// export const sequelize = new Sequelize(
//   DB_NAME,
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD,
//   {
//     dialect: 'postgres',
//     host: process.env.DB_HOST,
//     port: 5432
//   }
// )

// comment the section before the production
export const sequelize = new Sequelize(
  'avds', //enter you local db name
  'postgres', // do no touch
  process.env.TEST_DB_PASSWORD, // enter your local db password
  //do not touch this obj
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }
)
