require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  "title": "some new titel",
  "author": "some author",
  "url": "some new url",
  "likes": 3
})

blog.save().then(() => {
  console.log('blog saved')
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'JS is not so difficult',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })