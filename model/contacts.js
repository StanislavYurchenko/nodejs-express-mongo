const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    required: true,
  },
})

const Contact = mongoose.model('Contact', contactSchema)

const listContacts = async () => {
  try {
    return { data: await Contact.find() }
  } catch (error) {
    return { error }
  }
}

const getContactById = async (contactId) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(contactId)

  try {
    if (!isIdValid) {
      const error = new Error()
      error.message = 'Id is invalid'
      error.code = 400
      throw error
    }
    return { data: await Contact.findById(contactId) }
  } catch (error) {
    return { error }
  }
}

const addContact = async (body) => {
  try {
    return { data: await Contact.create(body) }
  } catch (error) {
    return { error }
  }
}

const removeContact = async (contactId) => {
  try {
    return { data: await Contact.findByIdAndDelete(contactId) }
  } catch (error) {
    return { error }
  }
}

const updateContact = async (contactId, body) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(contactId)
  try {
    if (!isIdValid) {
      const error = new Error()
      error.message = 'Id is invalid'
      error.code = 400
      throw error
    }
    return { data: await Contact.findByIdAndUpdate(contactId, body, { new: true }) }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
