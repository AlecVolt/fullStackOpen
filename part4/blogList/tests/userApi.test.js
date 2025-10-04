const bcrypt = require('bcrypt')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/testHelper')
const User = require('../models/user')

const api = supertest(app)

describe('user API tests', () => {
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: "cris",
        name: "Cristian Richardson",
        password: "asdfghjkl",
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)

      const usernames = usersAtEnd.map(user => user.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: "root",
        name: "Ricky Martin",
        password: "minmi",
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)

      assert(result.body.error.includes('expected `username` to be unique'))
    })
  })

  // describe('GET request tests', () => {

  // })

  // describe('POST request tests', () => {
    
  // })

  after(async () => {
    await mongoose.connection.close()
  })
})

