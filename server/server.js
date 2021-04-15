const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// graphQL
const typeDefs = require('./graphql/schema')
const { Query } = require('./graphql/resolvers/query')
const { Mutation } = require('./graphql/resolvers/mutation')

const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: ({ req }) => {
        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc4NDlkODJmYTg3ZTU0YjAwYzhlNTEiLCJlbWFpbCI6ImVtYWlsMUBlbWFpbC5jb20iLCJpYXQiOjE2MTg0OTU5NjAsImV4cCI6MTYxOTEwMDc2MH0._0EHIIPeJjZR7O3aewlLwvXEiJZmlnJELrstlH8McJg'
        return { req }
    }
})

server.applyMiddleware({ app })
const PORT = process.env.PORT || 5000

mongoose.connect(`mongodb+srv://graphqluser:testing123@cluster0.mvizr.mongodb.net/GQ_NEWS?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Sever started on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
})

