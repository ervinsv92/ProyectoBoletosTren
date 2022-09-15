const {DataTypes} = require('sequelize');
const db = require('../db'); 
const Boletos = require("./boletos");

const Ventas = db.define(
    'Ventas', 
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idBoleto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field:"idBoleto"
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
        }
}, {
    tableName: "Ventas",
    timestamps: false,
    underscored: true
});

Ventas.associate = (Models) =>{
    const { Boletos } = Models;

    Ventas.belongsTo(Boletos, {
        foreignKey: "id",
        constraints: true,
        as:"ventas_boletos"
    });
}

module.exports = Ventas;
