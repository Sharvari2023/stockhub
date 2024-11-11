
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    doc: {
    //   type: String,
      url:String,
      filename:String,
    },
    username: {
      type: String,
      required: false, 
    },
  }, { timestamps: true });
  

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
