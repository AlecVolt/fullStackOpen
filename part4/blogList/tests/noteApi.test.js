const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/testHelper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // for (const blog of helper.initialBlogs) {
    //   let blogObject = new Blog(blog)
    //   await blogObject.save()
    // }

    // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray) 
  })

  describe('GET request tests', () => {
    test('blogs are returned as json and all blogs are returned', async () => {
      const resultBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(resultBlogs.body.length, helper.initialBlogs.length)
    })

    // test('all blogs are returned', async () => {
    //   const response = await api.get('/api/blogs')

    //   assert.strictEqual(response.body.length, helper.initialBlogs.length)
    // })

    test('a specific title is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const titles = response.body.map(e => e.title)

      assert(titles.includes('Go To Statement Considered Harmful'))
    })

    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })
  })

  describe('POST request tests', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        author: "Jack Williams",
        title: "async/await simplifies making async calls",
        url: "http://blog.cleancoder.com/new-here/2017/05/05/TestDefinitions.htmll",
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)

      assert(titles.includes('async/await simplifies making async calls'))
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: "Jack Williams",
        url: "http://blog.cleancoder.com/here/2017/05/05/TestDefinitions.htmll",
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('DELETE request tests', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(e => e.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})