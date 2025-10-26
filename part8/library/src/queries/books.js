import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      title
      published
    }
  }
`
