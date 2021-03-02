const Joi = require('joi')
const mongoose = require('mongoose')

const newUser = (req, res, next) => {
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

  try {
    if (validationResult.error) {
      const error = new Error()
      error.message = validationResult.error.message
      error.code = 400
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

const updateUser = (req, _res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().empty(''),
  }).min(1)
  const validationResult = schema.validate(body)

  try {
    if (validationResult.error) {
      const error = new Error()
      error.message = validationResult.error.message
      error.code = 400
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

const id = (req, _res, next) => {
  const { contactId } = req.params
  const isIdValid = mongoose.Types.ObjectId.isValid(contactId)
  try {
    if (!isIdValid) {
      const error = new Error()
      error.message = 'Id is invalid'
      error.code = 400
      throw error
    }
  } catch (error) {
    next(error)
  }
  next()
}

module.exports = { newUser, updateUser, id }
