const express = require("express");
const router = express.Router();
const User = require("./User");

//rota de listagem do usuário
router.get("/admin/users", (req, res)=>{

    res.send("listagem de usuários");
});

//rota do form de criação de usuário
router.get("/admin/users/create", (req, res)=>{

    res.render("admin/users/create");
});

module.exports = router;