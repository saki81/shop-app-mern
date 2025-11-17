const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");
const cors = require("cors")


dotenv.config();
const app = express();


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
   .then(()=>console.log("db connection"))
   .catch((err)=>{
      console.log(err)
   });


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
   console.log(`${req.method} ${req.path}`);
   next();
 });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Running backend...")
});