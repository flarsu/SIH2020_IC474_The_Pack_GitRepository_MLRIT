const express = require('express')
const {getMe} = require('./controller')
const router = express.Router()
const { protect } = require('../../middleware/auth')
router.route('/me').get(protect, getMe)
module.exports = router
