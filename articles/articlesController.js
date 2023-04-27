const express = require("express");
const router = express.Router();


//Lista novo artigo
router.get("/admin/articles/new", (req, res)=>{
    res.render("admin/articles/new");
});

router.get("/admin/articles/", (req, res)=>{
    
    res.render("admin/articles/index")
});



module.exports = router;
