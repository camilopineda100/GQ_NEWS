const jwt = require('jsonwebtoken')
require('dotenv').config()
const { AuthenticationError } = require('apollo-server-express')

const authorize = (req) => {
    const authHeader = req.headers.authorization
    if(!authHeader) { 
        req.isAuth = false
        throw new AuthenticationError('Your are not auth')
    }

    const token = authHeader.replace("Bearer ", "")
    if(!token || token === "") {
        req.isAuth = false
        throw new AuthenticationError('Your are not auth')
    }

    let decodedJWT
    try {
        decodedJWT = jwt.verify(token, process.env.SECRET)
        if(!decodedJWT) {
            req.isAuth = false
            throw new AuthenticationError('Wrong token')
        }

        req.isAuth = true
        req._id = decodedJWT._id
        req.email = decodedJWT.email
    } catch(err) {
        req.isAuth = false
        throw new AuthenticationError('Error when authenticating')
    }

    return req
}

module.exports = authorize