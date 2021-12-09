

import { DataTypes } from 'sequelize';
import { sequelize } from '../db'
import Price from './prices';

const PricingModel = sequelize.define('Pricing', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Price.belongsTo(PricingModel)

PricingModel.hasMany(Price, { as: "pricing" });

// sequelize.sync( { force: true } )
PricingModel.sync({ force: true })

export default PricingModel