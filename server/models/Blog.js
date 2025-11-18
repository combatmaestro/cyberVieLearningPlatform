const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300, // optional
    },

    seoTitle: {
      type: String,
      required: true,
      trim: true,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    focusKeywords: {
      type: [String], // Array of keywords
      validate: {
        validator: function (arr) {
          return arr.length >= 3 && arr.length <= 5;
        },
        message: "Focus keywords must be between 3 to 5",
      },
    },

    articleType: {
      type: String,
      enum: [
        "blog-post",
        "news-article",
        "tutorial",
        "review",
        "how-to-guide",
      ],
      required: true,
      default: "blog-post",
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },

    thumbnail: { type: String, default: "" },

    images: [
      {
        type: String, // URLs of uploaded images
      },
    ],

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
);

module.exports = mongoose.model("Blog", blogSchema);
