const Sequelize = require("sequelize");

const connection = new Sequelize('aula', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;