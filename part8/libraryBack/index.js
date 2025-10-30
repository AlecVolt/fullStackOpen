const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.set('debug', true)

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to', MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     _id: '6900eb6768c20cc3028b06ba',
//     born: 1952,
//     books: ['6900ec62fda6ef77f890aff7'],
//   },
//   {
//     name: 'Martin Fowler',
//     _id: '6900eb6768c20cc3028b06bb',
//     born: 1963,
//     books: ['6900ec62fda6ef77f890aff8'],
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     _id: '6900eb6768c20cc3028b06bc',
//     born: 1821,
//     books: ['6900ec62fda6ef77f890aff9'],
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     _id: '6900eb6768c20cc3028b06bd',
//     books: [],
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     _id: '6900eb6768c20cc3028b06bb',
//     books: [],
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     _id: '6900ec62fda6ef77f890aff7',
//     published: 2008,
//     author: '6900eb6768c20cc3028b06ba',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     _id: '6900ec62fda6ef77f890aff8',
//     published: 2002,
//     author: '6900eb6768c20cc3028b06ba',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     _id: '6900eb6768c20cc3028b06bb',
//     published: 2018,
//     author: '6900eb6768c20cc3028b06bb',
//     genres: ['refactoring'],
//   },
// ]

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()
