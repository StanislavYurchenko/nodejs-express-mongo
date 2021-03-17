const contacts = [
  {
    name: "Pitter Pen 1",
    email: "piter_pen1@mail.com",
    _id: "60469b1f318c1b3c906f9ffc",
    phone: "12345678",
    subscription: "pro",
    password: "$2a$08$XQ7rSQAXqPd0EAncoYcx8.P.Rps6CWdbq62Prx4CAA07oS8eIWI0u",
    owner: {
        "email": "user04@mail.com"
    },
    createdAt: "2021-03-08T21:46:56.053Z",
    updatedAt: "2021-03-08T21:46:56.053Z",
  },
  {
    name: "Pitter Pen 2",
    email: "piter_pen2@mail.com",
    _id: "60469b1f318c1b3c906f9ffd",
    phone: "12345678",
    subscription: "pro",
    password: "$2a$08$dQ4esm6yKRsQgTY6Tr16puzpO5V47n.UyVqP6bTyFwlO.jrDK2XsK",
    owner: {
        "email": "user04@mail.com",
    },
    createdAt: "2021-03-08T21:46:56.053Z",
    updatedAt: "2021-03-08T21:46:56.053Z",
  }
]

const newContact = {
  name: "test Name",
  email: "name@mail.com",
  phone: "099 999 99 99",
  password: "password",
}

const User = {  
  email: "user-for-test@mail.com",
  _id: "60513a347039433f64247983",
  subscription: "free",
  password: "$2a$08$AjeiHz7oWxEj9Aq2Knd/lOGeurWsAoy/90aoCVZ5yjswULBdB3mmm",
  avatar: "60513a347039433f64247983\\1615936257158-testpng.png",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxM2EzNDcwMzk0MzNmNjQyNDc5ODMiLCJpYXQiOjE2MTU5MzYxOTgsImV4cCI6MTYxNjgwMDE5OH0.ecgaQDZzc_ngZTcaqqAw9B8uAqvyjgQ1qQ8gWsjwRpQ"
}

const users = []

users[0] = User

const newUser = { email: 'test-user@test.com', password: '12345678' }

module.exports = { contacts, newContact, User, users, newUser }