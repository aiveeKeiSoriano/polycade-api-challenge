
   
const sequelize = require('../db');

async function reset () {
	await sequelize.sync({force: true});
}

reset();
sequelize.close()

module.exports = reset
