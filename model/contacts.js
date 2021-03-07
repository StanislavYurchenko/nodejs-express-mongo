
const Contact = require('./schemas/Contact')

const listContacts = async (userId) => {
  try {
    return {
      data: await Contact.find({ owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      })
    }
  } catch (error) {
    return { error }
  }
}

const getContactById = async (contactId, userId) => {
  try {
    return {
      data: await Contact.findOne({ _id: contactId, owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      })
    }
  } catch (error) {
    return { error }
  }
}

const addContact = async (body, userId) => {
  try {
    return {
      data: await Contact.create({ ...body, owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      })
    }
  } catch (error) {
    return { error }
  }
}

const removeContact = async (contactId, userId) => {
  try {
    return {
      data: await Contact.findOneAndDelete({ _id: contactId, owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      })
    }
  } catch (error) {
    return { error }
  }
}

const updateContact = async (contactId, body, userId) => {
  try {
    return {
      data: await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, { new: true }).populate({
        path: 'owner',
        select: 'email -_id',
      })
    }
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
