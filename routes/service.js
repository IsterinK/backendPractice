const express = require("express");
const serviceController = require("../controllers/service");
const md_auth = require("../middleware/authenticated");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/services" });
const router = express.Router();

router.post("/new-service", [md_auth.ensureAuth, md_upload], serviceController.createService);

module.exports = router;
