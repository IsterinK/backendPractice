const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")
const ensuAuth = require("../middleware/authenticated")

router.get("/", userController.getAllUsers);
router.post("/signup", userController.register);
router.delete("/remove/:id", [ensuAuth.ensureAuth], userController.deleteUser);
router.post("/login", userController.login);
router.get("/auth/getme", [ensuAuth.ensureAuth], userController.getMe);
router.patch("/auth/active/:id", [ensuAuth.ensureAuth], userController.changeActive);
 
module.exports = router;