const express = require('express')
const Joi = require('joi')
const contactsModel = require('../../model/contacts')

const router = express.Router()

const validateNewUser = (req, res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().empty('').default(''),
  })
  const validationResult = schema.validate(body)

  if (validationResult.error) {
    return res
      .status(400)
      .json({
        status: 'error',
        code: 400,
        data: validationResult.error
      })
  }

  next()
}

const validateUpdateUser = (req, res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().empty(''),
  })
  const validationResult = schema.validate(body)

  if (validationResult.error) {
    return res
      .status(400)
      .json({
        status: 'error',
        code: 400,
        data: validationResult.error
      })
  }

  next()
}

const createResponse = (res, data, error) => {
  // eslint-disable-next-line no-mixed-operators
  const code = error && error.code || !data && 404 || data && 200
  const status = data ? 'success' : 'invalid'

  return res
    .status(code)
    .json({ status, code, data: (data || error) })
}

router.get('/', async (_req, res) => {
  const { data, error } = await contactsModel.listContacts()

  createResponse(res, data, error)
})

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const { data, error } = await contactsModel.getContactById(contactId)

  createResponse(res, data, error)
})

router.post('/', validateNewUser, async (req, res) => {
  const { body } = req
  const { data, error } = await contactsModel.addContact(body)

  createResponse(res, data, error)
})

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const { data, error } = await contactsModel.removeContact(contactId)

  createResponse(res, data, error)
})

router.patch('/:contactId', validateUpdateUser, async (req, res) => {
  const { contactId } = req.params
  const { body } = req
  const { data, error } = await contactsModel.updateContact(contactId, body)

  createResponse(res, data, error)
})

module.exports = router
