const express = require("express");
const router = express.Router();

const { search } = require("../controller/Search");

router.route("/").post(search);

module.exports = router;
