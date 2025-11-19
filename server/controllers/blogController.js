const Blog = require("../models/Blog");

// @desc    Create new blog
// @route   POST /api/blogs/admin/create
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords,
      thumbnail,
      content,
      articleType,
    } = req.body;

    const blog = await Blog.create({
      title,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords,
      thumbnail,
      content,
      articleType,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog content
// @route   POST /api/blogs/admin/content/:id
// @access  Private/Admin
const updateBlogContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords,
      thumbnail,
      content,
      articleType,
    } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        metaTitle,
        metaDescription,
        metaKeywords,
        thumbnail,
        content,
        articleType,
      },
      { new: true }
    );
    

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog by id
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Edit an existing blog (title/content/details)
// @route   PUT /api/blogs/admin/edit/:id
// @access  Private/Admin
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords,
      thumbnail,
      content,
      articleType,
    } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        metaTitle,
        metaDescription,
        metaKeywords,
        thumbnail,
        content,
        articleType,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/admin/delete/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    await blog.deleteOne();
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createBlog,
  updateBlogContent,
  getBlogs,
  getBlogById,
  editBlog,
  deleteBlog,
};
