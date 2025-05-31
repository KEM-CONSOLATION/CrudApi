const Product = require("../models/productModels");

//all logic needs to be in the controller

//get all Products
const getProducts = async (req, res) => {
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
};

//get single Product
const getProduct = async (req, res) => {
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
};

//update product
const updateProduct = async (req, res) => {
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
};

//delete product
const deleteProduct = async (req, res) => {
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
};

//add product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    console.log(req.body);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};
