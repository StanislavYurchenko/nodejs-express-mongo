const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const uri = process.env.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise,
}

const dbConnect = async () => {
  try {
    mongoose.connect(uri, options)
    const db = mongoose.connection
    db.once('open', () => console.log('<<< Connected to mongoDB >>>'))
    db.on('error', console.error.bind(console, 'connection error:'))
  } catch (error) {

  }
}

module.exports = dbConnect
