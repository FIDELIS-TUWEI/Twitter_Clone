const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const { createPost, deletePost } = require("../controllers/post.controller");
const router = express.Router();

router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);

module.exports = router;