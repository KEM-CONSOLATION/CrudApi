const Product = require("../models/productModels");
const ayncHandler = require("express-async-handler");
//all logic needs to be in the controller

//get all Products
const getProducts = ayncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500);
        throw new Error(error.message || "Not found");
      });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Not found");
  }
});

//get single Product
const getProduct = ayncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500);
        throw new Error(error.message || "Not found");
      });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Not found");
  }
});

//update product
const updateProduct = ayncHandler(async (req, res) => {
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
    res.status(500);
    throw new Error(error.message || "Not found");
  }
});

//delete product
const deleteProduct = ayncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    // we cannot find the product in the database
    if (!deletedProduct) {
      res.status(404);
      throw new Error(`Product of ${id} not found`);
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Not found");
  }
});

//add product
const addProduct = ayncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    console.log(req.body);
    res.status(500).json({ message: error.message });
  }
});
module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};
