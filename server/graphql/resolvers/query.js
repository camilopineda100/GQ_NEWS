const { AuthenticationError } = require('apollo-server-express')
const authorize = require("../../utils/auth")
const { User } = require("../../models/user")
const { Category } = require("../../models/category")

module.exports = {
    Query: {
        user: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)
                const user = await User.findOne({ _id: args.id })

                if(req._id.toString() !== user._id.toString()) {
                    throw new AuthenticationError("You don't own this user")
                }

                return user
            } catch(err) {
                throw err
            }
        },
        isAuth: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req, true)
                if(!req._id) {
                    throw new AuthenticationError("Bad token")
                }
                
                return { 
                    _id: req._id,
                    email: req.email,
                    token: req.token
                }
            } catch(err) {
                throw err
            }
        },
        categories:  async (parent, args, context, info) => {
            try {
                authorize(context.req)
                const categoryQuery = {}
                if(args.catId) {
                    categoryQuery._id = args.catId
                }

                const categories = await Category.find(categoryQuery)
                return categories
            } catch (err) {
                throw err
            }
        },
    }
}