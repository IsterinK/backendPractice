const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")

router.get("/", userController.getAllUsers);
router.post("/signup", userController.register);
router.delete("/removeUser/:id", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;