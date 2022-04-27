const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname: req.body.username,
    username: req.body.username,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PHRASE),
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

//Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(402).json("Wrong Username");
    
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SEC_PHRASE);
    const pass = hashedPassword.toString(CryptoJS.enc.Utf8)
    req.body.password !== pass && res.status(401).json('wrong password') 
    
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "5m" }
    );
    const { password, ...others } = user._doc; 
    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
