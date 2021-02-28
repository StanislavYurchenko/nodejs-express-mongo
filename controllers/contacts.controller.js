const contactsModel = require('../model/contacts')

const createResponse = (res, data, error) => {
  // eslint-disable-next-line no-mixed-operators
  const code = error && error.code || !data && 404 || data && 200
  const status = data ? 'success' : 'invalid'

  return res
    .status(code)
    .json({ status, code, data: (data || error) })
}

const getContacts = async (_req, res) => {
  const { data, error } = await contactsModel.listContacts()

  createResponse(res, data, error)
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const { data, error } = await contactsModel.getContactById(contactId)

  createResponse(res, data, error)
}

const addContact = async (req, res) => {
  const { body } = req
  const { data, error } = await contactsModel.addContact(body)

  createResponse(res, data, error)
}

const removeContactById = async (req, res) => {
  const { contactId } = req.params
  const { data, error } = await contactsModel.removeContact(contactId)

  createResponse(res, data, error)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const { body } = req
  const { data, error } = await contactsModel.updateContact(contactId, body)

  createResponse(res, data, error)
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
}
