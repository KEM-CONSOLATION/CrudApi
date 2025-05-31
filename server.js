const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");

require("dotenv").config();

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce";
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//routes
app.use("/api/products", productRoute);

// mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Node APi is Runnung on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
