const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

console.log("📌 Sitemap routes loaded");

router.get("/sitemap.xml", async (req, res) => {
  try {
    console.log("📌 /sitemap.xml endpoint hit");

    const baseUrl = "https://enterpriserm.ai";

    // ----- STATIC URLS -----
    const staticUrls = [
      "",
      "/blogs",
      "/contact",
      "/about"
    ]
      .map(
        (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
      )
      .join("");

    // ----- DYNAMIC BLOG URLS -----
    const blogs = await Blog.find({ published: true }).lean();

    const dynamicUrls = blogs
      .map((b) => {
        return `
        <url>
          <loc>${baseUrl}/blogs/${b.slug}</loc>
          <lastmod>${new Date(b.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");

    // ----- FINAL SITEMAP XML -----
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${dynamicUrls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.send(sitemap);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
