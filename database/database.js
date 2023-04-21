const Sequelize = require("sequelize");

const connection = new Sequelize('aula', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;