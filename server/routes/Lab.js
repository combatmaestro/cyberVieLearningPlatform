const express = require("express");
const labController = require("../controllers/LabController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get(
  "/adminRequest",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  labController.loginUser
);

router.get(
  "/startLab",
  isAuthenticatedUser,
//   authorizeRoles("student"),
  labController.startSubscription
);

router.get(
  "/createLab",
  isAuthenticatedUser,
//   authorizeRoles("student"),
  labController.createNewLabForUser
);
router.get(
  "/stopLab",
  isAuthenticatedUser,
//   authorizeRoles("student"),
  labController.stopLab
);

module.exports = router;
