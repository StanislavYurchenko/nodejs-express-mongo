const express = require('express')
const controller = require('../../controllers/contacts.controller')
const validation = require('../../utils/validation')

const router = express.Router()

router.get('/', controller.getContacts)

router.get('/:contactId', validation.id, controller.getContactById)

router.post('/', validation.newUser, controller.addContact)

router.delete('/:contactId', validation.id, controller.removeContactById)

router.patch('/:contactId', validation.id, validation.updateUser, controller.updateContactById)

module.exports = router
