const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/testHelper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('blog API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  describe('GET request tests', () => {
    test('blogs are returned as json and all blogs are returned', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
      const resultBlogs = await api.get('/api/blogs')

      let ids = 0

      for (const blog of resultBlogs.body) {
        if (Object.keys(blog).find(k => k === 'id')) {
          ids++
        }
      }

      assert.strictEqual(ids, helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is not named _id', async () => {
      const resultBlogs = await api.get('/api/blogs')

      let ids = 0

      for (const blog of resultBlogs.body) {
        if (Object.keys(blog).find(k => k === '_id')) {
          ids++
        }
      }

      assert.strictEqual(ids, 0)
    })

    test('a specific title is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const titles = response.body.map(e => e.title)

      assert(titles.includes('some new user title'))
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
    test('a valid blog can be added and the content saved correctly', async () => {
      const newBlog = {
        author: "Jack Williams",
        title: "async/await simplifies making async calls",
        url: "http://blog.cleancoder.com/new-here/2017/05/05/TestDefinitions.htmll",
        likes: 5,
        user: { 
          username: 'cris', 
          name: 'Cris P', 
          id: '68e3d520c11765176e3ead91' 
        } 
      }

      const user = {
        username: "cris",
        password: "mypassword"
      }

      const userTokenResult = await api
        .post('/api/login')
        .send(user)
      
      const userToken = userTokenResult.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const savedBlog = blogsAtEnd.find(e => e.title === newBlog.title)
      
      const {id, ...savedBlogContent} = savedBlog || {}

      assert.deepStrictEqual(savedBlogContent, newBlog)
    })

    test('additing fails with status code 401 if token is not provided', async () => {
      const newBlog = {
        author: "Jack Williams",
        title: "async/await simplifies making async calls",
        url: "http://blog.cleancoder.com/new-here/2017/05/05/TestDefinitions.htmll",
        likes: 5,
        user: { 
          username: 'cris', 
          name: 'Cris P', 
          id: '68e3d520c11765176e3ead91' 
        } 
      }

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
      
      assert(result.body.error.includes('token missing or invalid'))

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    describe('missing property tests', () => {
      test('blog without likes can be added and the amount of likes is 0', async () => {
        const newBlog = {
          author: "Jack Williams",
          title: "async/await simplifies making async calls",
          url: "http://blog.cleancoder.com/new-here/2017/05/05/TestDefinitions.htmll",
        }

        const user = {
          username: "cris",
          password: "mypassword"
        }

        const userTokenResult = await api
          .post('/api/login')
          .send(user)

        const userToken = userTokenResult.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const savedBlog = blogsAtEnd.find(e => e.title === newBlog.title)
        const { likes: savedLikes } = savedBlog

        assert.strictEqual(savedLikes, 0)
      })

      test('blog without title is not added', async () => {
        const newBlog = {
          author: "Jack Williams",
          url: "http://blog.cleancoder.com/here/2017/05/05/TestDefinitions.htmll",
          likes: 5,
        }

        const user = {
          username: "cris",
          password: "mypassword"
        }

        const userTokenResult = await api
          .post('/api/login')
          .send(user)

        const userToken = userTokenResult.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      })

      test('blog without url is not added', async ()  => {
        const newBlog = {
          author: "Jack Williams",
          title: "Last man on the Earth",
          likes: 15,
        }

        const user = {
          username: "cris",
          password: "mypassword"
        }
      
        const userTokenResult = await api
          .post('/api/login')
          .send(user)
        
        const userToken = userTokenResult.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      })

      test('blog without title and url is not added', async () => {
        const newBlog = {
          author: "Jack Adams",
          likes: 100
        }

        const user = {
          username: "cris",
          password: "mypassword"
        }
      
        const userTokenResult = await api
          .post('/api/login')
          .send(user)
        
        const userToken = userTokenResult.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      })

      test('blog without author can be added', async () => {
        const newBlog = {
          title: "Last man on the Earth",
          url: "http://blog.cleancoder.com/here/2017/05/05/TestDefinitions.htmll",
          likes: 51,
        }

        const user = {
          username: "cris",
          password: "mypassword"
        }
      
        const userTokenResult = await api
          .post('/api/login')
          .send(user)
        
        const userToken = userTokenResult.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${userToken}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      })
    })
  })

  // describe('PUT request tests', () => {
  //   test('a blog can be updated', async () => {
  //     const blogsAtStart = await helper.blogsInDb()
  //     const blogToUpdate = blogsAtStart[0]

  //     const newUpdateBlog = {
  //       title: "React patterns",
  //       author: "Michael Chan",
  //       url: "https://reactpatterns.com/",
  //       likes: 27,
  //       user: "68e2978db3561ddcbd68ab9b"
  //     }

  //     await api
  //       .put(`/api/blogs/${blogToUpdate.id}`)
  //       .send(newUpdateBlog)
  //       .expect(200)
      
  //     const blogsAtEnd = await helper.blogsInDb()
  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  //     assert.strictEqual(newUpdateBlog.likes, blogsAtEnd[0].likes)
  //     assert.notStrictEqual(blogsAtStart[0].likes, blogsAtEnd[0].likes)
  //   })
  // })

  describe('DELETE request tests', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      // await api
      //   .delete(`/api/blogs/${blogToDelete.id}`)
      //   .expect(204)

      const user = {
        username: "cris",
        password: "mypassword"
      }

      const userTokenResult = await api
        .post('/api/login')
        .send(user)
      
      const userToken = userTokenResult.body.token

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(e => e.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1) 
    })

    test('deletion fails with status code 401 if token is not provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      assert(result.body.error.includes('token missing or invalid'))
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})