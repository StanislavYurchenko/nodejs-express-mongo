const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, SchemaTypes } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is require'],
    unique: true,
    validate(value) {
      const isValidEmail = /\S+@\S+\.\S+/.test(String(value))
      return isValidEmail
    }
  },
  phone: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is require'],
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

contactSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact
