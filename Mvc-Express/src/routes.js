const express = require("express");
const postsController = require('./controllers/posts.controler');
const adminControler = require("./controllers/adminControler");

const router = express.Router();


// ==> Rotas do blog
router.get('/', postsController.index);
router.get('/posts/:id', postsController.show)

// ==> Rotas do amin 
router.get('/admin', adminControler.index)

module.exports = router;
