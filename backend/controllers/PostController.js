
const Post = require('../model/PostModel.js');
const multer = require('multer');
const {storage}=require('../cloudConfig.js')
// Multer setup for file uploads--middleware for file uplod
const upload = multer({ storage });

//  to create a post
const createPost = async (req, res) => {
    try {
      let docPath = null;
  
      // Handle file upload if a file is provided
      if (req.file) {
        docPath = req.file.path; // URL path for the uploaded image
      }
  
      const { content, username } = req.body;
  
      // Create a new post object
      const newPost = new Post({
        content,
        doc: { url: docPath, filename: req.file ? req.file.filename : null }, // Ensure filename is available if file exists
        username,
      });
  
      await newPost.save();
  
      res.status(201).json({ message: "Post created successfully", post: newPost });
      console.log("Post created successfully");
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
// to get all posts

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}, { content: 1, username: 1, doc: 1 }); // Explicitly selecting fields
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  console.log(req.user);
  console.log("clicked delete")
  try {
    const { postId, username } = req.body;
    const loggedInUsername = req.user.username;
    console.log(`Received delete request with postId: ${postId}, username: ${username},usernames:${loggedInUsername}`);

    // Check if the post exists and if the requesting user is the owner
    const post = await Post.findOne({ _id: postId });

    // If post doesn't exist or the username doesn't match
    console.log(`logged in username id ${loggedInUsername}`)
    if (!post || post.username != loggedInUsername) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  upload,
};
