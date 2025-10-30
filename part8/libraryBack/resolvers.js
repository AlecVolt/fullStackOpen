const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      if (!args.genre) {
        return (await Book.find({}).populate('author')).filter((b) => b.author.name === args.author)
      }

      if (!args.author) {
        return await Book.find({ genres: args.genre }).populate('author')
      }

      return (await Book.find({ genres: args.genre }).populate('author')).filter((b) => b.author.name === args.author)
    },
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      // return Book.find({}).populate('author')

      return Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let newBookAuthor = await Author.findOne({ name: args.author })

      if (!newBookAuthor) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
          newBookAuthor = newAuthor
        } catch (error) {
          throw new GraphQLError(`Saving author failed.`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: newBookAuthor._id })

      // console.log(newBookAuthor)

      try {
        await book.save()
        newBookAuthor.books = newBookAuthor.books.concat(book._id)
        await newBookAuthor.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed.`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = Number(args.setBornTo)

      try {
        author.save()
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }

      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      }

      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },

  // Author: {
  //   bookCount: async (root) => {
  //     const booksWritten = await Book.find({ author: root.id })
  //     return booksWritten.length
  //   },
  // },
}

module.exports = resolvers
