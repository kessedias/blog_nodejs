const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{//link relativo
        type: Sequelize.STRING,
        allowNull: false
    },
    resume:{
        type: Sequelize.TEXT,
        allowNull: true

    },
    image:{
        type: Sequelize.STRING,
        allowNull: true

    },
    body:{//nome do campo
        type: Sequelize.TEXT,//tipo do campo
        allowNull: false //obrigatório

    }
});

//Criando relacionamento
Category.hasMany(Article); // 1:N
Article.belongsTo(Category);// 1:1

//validando se a tabela já existe
connection.query("SHOW TABLES LIKE 'articles'").then(results => {

    if (results[0].length > 0) {

        console.log('A tabela articles já existe!');

    } else {

        //cria a tabela
        Article.sync({force: true}).then(() => {

            console.log('Tabela articles sincronizada com sucesso!');

        }).catch(err => {
            console.log('Erro ao sincronizar a tabela articles:', err);
        });
    }

}).catch(err => {
        console.log('Erro ao verificar a tabela articles:', err);
});

module.exports = Article;