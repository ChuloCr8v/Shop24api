const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("connection successful");
});

app.use("/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
//app.use("/api", cloth)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connection to DB successful");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
