const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyAdmin
} = require("./verifyToken");


//Get Monthly Income
router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
  try {
    const income = await Order.aggregate([{
      $match: {
        createdAt: {
          $gte: lastMonth
        }
      }
    },
      {
        $project: {
          month: {
            $month: "$createdAt"
          },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales"
          },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(newOrder);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Get One Order

router.get("/:id", async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all orders

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Modify

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Order.findByIdAndUpdate(
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

//Delete

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;