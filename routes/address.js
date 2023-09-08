const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address")

router.get("/", addressController.getAddresses);
router.get("/axios", addressController.getAddressesAxios);
router.get("/mun/:department", addressController.getMun)

module.exports = router;