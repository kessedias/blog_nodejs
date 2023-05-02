const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");


//Lista novo artigo
router.get("/admin/articles/new", (req, res)=>{

    Category.findAll().then(categories =>{

        res.render("admin/articles/new", {categories: categories});
    });

});

router.get("/admin/articles/", (req, res)=>{
    
    res.render("admin/articles/index")
});

router.post("/articles/save", (req, res)=>{

    var title = req.body.title;
    var body = req.body.body;
    var categoryid = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryid

    }).then(()=>{
        
        res.redirect('/admin/articles');
    })

});



module.exports = router;
