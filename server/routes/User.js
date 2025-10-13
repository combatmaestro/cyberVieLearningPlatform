const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middlewares/authMiddleware')
const EnterpriseLead = require("../models/EnterpriseLead");

router.post('/authenticate', UserController.authenticate)
router.get('/getDetails', isAuthenticatedUser, UserController.getDetails)
router.get('/signout', isAuthenticatedUser, UserController.signout)
router.put('/update', isAuthenticatedUser, UserController.update)
router.post('/leaderboard', isAuthenticatedUser, UserController.leaderboard)
router.get(
  '/admin/allUsers',
  isAuthenticatedUser,
  authorizeRoles('admin','counsellor'),
  UserController.getAllUsers
)
router.get(
  '/admin/getTeachers',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  UserController.getTeachers
)
router.post(
  '/admin/editUser',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  UserController.editUser
)

router.post(
  '/admin/generateCertificate/:id',
  isAuthenticatedUser,
  // authorizeRoles('admin'),
  UserController.generateCertificate
);
router.post("/admin/enterprise-leads", UserController.enterpriseLeads);

module.exports = router
