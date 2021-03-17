const bcrypt = require('bcryptjs')
const jest = require('jest')
const { users } = require('./data')

console.log("we are here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

const findUserByEmail = jest.fn((email) => {
  const [user] = users.filter((user) => String(user.email) === String(email))
  return { data: user }

})

const findUserById = jest.fn((id) => {
  const [user] = users.filter((user) => String(user._id) === String(id))
  return { data: user }
})

const updateToken = jest.fn((id, token) => {
  // try {
  //   return { data: await User.findByIdAndUpdate(id, { token }) }
  // } catch (error) {
  //   return { error }
  // }
})

const register = jest.fn((body) => {
  return {}
  // const { email } = body
  // try {
  //   const { data } = await findUserByEmail(email)
  //   const isUserExist = Boolean(data)
  //   if (isUserExist) {
  //     const error = new Error()
  //     error.code = HTTP_CODE.CONFLICT
  //     error.message = `Email ${body.email} is already exist`
  //     throw error
  //   }

  //   const user = new User(body)
  //   return { data: await user.save() }
  // } catch (error) {
  //   return { error }
  // }
})

const login = jest.fn((body) => {
  return {}
  // const { email, password } = body
  // try {
  //   const { data } = await findUserByEmail(email)
  //   const isValidPassword = data ? await data.validPassword(password) : false

  //   if (!data || !isValidPassword) {
  //     const error = new Error()
  //     error.code = HTTP_CODE.NOT_FOUND
  //     error.message = 'User or password is incorrect'
  //     throw error
  //   }
  //   return { data }
  // } catch (error) {
  //   return { error }
  // }
})

const logout = jest.fn((id) => {
  return {}
  // try {
  //   const user = await User.findById(id)
  //   await updateToken(id, null)
  //   return { data: user }
  // } catch (error) {
  //   return { error }
  // }
})

const updateUserById = jest.fn((id, body) => {
  return {}
})

const updateAvatar = jest.fn((id, avatar) => {
  return {}
})

module.exports = {
  findUserByEmail,
  register,
  login,
  logout,
  updateToken,
  findUserById,
  updateUserById,
  updateAvatar,
}
