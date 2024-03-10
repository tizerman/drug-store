import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
        },
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false
    }
)