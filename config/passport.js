const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const dotenv = require('dotenv')
const userModel = require('../model/users')
const HTTP_CODE = require('../utils/constants')
// const userModel = require('../model/__mocks__/users')

dotenv.config()
const { JWT_SECRET } = process.env

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new Strategy(params, async (payload, done) => {
  try {
    const id = payload._id
    const { data } = await userModel.findUserById(id)
    // console.log('<<< passport 2>>>',  data);
    if (!data) {
      const error = new Error()
      error.message = 'User not found'
      error.code = HTTP_CODE.NOT_FOUND
      throw error
    }
    if (!data.token) {
      return done(null, false)
    }
    return done(null, data)
  } catch (error) {
    done(error, false)
  }
}))
