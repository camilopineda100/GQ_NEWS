const jwt = require('jsonwebtoken')
require('dotenv').config()
const { AuthenticationError } = require('apollo-server-express')

const throwAuthError = () => {
    throw new AuthenticationError('Your are not auth')
}

const authorize = (req, verify = false) => {
    const authHeader = req.headers.authorization
    if(!authHeader) { 
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }

    const token = authHeader.replace("Bearer ", "")
    if(!token || token === "") {
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }

    let decodedJWT
    try {
        decodedJWT = jwt.verify(token, process.env.SECRET)
        if(!decodedJWT) {
            req.isAuth = false
            return !verify ? throwAuthError() : req
        }

        req.isAuth = true
        req._id = decodedJWT._id
        req.email = decodedJWT.email
        req.token = token
        return req
    } catch(err) {
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }
}

module.exports = authorize