// => salvando em memória;
let posts = [];

// Post = { id, title, content, createdAt, updatedAt }

const postModel = {
  getAllPosts() {
    return posts; 
  },

  getPostById(id) {
    return posts.find(post => post.id === id)
  },

  createPost(title, content) {
    const newPost = {
        id: Date.now().toString(), 
        title: title, 
        content: content,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    return newPost; 
  },

  savePost(post) {
    posts.push(post);
  },

  updatePost(id, updatedPost) {
    
  }, 

  deletePost(id) {
    
  }
};
