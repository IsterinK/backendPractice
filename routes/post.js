const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")


router.get("/", postController.getAllPosts);
router.post("/new-post", postController.createPost);
router.delete("/removepost/:id", postController.removePost);

module.exports = router;