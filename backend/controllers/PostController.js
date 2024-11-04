
const Post = require('../model/PostModel.js');
const multer = require('multer');

// Multer setup for file uploads--middleware for file uplod
const upload = multer({ dest: "uploads/" });

//  to create a post
const createPost = async (req, res) => {
  try {
    const { content, username } = req.body;
    let docPath = null;

    // Handle file upload if a file is provided
    if (req.file) {
      docPath = req.file.path;
    }

    const newPost = new Post({ content, doc: docPath, username });
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
  try {
    const { postId, username } = req.body;
    console.log(`Received delete request with postId: ${postId}, username: ${username}`);

    // Check if the post exists and if the requesting user is the owner
    const post = await Post.findOne({ _id: postId });

    // If post doesn't exist or the username doesn't match

    if (!post || post.username !== post.username) {
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
