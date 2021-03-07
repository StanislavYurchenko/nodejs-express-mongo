const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')

const usersModel = require('../model/users')
const { createResponse } = require('../utils/createResponse')
const { HTTP_CODE } = require('../utils/constants')

dotenv.config()
const { JWT_SECRET } = process.env

const register = async (req, res) => {
  const { body } = req
  const { data, error } = await usersModel.register(body)

  const code = data ? HTTP_CODE.CREATED : HTTP_CODE.INTERNAL_SERVER_ERROR
  const newUser = data
    ? {
        _id: data._id,
        email: data.email,
        subscription: data.subscription,
      }
    : undefined
  return createResponse(res, newUser, error, code)
}

const login = async (req, res) => {
  const { body } = req
  const { data, error } = await usersModel.login(body)
  const code = data ? HTTP_CODE.OK : HTTP_CODE.NOT_FOUND
  const user = data
    ? {
        _id: data._id,
        email: data.email,
        subscription: data.subscription,
      }
    : undefined

  const payload = { _id: user._id }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '240h' })

  await usersModel.updateToken(user._id, token)

  return createResponse(res, token, error, code)
}

const logout = async (req, res) => {
  const userId = req.user.id
  const { data, error } = await usersModel.logout(userId)
  const code = data ? HTTP_CODE.OK : HTTP_CODE.NOT_FOUND
  const user = data
    ? {
        _id: data._id,
        email: data.email,
        subscription: data.subscription,
      }
    : undefined

  return createResponse(res, user, error, code)
}

module.exports = {
  register,
  login,
  logout,
}
