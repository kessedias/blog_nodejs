const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController")
const articlesController = require("./articles/articlesController")

//models
const Article = require('./articles/Article');
const Category = require("./categories/Category");

//html
app.set("view engine", "ejs");

//Eixibição de artigos e categorias
app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        Category.findAll().then(categories =>{

            res.render("index", {articles: articles, categories: categories});
        });
    });
});

//static
app.use(express.static("public"));

// //body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//database
connection
    .authenticate().then(() => {

        console.log("Conexão realizada");

    }).catch((error) => {

        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);

app.use(bodyParser.json());

//Visualização do artigo pelo slug
app.get("/:slug", (req, res)=>{

    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {

        if(article != undefined){

            Category.findAll().then(categories =>{

                res.render("article", {article: article, categories: categories});
            });

        }else{

            res.redirect("/");
        }

    }).catch(err => {
        res.redirect("/");
    })
});

app.get("/category/:slug", (req, res)=>{

    var slug = req.params.slug;

    Category.findOne({
        
        //join
        include: [{model: Article}],
        where: {
            slug: slug
        }

    }).then(category => {

        if(category != undefined){

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })

        }else{
            
            res.redirect("/");
        }
    }).catch(err => {

        res.redirect("/");
    })
});

app.listen(8090, () => {
    console.log("Its running");
});