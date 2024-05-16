const express = require("express");
const moduleController = require("../controllers/ModuleController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getall", isAuthenticatedUser, moduleController.getAllModule);
router.get("/details", isAuthenticatedUser, moduleController.getDetails);

//admin controls
router.post(
  "/admin/seed",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  moduleController.seed
);

router.get(
  "/admin/details",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  moduleController.getTopicDetails
);

router.put(
  "/admin/update",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  moduleController.update
);

module.exports = router;
