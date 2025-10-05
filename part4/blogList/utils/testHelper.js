const Blog = require('../models/blog')
const User = require('../models/user')

// const initialBlogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0
//   }  
// ]


[
  {
    "_id": "68e14397ec0d7ff27fc194ae",
    "title": "some title",
    "author": "some author",
    "url": "some url",
    "likes": 10,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e2943934d85fe4f7ae749c",
    "title": "some new user title",
    "author": "some author",
    "url": "some new user url",
    "likes": 22,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e2943934d85fe4f7ae749e",
    "title": "some new user title",
    "author": "some author",
    "url": "some new user url",
    "likes": 22,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e2944434d85fe4f7ae74a2",
    "title": "some new user title",
    "author": "some author",
    "url": "some new user url",
    "likes": 22,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e2945b34d85fe4f7ae74a5",
    "title": "some new user title",
    "author": "some author",
    "url": "some new user url",
    "likes": 22,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e294d934d85fe4f7ae74aa",
    "title": "some new user title",
    "author": "some author",
    "url": "some new user url",
    "likes": 22,
    "user": "68e13eb6eec9c3ed8ef31cfb",
    "__v": 0
  },
  {
    "_id": "68e2a8366b6906d8158e98f0",
    "title": "cool new title",
    "author": "cool author",
    "url": "some cool url",
    "likes": 10,
    "user": "68e2978db3561ddcbd68ab9b",
    "__v": 0
  },
  {
    "_id": "68e2a85a6b6906d8158e98f6",
    "title": "lala new title",
    "author": "lala author",
    "url": "lala cool url",
    "likes": 1,
    "user": "68e297c7b3561ddcbd68ab9f",
    "__v": 0
  },
  {
    "_id": "68e2a8696b6906d8158e98fa",
    "title": "new title",
    "author": "author",
    "url": "cool url",
    "likes": 11,
    "user": "68e297c7b3561ddcbd68ab9f",
    "__v": 0
  },
  {
    "_id": "68e2a8836b6906d8158e9900",
    "title": "new title",
    "author": "author",
    "url": "cool url",
    "likes": 11,
    "user": "68e29ae2542838e73dea780b",
    "__v": 0
  },
  {
    "_id": "68e2a8986b6906d8158e9904",
    "title": "new title from rest client",
    "author": "author name",
    "url": "cool url from client",
    "likes": 18,
    "user": "68e29ae2542838e73dea780b",
    "__v": 0
  },
  {
    "_id": "68e2a8b76b6906d8158e9908",
    "title": "new title client",
    "author": "new author",
    "url": "url client",
    "likes": 180,
    "user": "68e29ae2542838e73dea780b",
    "__v": 0
  }
]

const initialUsers = [
  {
    "_id": "68e13eb6eec9c3ed8ef31cfb",
    "username": "cris",
    "name": "Poshel na",
    "passwordHash": "$2b$10$.I3pm1vZatwy0c24ewoBoeLCPnDV3DAOncZ5KaLkGZqr5N3vTp9L.",
    "blogs": [
      "68e14369ec0d7ff27fc194aa",
      "68e14397ec0d7ff27fc194ae",
      "68e2943934d85fe4f7ae749c",
      "68e2944434d85fe4f7ae74a2",
      "68e2945b34d85fe4f7ae74a5",
      "68e294d934d85fe4f7ae74aa"
    ],
    "__v": 6
  },
  {
    "_id": "68e2978db3561ddcbd68ab9b",
    "username": "hellas",
    "name": "Arto Hellas",
    "passwordHash": "$2b$10$X.wVxX8cDzfQfbVk/uiV/OQeDMEGIrjiOUQNyEZMBdYFnjeVj6xca",
    "blogs": [],
    "__v": 0
  },
  {
    "_id": "68e297c7b3561ddcbd68ab9f",
    "username": "creatorPower",
    "name": "Creator Power",
    "passwordHash": "$2b$10$ggeHE1JW36sMKZaI52ob4Oc2NioZAD7i9c/usfwabCmM6PPeRY/RC",
    "blogs": [],
    "__v": 0
  },
  {
    "_id": "68e29ae2542838e73dea780b",
    "username": "mark",
    "name": "Mark Jackson",
    "passwordHash": "$2b$10$WJLLE7URxPBp7Uef4mvk8eH/QgZjeHNjYoftmdtqFWVMy2kL6vMxS",
    "blogs": [],
    "__v": 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Non existing book'
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb
}