const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

// const getTockenFrom = (request) => {
//   const authorization = request.get('authorization')

//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }

//   return null 
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1})

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  // const blog = new Blog(request.body)

  // const decodedTocken = jwt.verify(getTockenFrom(request), process.env.SECRET)
  // const decodedTocken = jwt.verify(request.token, process.env.SECRET)

  // if (!decodedTocken.id) {
  //   return response
  //     .status(401)
  //     .json({ error: 'token invalid' })
  // }

  // const user = await User.findById(decodedTocken.id)
  
  // const user = await User.findById(body.userId)

  // if (!user) {
  //   return response
  //     .status(400)
  //     .json({ error: 'userId missing or not valid' })
  // }

  const user = request.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response
    .status(201)
    .json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await (await blog.save()).populate('user', { username: 1, name: 1 })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  // const decodedTocken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedTocken.id) {
  //   return response
  //     .status(401)
  //     .json({ error: 'token invalid' })
  // }

  // const user = await User.findById(decodedTocken.id)
  // if (!user) {
  //   return response
  //     .status(400)
  //     .json({ error: 'userId missing or not valid' })
  // }

  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response
      .status(404)
      .json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'only the creator can delete a blog' })
  }

  // if (blog.user !== user) {
  //   return response
  //     .status(401)
  //     .json({ error: 'only the creator can delete a blog' })
  // }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter