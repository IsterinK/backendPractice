const express = require('express')
const Post = require('../model/post')
const IMAGE_UPLOAD_DIR = "./uploads/posts"
const multiparty = require('multiparty');

const createPost = async (req, res) => {
    const form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.send({ error: err.message });
        }

        try {
            const post = new Post();

            if (fields.title && fields.title[0]) {
                post.title = fields.title[0];
            }
            if (fields.subtitle && fields.subtitle[0]) {
                post.subtitle = fields.subtitle[0];
            }
            if (fields.description && fields.description[0]) {
                post.description = fields.description[0];
            }

            if (files.avatar && files.avatar[0]) {
                const imagePath = files.avatar[0].path;
                const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\")+1)
                post.avatar = `uploads/posts/${imageFileName}`;
            }

            const postDB = await post.save()

            res.status(201).json({ message: "Post creado con éxito ", postDB });
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message });
        }
    });
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