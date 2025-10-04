const productModel = require("../models/products.model");
const storageServices = require("../services/storage.service");



async function createProduct(req, res) {

    const { title, description, price, stock } = req.body
    const files = await Promise.all(req.files.map(async function (file) {
        return await storageServices.uploadFile(file.buffer)
    }))
    const seller = req.seller

    const realPrice = price

    const product = await productModel.create({
        title,
        description,
        images: files.map(file => file.url),
        price: {
            amount: realPrice.amount,
            currency: realPrice.currency
        },
        seller: seller._id,
        stock: parseInt(stock)
    })

    return res.status(201).json({
        message: "product created successfully",
        product
    })
}

async function getSellerProduct(req,res) {
  const seller = req.seller

  const product = await productModel.find({
     seller: seller._id
  })

  res.status(200).json({
    message: "seller products fetch successfully",
    product
  })
}


async function getAllProducts(req,res) {
   const products = await productModel.find().populate("seller");

   res.status(200).json({
    message: "All products fetched",
    products
   })
}


async function getProductsDetails(req,res) {
    const productId = req.params.id
    
    const product = await productModel.findOne({
         _id: productId
    })
 
    res.status(200).json({
      message: "products details fetch successfully",
      product
    })
}
module.exports = {
  createProduct,
  getSellerProduct,
  getAllProducts,
  getProductsDetails
};
