const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//validando se a tabela já existe
connection.query("SHOW TABLES LIKE 'categories'").then(results => {

    if (results[0].length > 0) {

        console.log('A tabela categories já existe!');

    } else {

        //cria a tabela
        Category.sync({force: true}).then(() => {

            console.log('Tabela categories sincronizada com sucesso!');

        }).catch(err => {
            console.log('Erro ao sincronizar a tabela categories:', err);
        });
    }

}).catch(err => {
        console.log('Erro ao verificar a tabela categories:', err);
});

module.exports = Category;