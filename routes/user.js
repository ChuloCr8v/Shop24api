const {
  verifyToken,
  verifyTokenAndAuth,
  verifyAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const User = require("../models/User");

//Edit User
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_PHRASE
    );
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updateUser);
  } catch (e) {
    res.status(500).json("internal error");
  }
});

//Delete User
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted successfully");
  } catch (e) {
    res.status(400).json(e);
  }
});

//Get User
router.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const date = new Date();
    const lastTwoMonths = new Date(date.setMonth(date.getMonth() - 2));
    console.log(lastTwoMonths);
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

//Get all users
router.get("/find", verifyAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find()
          .sort({
            _id: -1,
          })
          .limit(1)
      : await User.find();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//Get User Stats

router.get("/stats", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
