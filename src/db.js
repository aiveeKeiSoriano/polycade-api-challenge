const { DataTypes, Sequelize } = require('sequelize/dist');
const config = require('./config/database.js');

const sequelize = new Sequelize(
  config
);

const modelDefiners = [
  require('./models/prices'),
  require('./models/machines'),
  require('./models/pricing-models')
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
const { price, pricing, machine } = sequelize.models;

price.belongsTo(pricing);

pricing.hasMany(price, { as: 'prices' });

pricing.hasOne(machine, {
  foreignKey: {
    type: DataTypes.UUID
  },
  constraints: false
});

machine.belongsTo(pricing);

// sequelize.sync({alter: true});

module.exports = sequelize;