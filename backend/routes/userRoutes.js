const express = require('express')
const router = express.Router()
const { getAllUsers, toggleUserStatus, createUser, updateUser } = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/')
  .get(protect, admin, getAllUsers)
  .post(protect, admin, createUser)

router.route('/:id')
  .put(protect, admin, updateUser)

router.route('/:id/toggle-status')
  .put(protect, admin, toggleUserStatus)

module.exports = router
