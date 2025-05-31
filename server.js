const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddlewares").errorHandler;
require("dotenv").config();
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;
const Frontend_URL =
  process.env.FRONTEND_URL || "https://crudapi-8wyj.onrender.com";
const corsOptions = {
  // origin: "*", // Allow all origins
  origin: [Frontend_URL], // Allow specified origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

app.use(errorHandler);
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
