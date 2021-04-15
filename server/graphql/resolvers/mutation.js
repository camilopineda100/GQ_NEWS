const { User } = require('../../models/user') 
const { AuthenticationError } = require('apollo-server-express')

module.exports = {
    Mutation: {
        authUser: async (parent, args, context, info) => {
            try {
                const user = await User.findOne({ email: args.fields.email })
                if(!user) { throw new AuthenticationError("Wrong email") }

                const checkpass = await user.comparePassword(args.fields.password)
                if(!checkpass) { throw new AuthenticationError("Wrong password") }

                const getToken = await user.generateToken()
                if(!getToken) {
                    throw new AuthenticationError("Something went wrong, try again")
                }

                return {
                    _id: user.id,
                    email: user.email,
                    token: getToken.token
                }
            } catch(err) {
                throw err
            }
        },
        signUp: async (parent, args, context, info) => {
            try {
                const user = new User({
                    email: args.fields.email,
                    password: args.fields.password
                })
                
                const getToken = await user.generateToken()
                if(!getToken) {
                    throw new AuthenticationError("Something went wrong, try again")
                }

                return { ...getToken._doc }
            } catch(err) {
                if(err.code === 11000) {
                    throw new AuthenticationError("Sorry the email is duplicated, try a new one")
                }
            }
        }
    }
}