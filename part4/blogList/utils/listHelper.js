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
  let favorite
  
  for (const blog of blogs) {
    if ( blog.likes > maxLikes) {
      maxLikes = blog.likes
      favorite = blog
    }
  }

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog 
}