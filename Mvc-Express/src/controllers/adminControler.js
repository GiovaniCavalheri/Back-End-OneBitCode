const postModel = require("../models/postModel");
const { post } = require("../routes");

const adminControler = {
  // ==> GET /admin
  index: (req, res) => {
    const posts = postModel.getAllPosts();

    res.render('', { posts })
  },

  // ==> GET /admin/create

  // ==> POST /admin/create

  // ==> GET /admin/edit/:id

  // ==> POST /admin/update/:id

  // ==> POST /admin/delete/:id
};

module.exports = adminControler;
