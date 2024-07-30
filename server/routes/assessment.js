const express = require("express");
const assessmentController = require("../controllers/AssessmentController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
    "/admin/save",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    assessmentController.saveAssessment
  );

  router.post(
    "/user/submitAnswers",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    assessmentController.assessmentReview
  );

  router.get(
    "/teacher/review/:teacherId",
    isAuthenticatedUser,
    authorizeRoles("teacher"),
    assessmentController.getAllAssessmentsToReview
  );
router.get('/module/:moduleId', assessmentController.getAssessmentsByModuleId);

  module.exports = router;