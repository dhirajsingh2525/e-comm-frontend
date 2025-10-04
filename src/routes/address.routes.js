const express = require('express');
const router = express.Router();
const addressController = require("../controllers/address.controller");
const authMiddleware = require("../middleware/auth.middleware");



router.post("/address", authMiddleware.authUser, addressController.addressForm);
router.get("/address", authMiddleware.authUser, addressController.getAddress);




module.exports = router;