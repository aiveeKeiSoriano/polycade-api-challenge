import env from 'dotenv'
env.config()

export default {
    username: 'polycade',
    password: 'polycade',
    database: 'polycade',
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT || '5342'
}