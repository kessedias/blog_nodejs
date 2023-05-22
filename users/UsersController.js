const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

//rota de listagem do usuário
router.get("/admin/users", (req, res)=>{

    res.send("listagem de usuários");
});

//rota do form de criação de usuário
router.get("/admin/users/create", (req, res)=>{

    res.render("admin/users/create");
});

//rota do form de criação de usuário
router.post("/users/create", (req, res)=>{

    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.create({

        email: email,
        password: hash

    }).then(() => {

        res.redirect("/");

    }).catch((err) => {

        res.redirect("/");
    });
});

module.exports = router;