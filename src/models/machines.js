
import { DataTypes } from 'sequelize';
import { sequelize } from '../db'
import PricingModel from './pricing-models';

const Machine = sequelize.define('Machine', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Machine.PricingModels = Machine.hasOne(PricingModel);

PricingModel.hasOne(Machine, {
    foreignKey: {
        type: DataTypes.UUID
    },
    constraints: false,
});

Machine.belongsTo(PricingModel);

Machine.sync( { force: true } )


export default Machine