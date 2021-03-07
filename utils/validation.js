const Joi = require('joi')
const mongoose = require('mongoose')
const { HTTP_CODE } = require('./constants')

const newContact = (req, _res, next) => {
  const { body } = req
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    owner: Joi.string().empty('').default(''),
  })
  const validationResult = schema.validate(body)

  try {
    if (validationResult.error) {
      const error = new Error()
      error.message = validationResult.error.message
      error.code = HTTP_CODE.BAD_CONTENT
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

const updateContact = (req, _res, next) => {
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
      error.code = HTTP_CODE.BAD_CONTENT
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

const id = (req, _res, next) => {
  const { id } = req.params
  const isIdValid = mongoose.Types.ObjectId.isValid(id)
  try {
    if (!isIdValid) {
      const error = new Error()
      error.message = 'Id is invalid'
      error.code = HTTP_CODE.BAD_CONTENT
      throw error
    }
  } catch (error) {
    next(error)
  }
  next()
}

const auth = (req, _res, next) => {
  const { body } = req
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
  })
  const validationResult = schema.validate(body)

  try {
    if (validationResult.error) {
      const error = new Error()
      error.message = validationResult.error.message
      error.code = HTTP_CODE.BAD_CONTENT
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

const newUser = (req, _res, next) => {
  const { body } = req
  const schema = Joi.object({
    email: Joi.string().email().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().empty('').default(''),
  })
  const validationResult = schema.validate(body)

  try {
    if (validationResult.error) {
      const error = new Error()
      error.message = validationResult.error.message
      error.code = HTTP_CODE.BAD_CONTENT
      throw error
    }
  } catch (error) {
    next(error)
  }

  next()
}

module.exports = { newContact, updateContact, id, auth, newUser }
