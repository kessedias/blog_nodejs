const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//Lista form de novo artigo
router.get("/admin/articles/new", (req, res)=>{

    Category.findAll().then(categories =>{

        res.render("admin/articles/new", {categories: categories});
    });
});

//lista todos artigos
router.get("/admin/articles", (req, res)=>{
    
    Article.findAll({

        include: [{
            model: Category,
        }]

    }).then(articles => {

        res.render("admin/articles/index", {articles: articles})
    })
});

const public = path.join(__dirname, '../public'); // caminho para a pasta "public"
const tmp = path.join(public, 'tmp'); // caminho para a pasta "tmp" dentro da "public"

//lógica para criar a pasta tmp
if (!fs.existsSync(tmp)) { // verifica se a pasta "tmp" já existe

    fs.mkdirSync(tmp); // cria a pasta "tmp" se ela não existir
}

//Seta o armazenamento e conversão
const storage = multer.diskStorage({

    destination: path.join(__dirname, "../public/tmp"), //local
    filename: (req, file, cb) => { //tratamento da imagem
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

//Instancia o armazenamento e inicializa as configurações
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 10485760 //10MB 
    },
    fileFilter: (req, file, cb) => {

        checkFileType(file, cb);
    },
});

const checkFileType = function (file, cb) {
    //extensões permitidas
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    
    //verificando nomes das extensões
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    const mimeType = fileTypes.test(file.mimetype);
    
    if (mimeType && extName) {

        return cb(null, true);

    } else {

        cb("Você só pode utilizar arquivos de imagens!");
    }
};

//salva um artigo
router.post("/articles/save", upload.single('image'), (req, res)=>{

    var title = req.body.title;
    var resume = req.body.resume;
    var filename = req.file ? req.file.filename : null;
    var body = req.body.body;
    var categoryid = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        resume: resume,
        image: filename,
        body: body,
        categoryId: categoryid

    }).then(()=>{
        
        res.redirect('/admin/articles');
    });
});

//Deleta um artigo
router.post("/articles/delete", (req, res)=>{

    var articleid = req.body.id;

    if(articleid != undefined){

        if(!isNaN(articleid)){

            Article.destroy({
                where: {
                    id: articleid
                }
            }).then(()=>{
                res.redirect('/admin/articles');
            });

        }else{//null diferente de numero
            res.redirect('/admin/articles');
        }

    }else{//null
        res.redirect('/admin/articles');
    }
});

//lista um artigo
router.get("/admin/articles/edit/:id", (req, res)=>{

    var articleid = req.params.id;

    Article.findByPk(articleid).then(article => {

        if(article != undefined){

            Category.findAll().then(categories => {


                res.render("admin/articles/edit", {categories: categories, article: article});
            });

        }else{

            res.redirect("/");
        }

    }).catch(err =>{

        res.redirect("/");
    });

});

//atualiza o artigo
router.post("/articles/update", upload.single('image'), (req, res)=>{

    //TODO Apagar imagem temporária ao atualizar para uma nova
    //TODO validar front de extensões não aceitas e tamanho excedido
    var articleid = req.body.id;
    var title = req.body.title;
    var resume = req.body.resume;
    var filename = req.file ? req.file.filename : req.body.oldImage;
    var body = req.body.body;
    var category = req.body.category;

    Article.update(
        {
            title: title,
            resume: resume,
            image: filename,
            body: body,
            categoryId: category,
            slug: slugify(title)
        }, 
        {
            where: {
                id: articleid
            }
        }
    ).then(() => {

        res.redirect("/admin/articles");

    }).catch(err => {

        res.redirect("/")
    })
});

//rota de paginação
router.get("/articles/page/:num", (req, res)=>{

    //definindo a paginacao
    var page = req.params.num;
    var offset = 0;
    var limit = 3;

    if(isNaN(page) || page == 1){

        offset = 0;

    }else{

        offset =  (parseInt(page) -1) * limit;
    }

    //encontra com contador
    Article.findAndCountAll({

        limit: limit,
        offset: offset,
        order: [
            ['id', 'DESC']
        ],

    }).then(articles =>{

        var next;
        if(offset + limit >= articles.count){

            next = false;
            
        }else{
            
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        //resgatando categorias para manter o filtro na pagincao
        Category.findAll().then(categories =>{

            res.render("admin/articles/page", {result: result, categories, categories})
        });
    });
});

module.exports = router;
