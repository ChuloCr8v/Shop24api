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
router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    res.status(200).send(singleProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All Products
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        category: {
          $in: qCategory,
        },
      });
      console.log(qCategory);
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
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
