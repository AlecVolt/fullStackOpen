const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let favorite = {}
  
  for (const blog of blogs) {
    if ( blog.likes > maxLikes) {
      maxLikes = blog.likes
      favorite = blog
    }
  }

  return favorite
}

const mostBlogs  = (blogs) => {
  let authors = {}

  for (const blog of blogs) {
    // authors = {...authors, [blog.author] : blog.author += 1 || 1}
    // authors = [...authors, { name: blog.author, blogsNum: 1 }]
    authors[blog.author] = authors[blog.author] + 1 || 1
  }

  let authorMostBlogs = {}
  let maxBlogs = 0

  for (const author of Object.keys(authors)) {
    if ( authors[author] > maxBlogs ) {
      authorMostBlogs.author = author
      authorMostBlogs.blogs = authors[author]
      maxBlogs = authors[author]
    }
  }

  return authorMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs 
}