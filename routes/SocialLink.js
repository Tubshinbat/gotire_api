const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
  createLinks,
  getLink,
  getLinks,
  deleteLink,
  updateLink,
} = require("../controller/SocialLink");

router.route("/").post(protect, createLinks).get(getLinks);

router
  .route("/:id")
  .get(getLink)
  .delete(protect, authorize("admin"), deleteLink)
  .put(protect, authorize("admin"), updateLink);

module.exports = router;
