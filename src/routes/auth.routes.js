const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const userControllers = require("../controllers/auth.controllers");

router.post("/user/register", userControllers.registerUser);
router.post("/user/login", userControllers.loginuser)

router.post("/seller/register", userControllers.registerSeller);
router.post("/seller/login", userControllers.loginSeller)

router.get("/auth/me", authMiddleware.authUser, userControllers.getMe);
router.put("/update", authMiddleware.authUser, userControllers.updateUser);

router.post("/auth/logout", userControllers.logoutUser)


module.exports = router;