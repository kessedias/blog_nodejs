const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res)=>{

    var title = req.body.title;

    title =! undefined ? createCategory(title, res) : res.redirect("/admin/categories/new");
});

/**
* Cria uma categoria
* @param title => titulo da categoria
* @param res => resposta do servidor
*/
function createCategory(title, res){

    Category.create({
        title: title,
        slug: slugify(title)

    }).then(()=>{
        res.redirect("/");
    });
}


module.exports = router;
