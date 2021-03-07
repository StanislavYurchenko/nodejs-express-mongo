const express = require('express')
const { login, logout, register } = require('../../controllers/users.controller')
const { auth, newUser } = require('../../utils/validation')
const guard = require('../../utils/guard')

const router = express.Router()

router.post('/register', auth, register)

router.post('/login', auth, login)

router.post('/logout', guard, newUser, logout)

module.exports = router
