const express = require('express')
const Joi = require('joi')
const contactsModel = require('../../model/index')
const notFoundError = require('../../errors/notFoundError')

const router = express.Router()

const validateNewUser = (req, res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(9).required()
  })
  const validationResult = schema.validate(body)

  if (validationResult.error) {
    return res
      .status(404)
      .json({
        status: 'error',
        code: 404,
        data: { error: validationResult.error }
      })
  }

  next()
}

const validateUpdateUser = (req, res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10),
    email: Joi.string().email(),
    phone: Joi.string().min(7).max(9)
  })
  const validationResult = schema.validate(body)

  if (validationResult.error) {
    return res
      .status(404)
      .json({
        status: 'error',
        code: 404,
        data: { error: validationResult.error }
      })
  }

  next()
}

const validateId = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsModel.getContactById(contactId)
  if (!contact) {
    try {
      notFoundError()
    } catch (error) {
      next(error)
    }
  }

  next()
}

router.get('/', async (_req, res) => {
  const contacts = await contactsModel.listContacts()
  return res
    .status(200)
    .json({
      status: 'success',
      code: 200,
      data: { contacts: contacts }
    })
})

router.get('/:contactId', validateId, async (req, res) => {
  const { contactId } = req.params
  const contact = await contactsModel.getContactById(contactId)
  return res
    .status(200)
    .json({
      status: 'success',
      code: 200,
      data: { contact: contact }
    })
})

router.post('/', validateNewUser, async (req, res) => {
  const { body } = req
  const contact = await contactsModel.addContact(body)
  return res
    .status(201)
    .json({
      status: 'success',
      code: 201,
      data: { contact: contact }
    })
})

router.delete('/:contactId', validateId, async (req, res) => {
  const { contactId } = req.params
  const contact = await contactsModel.removeContact(contactId)

  return res
    .status(200)
    .json({
      status: 'success',
      code: 200,
      data: { contact: contact }
    })
})

router.patch('/:contactId', validateId, validateUpdateUser, async (req, res) => {
  const { contactId } = req.params
  const { body } = req
  const contact = await contactsModel.updateContact(contactId, body)

  return res
    .status(200)
    .json({
      status: 'success',
      code: 200,
      data: { contact: contact }
    })
})

module.exports = router
