const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err){
        res.status(403).json('Token is invalid');
    }
      req.user = user;
      next()
    })
} else {
  res.status(401).json("you are not authenticated")
}
}

const verifyTokenAndAuth = (req, res, next) => {
verifyToken(req, res, () => {
if (req.user.id === req.params.id || req.user.isAdmin) {
next()
} else {
res.status(403).json("You are not allowed to do that")
}
})
}

const verifyAdmin = (req, res, next) => {
if (req.user.isAdmin) {
next()
}
}

module.exports = {
verifyAdmin,
verifyToken,
verifyTokenAndAuth
}