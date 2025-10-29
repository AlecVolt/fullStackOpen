import { gql } from '@apollo/client'

export const ALL_PERSONS = gql`
  query AllPersons($number: YesNo) {
    allPersons(number: $number) {
      name
      number
      address {
        street
        city
      }
      id
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      number
      id
      address {
        city
        street
      }
    }
  }
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $number: String) {
    addPerson(name: $name, street: $street, city: $city, number: $number) {
      name
      number
      id
      address {
        street
        city
      }
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $number: String!) {
    editNumber(name: $name, number: $number) {
      name
      number
      address {
        street
        city
      }
      id
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
