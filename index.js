const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController")
const articlesController = require("./articles/articlesController")

//html
app.set("view engine", "ejs");
app.get("/", (req, res) => {

    res.render("index");
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