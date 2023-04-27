const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");


//Lista novo artigo
router.get("/admin/articles/new", (req, res)=>{

    Category.findAll().then(categories =>{

        res.render("admin/articles/new", {categories: categories});
    });

});

router.get("/admin/articles/", (req, res)=>{
    
    res.render("admin/articles/index")
});



module.exports = router;
