const express = require('express')
const { getContacts, getContactById, addContact, removeContactById, updateContactById } = require('../../controllers/contacts.controller')
const { id, newContact, updateContact } = require('../../utils/validation')
const guard = require('../../utils/guard')

const router = express.Router()

router.get('/', guard, getContacts)

router.get('/:id', guard, id, getContactById)

router.post('/', guard, newContact, addContact)

router.delete('/:id', guard, id, removeContactById)

router.patch('/:id', guard, id, updateContact, updateContactById)

module.exports = router
