const router = require("express").Router();
const Order = require("../models/order");
const { verifyToken, verifyAdmin } = require("./verifyToken");

//Create

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(newOrder);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get One Order

router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all orders

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Modify

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
