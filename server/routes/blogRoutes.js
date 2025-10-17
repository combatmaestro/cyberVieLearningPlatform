const express = require("express");
const {
  createBlog,
  updateBlogContent,
  getBlogs,
  getBlogById,
} = require("../controllers/blogController");

const router = express.Router();
console.log("Blog routes loaded");

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin routes
router.post("/admin/create", createBlog);
router.post("/admin/content/:id", updateBlogContent);

module.exports = router;
