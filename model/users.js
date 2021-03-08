
const User = require('./schemas/User')
const HTTP_CODE = require('../utils/constants')

const findUserByEmail = async (email) => {
  try {
    return { data: await User.findOne({ email }) }
  } catch (error) {
    return { error }
  }
}

const findUserById = async (id) => {
  try {
    return { data: await User.findById(id) }
  } catch (error) {
    return { error }
  }
}

const updateToken = async (_id, token) => {
  try {
    return { data: await User.findByIdAndUpdate(_id, { token }) }
  } catch (error) {
    return { error }
  }
}

const register = async (body) => {
  const { email } = body
  try {
    const { data } = await findUserByEmail(email)
    const isUserExist = Boolean(data)
    if (isUserExist) {
      const error = new Error()
      error.code = HTTP_CODE.CONFLICT
      error.message = `Email ${body.email} is already exist`
      throw error
    }

    const user = new User(body)
    return { data: await user.save() }
  } catch (error) {
    return { error }
  }
}

const login = async (body) => {
  const { email, password } = body
  try {
    const { data } = await findUserByEmail(email)
    const isValidPassword = data ? await data.validPassword(password) : false

    if (!data || !isValidPassword) {
      const error = new Error()
      error.code = HTTP_CODE.NOT_FOUND
      error.message = 'User or password is incorrect'
      throw error
    }
    return { data }
  } catch (error) {
    return { error }
  }
}

const logout = async (id) => {
  try {
    const user = User.findById(id)
    await User.updateToken(id, null)
    return { data: user }
  } catch (error) {
    return { error }
  }
}

const updateUserById = async (id, body) => {
  try {
    return { data: User.findByIdAndUpdate(id, body) }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  findUserByEmail,
  register,
  login,
  logout,
  updateToken,
  findUserById,
  updateUserById,
}
