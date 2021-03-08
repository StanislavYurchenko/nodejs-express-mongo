const express = require('express')
const controller = require('../../controllers/auth.controller')
const validate = require('../../utils/validation')
const guard = require('../../utils/guard')

const router = express.Router()

router.post('/register', validate.auth, controller.register)

router.post('/login', validate.auth, controller.login)

router.post('/logout', guard, validate.newUser, controller.logout)

module.exports = router
