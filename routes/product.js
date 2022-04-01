const Product = require("../models/Product");
const router = require("express").Router();
const { verifyAdmin, verifyTokenAndAuth } = require("./verifyToken");

router.post("/", verifyAdmin, async (req, res) => {
  //Create New Product
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

//Get One Product
router.get("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    res.status(200).send(singleProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All Products
router.get("/", verifyTokenAndAuth, async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Product
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Product
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted Successfully");
  } catch (e) {
    res.status(500).json(error);
  }
});

module.exports = router;
