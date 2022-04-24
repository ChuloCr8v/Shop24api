const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String, required: true, unique: true
    },
    desc: {
      type: String, required: true
    },
    category: {
      type: Array
    },
    size: {
      type: Array
    },
    color: {
      type: Array
    },
    price: {
      type: Number, required: true
    },
    img: {
      type: String, required: true
    },
    status: {
      type: String, required: true
    },
    Quantity: {
      type: Number, required: true
    },
    Active: {
      type: Boolean, required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);