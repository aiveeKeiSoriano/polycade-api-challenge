


import { DataTypes } from 'sequelize';
import { sequelize } from '../db'

const Price = sequelize.define('Price', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// sequelize.sync( { force: true } )

Price.sync({ force: true })

export default Price