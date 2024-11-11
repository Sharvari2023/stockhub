
const express = require('express');
const { createPost, getAllPosts, deletePost, upload } = require('../controllers/PostController');
const { isAuthenticated } = require('../middleware2');

const router = express.Router();

// to create a post
router.post("/create", upload.single("doc"), createPost);

// to fetch all posts
router.get("/", getAllPosts);

//to delete post by the creater
router.delete("/delete", isAuthenticated, deletePost);

module.exports = router;
