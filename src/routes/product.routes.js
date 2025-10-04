const express = require('express');
const productController = require("../controllers/product.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");


const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/api/product",
     authMiddleware.authSeller,
     upload.array("images", 5),
     productController.createProduct
 )

 router.get("/seller/Products", 
    authMiddleware.authSeller, 
    productController.getSellerProduct
)
router.get("/", productController.getAllProducts);
router.get("/product-details/:id", productController.getProductsDetails)



module.exports = router;