const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/posts');
  },
  filename: function (req, file, cb) {
    const extname = file.originalname.slice(((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2); 
    cb(null, 'image-' + Date.now() + '.' + extname); 
  },
});

const upload = multer({ storage: storage });

router.post("/new-post", upload.any(), postController.createPost);
router.get("/", postController.getAllPosts);
router.delete("/removepost/:id", postController.removePost);

module.exports = router;
