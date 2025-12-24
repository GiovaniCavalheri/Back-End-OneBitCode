const express = require("express");
const postsController = require('./controllers/posts.controler');
const adminControler = require("./controllers/adminControler");

const router = express.Router();


// ==> Rotas do blog
router.get('/', postsController.index);
router.get('/posts/:id', postsController.show)

// ==> Rotas do amin 
router.get('/admin', adminControler.index)
router.get('/admin/create', adminControler.create)
router.get('/admin/edit/:id', adminControler.edit)
router.post('/admin/create', adminControler.save)
router.post('/admin/update/:id', adminControler.update)
router.post('/admin/delete/:id', adminControler.delete)


module.exports = router;
