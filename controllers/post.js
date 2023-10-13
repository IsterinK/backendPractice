const express = require('express')
const Post = require('../model/post')

const createPost = async (req, res) =>{
    try {
        const { ...post } = req.body;
        if(post.avatar && post.avatar.trim() !== ""){
            const newPost = await Post({
                title: post.title, subtitle: post.subtitle, avatar: post.avatar , description: post.description
            })
            const postDB = await newPost.save()
            res.status(201).json(postDB)
        }else{
            const newPost = await Post({
                title: post.title, subtitle: post.subtitle, description: post.description
            })
            const postDB = await newPost.save()
            res.status(201).json(postDB)
        }        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

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