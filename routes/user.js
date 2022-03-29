const {
  verifyToken,
  verifyTokenAndAuth
} = require("./verifyToken")
const router = require('express').Router()
const User = require("../models/User")

router.put('/:id', verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PHRASE);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })

    res.status(200).json(updateUser)
  } catch (e) {
    res.status(500).json("internal error")
  }


})

module.exports = router 