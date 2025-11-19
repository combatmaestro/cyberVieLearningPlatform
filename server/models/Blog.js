const mongoose = require("mongoose");

// Helper to auto-generate excerpt
function generateExcerpt(content) {
  if (!content) return "";
  const plain = content.replace(/<[^>]+>/g, ""); // remove HTML tags
  return plain.substring(0, 300);
}

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
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    metaTitle: {
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

    metaKeywords: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length >= 3 && arr.length <= 5;
        },
        message: "Focus keywords must be between 3 to 5",
      },

      // ✅ SAFE SETTER: Handles string OR array
      set: function (value) {
        if (!value) return [];

        // If already an array
        if (Array.isArray(value)) {
          return value
            .map((v) => v.trim().toLowerCase())
            .filter(Boolean);
        }

        // If value is a comma-separated string
        if (typeof value === "string") {
          return value
            .split(",")
            .map((v) => v.trim().toLowerCase())
            .filter(Boolean);
        }

        return [];
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
      default: "blog-post", // default already ensures value
      required: false, // ❌ remove required to avoid false validation errors
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate excerpt if not provided
blogSchema.pre("save", function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = generateExcerpt(this.content);
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
