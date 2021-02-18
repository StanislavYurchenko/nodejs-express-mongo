const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(contact => contact.id === contactId)
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contactForDelete = getContactById(contactId)
    if (!contactForDelete) return
    const contacts = await listContacts()
    const newContacts = contacts.filter(contact => {
      return contact.id !== contactId
    })
    const stringifiedNewContacts = JSON.stringify(newContacts, null, 2)

    await fs.writeFile(contactsPath, stringifiedNewContacts, 'utf8')
    return contactForDelete
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = { id: uuidv4(), ...body }
    const newContacts = [...contacts, newContact]
    const stringifiedNewContacts = JSON.stringify(newContacts, null, 2)

    await fs.writeFile(contactsPath, stringifiedNewContacts, 'utf8')
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index === -1) return
    contacts[index] = { ...contacts[index], ...body }

    const stringifiedNewContacts = JSON.stringify(contacts, null, 2)

    await fs.writeFile(contactsPath, stringifiedNewContacts, 'utf8')
    return contacts[index]
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
