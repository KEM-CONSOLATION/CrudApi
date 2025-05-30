const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModels"); // Import the Product model
// const dotenv = require("dotenv");
//routes

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({})
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    console.error("Error in /products route:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message || "Not found" });
      });
  } catch (error) {
    console.error("Error in /products route:", error);
    res.status(500).json({ message: error.message });
  }
});

// update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // we cannot find the product in the database
    if (!updatedProduct) {
      return res.status(404).json({ message: `Product of ${id} not found` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in /products route:", error);
    res.status(500).json({ message: error.message });
  }
});

//delete product

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    // we cannot find the product in the database
    if (!deletedProduct) {
      return res.status(404).json({ message: `Product of ${id} not found` });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in /products route:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.post("/add-product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://ConsolationLotachi:Developer1@mernapp.vrcv6nx.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=MERNapp"
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("Node APi is Runnung on Port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
