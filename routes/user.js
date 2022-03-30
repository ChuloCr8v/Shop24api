const {
  verifyToken,
  verifyTokenAndAuth,
  verifyAdmin
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
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('user has been deleted successfully')
  } catch (e) {
    res.status(400).json(e)
  }
})

//Get User
router.get('/find/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const {
      password,
      ...other
    } = user._doc
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json(err)
  }
})

module.exports = router;

https://www.getpostman.com/collections/03cd01678a5dbce092ca