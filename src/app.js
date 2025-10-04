const express = require('express');
const app = express();
const userRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRouter = require("./routes/product.routes");
const paymentRoutes = require("./routes/payment.routes");
const productModel = require('./models/products.model');
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");;


app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(cors({
      origin: "http://localhost:5173", 
      credentials: true

}));

app.use("/api", userRouter);
app.use('/', productRouter);
app.use("/payment", paymentRoutes);
app.use("/api/user", addressRouter);
app.use("/api", orderRouter);

app.post("/data", async (req,res) =>{
  const data = await productModel.updateOne(
  { _id: "68b8402bcbfd389675c5adbe" },
  {
    $set: {
      images: [
        "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      ]
    }
  }
);

res.send("updated")

})


module.exports = app;