const express = require("express");
const postsController = require('./controllers/posts.controler')

const router = express.Router();

router.get('/', postsController.index);
router.get('/posts/:id', postsController.show)

module.exports = router;
