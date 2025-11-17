const express = require("express");
const router = express.Router();

router.use("/user", require("./User"));
router.use("/module", require("./Module"));
router.use("/topic", require("./Topic"));
router.use("/ctf", require("./Ctf"));
router.use("/payment", require("./Payment"));
router.use("/batch",require("./Batch"))
router.use("/lab",require("./Lab"))
router.use("/assessment",require("./assessment"))
router.use("/class",require("./Class"))
router.use("/leads",require("./register"))
router.use("/blogs",require("./blogRoutes"))
router.use("/sitemap",require("./sitemap"))
module.exports = router;
