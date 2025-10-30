import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    number
    address {
      street
      city
    }
    id
  }
`

export const ALL_PERSONS = gql`
  query AllPersons($number: YesNo) {
    allPersons(number: $number) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $number: String) {
    addPerson(name: $name, street: $street, city: $city, number: $number) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $number: String!) {
    editNumber(name: $name, number: $number) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`
