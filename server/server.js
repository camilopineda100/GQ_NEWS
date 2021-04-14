const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// graphQL
const typeDefs = require('./graphql/schema')
const { Query } = require('./graphql/resolvers/query')

const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query
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

