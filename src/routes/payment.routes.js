const express = require('express');
const router = express.Router();
const paymentControllers = require("../controllers/payment.controllers");


router.post("/create-order", paymentControllers.createOrder)
router.post("/verify-payment", paymentControllers.verifyPayment);




module.exports = router;