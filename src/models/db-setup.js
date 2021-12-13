
   
const sequelize = require('../db');

async function reset () {
	await sequelize.sync({force: true});
	sequelize.close()
}

reset();

module.exports = reset
