const { DataTypes } = require('sequelize/dist');

module.exports = (sequelize) => {
    sequelize.define('pricing', {
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
};


// PricingModel.sync({ force: true })