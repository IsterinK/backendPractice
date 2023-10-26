const express = require('express')
const Post = require('../model/post')
const IMAGE_UPLOAD_DIR = "./uploads/posts"
const multiparty = require('multiparty');

const createPost = async (req, res) => {
    try {
      const { title, subtitle, description } = req.body;
      const avatarPaths = req.files.map(file => file.path);
  
      const post = new Post({
        title,
        subtitle,
        description,
        avatar: avatarPaths,
      });
  
      const postDB = await post.save();
  
      res.status(201).json({ message: "Post creado con éxito", post: postDB });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
};
  

const getAllPosts = async (req, res) => {
    try {
        const response = await Post.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

const removePost = async (req, res) => {
    const { id } = req.params;
    try{
        const postDelete = await Post.findByIdAndRemove(id);
        res.status(200).json(postDelete)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    removePost
}