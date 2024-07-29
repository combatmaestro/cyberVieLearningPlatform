const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middlewares/authMiddleware')

router.post('/authenticate', UserController.authenticate)
router.get('/getDetails', isAuthenticatedUser, UserController.getDetails)
router.get('/signout', isAuthenticatedUser, UserController.signout)
router.put('/update', isAuthenticatedUser, UserController.update)
router.post('/leaderboard', isAuthenticatedUser, UserController.leaderboard)
router.get(
  '/admin/allUsers',
  isAuthenticatedUser,
  authorizeRoles('admin'),
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

module.exports = router
