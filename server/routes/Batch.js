const express = require("express");
const moduleController = require("../controllers/BatchController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
    "/admin/save",
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
    moduleController.save
  );
  router.post(
    "/admin/studentEnroll",
    // isAuthenticatedUser,
    moduleController.enroll
  );


  router.get("/admin/getall", 
  // isAuthenticatedUser,
   moduleController.getAllBatches);

  module.exports = router;