const paymentModel = require("../models/payment.model");
const razorpayInstance = require("../services/payment.service");
const crypto = require("crypto");




const createOrder = async (req,res) => {   
 try {
     const {amount, currency, product_id, user_id} = req.body;

       const options = {
        amount: amount * 100,
        currency: currency,
    }
    const order = await razorpayInstance.orders.create(options);
    if(!order){
        return res.status(400).json({ message: "Order generation failed"})
    }

    const payment = await paymentModel.create({
            product_id: product_id, 
            order_id: order.id,
             amount: amount,
             currency: currency,
              user: user_id,
             status: "PENDING"
    })

    res.status(201).json({
        message: "order create successfully",
        order: payment,
        key_id: process.env.RAZORPAY_KEY_ID
    })
 } catch (error) {
    console.log(error); 
     return res.status(500).json({
      message: "Internal server error",
      error: error,
     });
 }
}

const verifyPayment = async (req, res) => {
  try {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id +"|"+ razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");
  console.log("expectedSignature", expectedSignature);
console.log("razorpay_signature", razorpay_signature);
console.log("req.body", req.body);


    if (expectedSignature === razorpay_signature) {
      await paymentModel.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          status: "SUCCESS",
          payment_id: razorpay_payment_id,
          signature: razorpay_signature,
        }
      );

      return res.status(200).json({
        message: "Payment verification successfull",
      });
    } else {
      await paymentModel.findOneAndUpdate(
        { order_id: razorpay_order_id }, 
        {
          status: "FAILED",
          payment_id: razorpay_payment_id,
        }
      );

      return res.status(400).json({
        message: "Payment verification Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
    createOrder,
    verifyPayment
}


