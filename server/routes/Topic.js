const express = require("express");
const {
  seedTopic,
  update,
  addContent,
  getContent,
  getCtf,
  uploadImage,
} = require("../controllers/TopicController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

//admin routes
router.post(
  "/admin/seed",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  seedTopic
);
router.put(
  "/admin/update",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  update
);

router.post(
  "/admin/content",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  addContent
);

router.get(
  "/admin/getcontent",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  getContent
);

router.get(
  "/admin/getctfs",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  getCtf
);

router.post(
  "/admin/upload",
  isAuthenticatedUser,
  authorizeRoles("admin", "teacher"),
  uploadImage
);

module.exports = router;
