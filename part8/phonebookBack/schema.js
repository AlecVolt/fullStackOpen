const typeDefs = `
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String!
  }
  
  type Person {
    name: String!
    number: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(number: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    createUser(
      username: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token

    addAsFriend(
      name: String!
    ) : User
    
    addPerson(
      name: String!
      number: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      number: String!
    ): Person
  }

  type Subscription {
    personAdded: Person!
  }    
`

module.exports = typeDefs
