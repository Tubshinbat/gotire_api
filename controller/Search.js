const MyError = require("../utils/myError");

const Tire = require("../models/Tire");
const Wheel = require("../models/Wheel");
const SetProduct = require("../models/SetProduct");
const Product = require("../models/Product");

const asyncHandler = require("express-async-handler");
const { RegexOptions } = require("../lib/searchOfterModel");

exports.search = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const tires = await Tire.find({
    name: RegexOptions(name),
    status: true,
  }).populate("make");
  const wheels = await Wheel.find({ name: RegexOptions(name), status: true });
  const setProducts = await SetProduct.find({
    name: RegexOptions(name),
    status: true,
  });
  const products = await Product.find({
    name: RegexOptions(name),
    status: true,
  });

  res.status(200).json({
    success: true,
    tires,
    wheels,
    setProducts,
    products,
  });
});
