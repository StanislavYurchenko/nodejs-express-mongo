const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const dbConnect = require('./db/mongoDb')
const contactsRouter = require('./routes/api/contacts.router')

const dbInit = async () => await dbConnect()
dbInit()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  return res.status(404).json({ message: ` URL: "${req.url} not found"` })
})

app.use((err, _req, res, next) => {
  if (err.code === 404 || err.code === 400) {
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
    .status(500)
    .json({
      status: 'error',
      code: err.code || err.status,
      data: {
        error: err
      }
    })
})

module.exports = app
