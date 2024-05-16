const express = require('express')
const router = express.Router()
const CTFController = require('../controllers/CTFController')
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middlewares/authMiddleware')

router.post(
  '/admin/seed',
  isAuthenticatedUser,
  authorizeRoles('admin', 'teacher'),
  CTFController.seed
)
router.put(
  '/admin/update',
  isAuthenticatedUser,
  authorizeRoles('admin', 'teacher'),
  CTFController.update
)

router.post('/submit', isAuthenticatedUser, CTFController.submit)

module.exports = router
