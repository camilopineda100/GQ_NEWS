const { User } = require("../../models/user")
const { AuthenticationError } = require('apollo-server-express')
const authorize = require("../../utils/auth")

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
        }
    }
}