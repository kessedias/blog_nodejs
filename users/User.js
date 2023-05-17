const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//validando se a tabela já existe
connection.query("SHOW TABLES LIKE 'users'").then(results => {

    if (results[0].length > 0) {

        console.log('A tabela users já existe!');

    } else {

        //cria a tabela
        User.sync({force: true}).then(() => {

            console.log('Tabela users sincronizada com sucesso!');

        }).catch(err => {
            console.log('Erro ao sincronizar a tabela users:', err);
        });
    }

}).catch(err => {
        console.log('Erro ao verificar a tabela users:', err);
});

module.exports = User;