const express = require("express");
const scheduleClassController = require("../controllers/ClassController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
    "/admin/scheduleclass",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    scheduleClassController.scheduleClass
  );
 
  router.get(
    "/admin/getAll",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    scheduleClassController.getAllClasses
  );
  module.exports = router;