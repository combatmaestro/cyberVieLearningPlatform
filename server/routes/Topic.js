const express = require("express");
const {
  seedTopic,
  update,
  addContent,
  getContent,
  getCtf,
  uploadImage,
  getTopics,
  addSubTopic
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

router.get(
  "/admin/gettopics",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getTopics
);

router.post(
  "/admin/subtopics/save",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addSubTopic
);




module.exports = router;
