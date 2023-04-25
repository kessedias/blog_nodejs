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
        res.redirect("/admin/categories");
    });
}

router.get("/admin/categories/", (req, res)=>{

    Category.findAll().then(categories =>{

        res.render("admin/categories/index", {categories: categories});
    });
});

router.post("/categories/delete", (req, res)=>{

    var categoryid = req.body.id;

    if(categoryid != undefined){

        if(!isNaN(categoryid)){

            Category.destroy({
                where: {
                    id: categoryid
                }
            }).then(()=>{
                res.redirect('/admin/categories');
            });

        }else{//null diferente de numero
            res.redirect('/admin/categories');
        }

    }else{//null
        res.redirect('/admin/categories');
    }
});


module.exports = router;
