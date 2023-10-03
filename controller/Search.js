const MyError = require("../utils/myError");

const Tire = require("../models/Tire");
const Wheel = require("../models/Wheel");
const SetProduct = require("../models/SetProduct");
const Product = require("../models/Product");

const asyncHandler = require("express-async-handler");
const { RegexOptions } = require("../lib/searchOfterModel");

exports.search = asyncHandler(async (req, res) => {
    const name = req.query.name;
    const tires = await Tire.find({ name: RegexOptions(name) })
    const wheel = await Wheel.find({ name: RegexOptions(name) })
    const setProduct = await SetProduct.find({ name: RegexOptions(name) })
    const product = await Product.find({ name: RegexOptions(name) })

    const data = [...tires, ...wheel, ...setProduct, ...product];
    res.status(200).json({
        success: true,
        data: data
    })

})