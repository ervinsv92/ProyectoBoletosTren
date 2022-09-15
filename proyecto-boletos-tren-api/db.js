const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('VentaBoletos', 'root', '1234', {
    host: '192.168.100.10',
    dialect: 'mariadb'//,/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    //port:'3306'
});

const init = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();

module.exports = sequelize;