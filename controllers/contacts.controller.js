const contactsModel = require('../model/contacts')
const { createResponse } = require('../utils/createResponse')

const getContacts = async (req, res) => {
  const userId = req.user._id
  const { data, error } = await contactsModel.listContacts(userId)
  return createResponse(res, data, error)
}

const getContactById = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  const { data, error } = await contactsModel.getContactById(id, userId)

  return createResponse(res, data, error)
}

const addContact = async (req, res) => {
  const userId = req.user._id
  const { body } = req
  const { data, error } = await contactsModel.addContact(body, userId)

  return createResponse(res, data, error)
}

const removeContactById = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  const { data, error } = await contactsModel.removeContact(id, userId)

  return createResponse(res, data, error)
}

const updateContactById = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  const { body } = req
  const { data, error } = await contactsModel.updateContact(id, body, userId)

  return createResponse(res, data, error)
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
}
