const express = require("express");
const router = express.Router();

router.use("/user", require("./User"));
router.use("/module", require("./Module"));
router.use("/topic", require("./Topic"));
router.use("/ctf", require("./Ctf"));
router.use("/payment", require("./Payment"));

module.exports = router;
