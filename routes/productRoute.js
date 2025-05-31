const express = require("express");
const Product = require("../models/productModels"); // Import the Product model
const {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/productControllers"); // Import the controller function
// Import the necessary modules
const router = express.Router();

// Add this middleware to parse JSON bodies
// router.use(express.json());

router.get("/", getProducts);

router.get("/:id", getProduct);

// update product
router.put("/:id", updateProduct);

//delete product
router.delete("/:id", deleteProduct);

router.post("/", addProduct);

module.exports = router;
