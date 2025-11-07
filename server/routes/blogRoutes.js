const express = require("express");
const {
  createBlog,
  updateBlogContent,
  getBlogs,
  getBlogById,
  deleteBlog, // <-- add this
} = require("../controllers/blogController");

const router = express.Router();
console.log("Blog routes loaded");

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin routes
router.post("/admin/create", createBlog);
router.put("/admin/content/:id", updateBlogContent); // change POST → PUT
router.delete("/admin/delete/:id", deleteBlog); // new route

module.exports = router;
