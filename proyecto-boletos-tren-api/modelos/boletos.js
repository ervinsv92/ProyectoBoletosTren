const {DataTypes} = require('sequelize');
const db = require('../db'); 
const Ventas = require("./ventas");

const Boletos = db.define(
    'Boletos', 
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
        }
}, {
    tableName: "Boletos",
    timestamps: false,
    underscored: true
});

Boletos.hasMany(Ventas, {
    foreignKey: "id",
    constraints: true
});
    
module.exports = Boletos;