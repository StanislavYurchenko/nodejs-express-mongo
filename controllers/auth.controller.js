const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const usersModel = require('../model/users')
const { createResponse } = require('../utils/createResponse')
const { HTTP_CODE } = require('../utils/constants')

dotenv.config()
const { JWT_SECRET } = process.env

const register = async (req, res) => {
  const { body } = req
  const { data: user, error: errorReg } = await usersModel.register(body)

  const code = user ? HTTP_CODE.CREATED : HTTP_CODE.CONFLICT

  if (errorReg) {
    return createResponse(res, user, errorReg, code)
  }

  const payload = { _id: user._id }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '240h' })

  await usersModel.updateToken(user._id, token)

  const newUser = user
    ? {
        _id: user._id,
        email: user.email,
        subscription: user.subscription,
        token
      }
    : undefined

  return createResponse(res, newUser, _, code)
}

const login = async (req, res) => {
  const { body } = req
  const { data, error } = await usersModel.login(body)
  const code = data ? HTTP_CODE.OK : HTTP_CODE.NOT_FOUND

  if (error) {
    return createResponse(res, data, error, code)
  }

  const payload = { _id: data._id }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '240h' })

  await usersModel.updateToken(data._id, token)

  const user = data
    ? {
        _id: data._id,
        email: data.email,
        subscription: data.subscription,
        token,
      }
    : undefined

  return createResponse(res, user, error, code)
}

const logout = async (req, res) => {
  const userId = req.user.id
  const { data, error } = await usersModel.logout(userId)
  const user = data
    ? {
        _id: data._id,
        email: data.email,
        subscription: data.subscription,
      }
    : undefined

  return createResponse(res, user, error)
}

module.exports = {
  register,
  login,
  logout,
}
