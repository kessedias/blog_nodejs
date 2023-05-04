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
app.get("/", (req, res) => {

    Article.findAll().then(articles => {

        res.render("index", {articles: articles});
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

app.listen(8090, () => {
    console.log("Its running");
});