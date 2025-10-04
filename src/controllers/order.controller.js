const orderModel = require("../models/order.model");
const productModel = require("../models/products.model");
const usersModel = require("../models/users.model");


async function createOrder(req,res) {
    const { userId, products  } = req.body

      const user = await usersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      
    for( let item of products){
      const product = await productModel.findById(item.productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
  }

    const newOrder = await orderModel.create({
         userId,
         products,
         status: "Pending"
    })

    res.status(201).json({
        message: "order confirm",
        order: newOrder
    })
}

async function getOrder(req, res) {
        const orders = await orderModel.find()
      .populate("userId", "fullname email")      
      .populate("products.productId", "title price images"); 
      console.log(orders,"order") 
      
      if(orders.length === 0){
        return res.status(404).json({ message: "Order not found" });
      }

    res.status(200).json({
      message: "Orders fetched successfully ✅",
      orders,
    });

}

module.exports = {
    createOrder,
    getOrder
}