const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const dbConnect = require('./model/db/mongoDb')
const contactsRouter = require('./routes/api/contacts.router')
const authRouter = require('./routes/api/auth.router')
const usersRouter = require('./routes/api/users.router')
const { HTTP_CODE } = require('./utils/constants')
const { apiLimiter, authLimiter } = require('./utils/rateLimits')

const dbInit = async () => await dbConnect()
dbInit()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use('/api', apiLimiter)
app.use('/auth/register', authLimiter)

app.use('/api/contacts', contactsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use((req, res) => {
  return res.status(HTTP_CODE.NOT_FOUND).json({ message: ` URL: "${req.url} not found"` })
})

app.use((err, _req, res, next) => {
  if (err.code) {
    return res
      .status(err.code)
      .json({
        status: 'error',
        code: err.code,
        data: {
          error: err
        }
      })
  } else {
    next(err)
  }
})

app.use((err, _req, res, _next) => {
  return res
    .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
    .json({
      status: 'error',
      code: err.code || err.status,
      data: {
        error: err
      }
    })
})

module.exports = app
