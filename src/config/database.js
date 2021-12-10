const env = require('dotenv');
env.config();

module.exports = {
	username: 'polycade',
	password: 'polycade',
	database: 'polycade',
	host: 'localhost',
	dialect: 'postgres',
	port: process.env.POSTGRES_PORT || '5342'
};