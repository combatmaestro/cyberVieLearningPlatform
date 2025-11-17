const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Blog = require("../models/Blog"); // adjust the path if needed

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).lean();

    const blogUrls = blogs
      .map((b) => {
        const slug = slugify(b.title, { lower: true, strict: true });

        return `
          <url>
            <loc>https://enterpriserm.ai/blogs/${slug}</loc>
            <lastmod>${new Date(b.updatedAt).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogUrls}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating sitemap");
  }
});

// IMPORTANT
module.exports = router;
