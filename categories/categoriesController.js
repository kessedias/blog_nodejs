const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

//Renderiza o form de criar uma categoria
router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new");
});

//Salva uma categoria
router.post("/categories/save", (req, res)=>{

    var title = req.body.title;

    title =! undefined ? createCategory(title, res) : res.redirect("/admin/categories/new");
});

/**
* Função para criar uma categoria
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

//Lista todas as categorias
router.get("/admin/categories/", (req, res)=>{

    Category.findAll().then(categories =>{

        res.render("admin/categories/index", {categories: categories});
    });
});

//Deleta uma categoria
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

//Lista uma categoria
router.get("/admin/categories/edit/:id", (req, res)=>{

    var categoryid = req.params.id;

    if(isNaN(categoryid)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(categoryid).then(category =>{

        if(category != undefined){

            res.render("admin/categories/edit" , {category: category})

        }else{

            res.redirect("/admin/categories");
        }

    }).catch(erro => {

        res.redirect("/admin/categories");
    });
});

//Atualiza uma categoria
router.post("/categories/update", (req, res)=>{

    var categoryid = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where: {id: categoryid}
        }

    ).then(()=>{

        res.redirect("/admin/categories");
    });
});


module.exports = router;
