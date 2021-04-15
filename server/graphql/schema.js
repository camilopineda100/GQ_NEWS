const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        user(id: ID): User!
        isAuth: User!
    }

    type Mutation {
        updateUserEmailPass(email: String!, password: String!, _id: ID): User!
        updateUserProfile(_id: ID!, name: String, lastname: String ): User!
        authUser(fields: AuthInput!): User!
        signUp(fields: AuthInput!): User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        name: String
        lastname: String
        token: String
    }

    input AuthInput {
        email: String!
        password: String!
    }
`

module.exports = typeDefs