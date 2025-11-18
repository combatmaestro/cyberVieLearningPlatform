const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const errorMiddleware = require("./middlewares/errors");
require("dotenv").config({ path: "server/config/config.env" });
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileupload());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// Register API ROUTES FIRST
app.use("/", require("./routes/index"));

// Production only — MUST come AFTER your routes
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // keep sitemap available in production
  app.use("/sitemap/sitemap.xml", (req, res, next) => {
    console.log("📌 Letting sitemap through to router");
    next();
  });

  // React fallback (catch-all)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
