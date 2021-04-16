const { User } = require('../../models/user') 
const { AuthenticationError, ApolloError } = require('apollo-server-express')
const authorize = require('../../utils/auth')
const { userOnwerShip } = require('../../utils/tools')
const { Post } = require('../../models/post')
const { Category } = require('../../models/category')

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
        },
        updateUserProfile: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)
                if(!userOnwerShip(req, args._id)) { throw new AuthenticationError("You don't own this user") }
                
                console.log('user id', args._id)

                // TODO: validate fields

                const user = await User.findOneAndUpdate(
                    { _id: args._id },
                    { 
                        $set: {
                            name: args.name,
                            lastname: args.lastname
                        }
                    },
                    { new: true }
                )

                return {...user._doc}
            } catch (err) {
                throw err
            }
        },
        updateUserEmailPass: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)
                if(!userOnwerShip(req, args._id)) { throw new AuthenticationError("You don't own this user") }

                const user = await User.findOne({ _id: req._id })
                if(!user) { throw new AuthenticationError("Sorry, try again") }

                if(args.email) { user.email = args.email }
                if(args.password) { user.password = args.password }

                const getToken = await user.generateToken()
                if(!getToken) {
                    throw new AuthenticationError("Something went wrong, try again")
                }

                // TODO: validate
                
                return { ...getToken._doc, token: getToken.token }
            } catch (err) {
                throw new ApolloError("Something went wrong, try again")
            }
        },
        createPost: async (parent, { fields }, context, info) => {
            try {
                const req = authorize(context.req)

                // TODO: post field validations
                const post = await new Post({
                    title: fields.title,
                    excerpt: fields.excerpt,
                    content: fields.content,
                    status: fields.status,
                    author: req._id,
                    category: fields.category
                })

                const result = await post.save()

                return { ...result._doc }

            } catch (err) {
                throw err
            }
        },
        createCategory: async (parent, { name }, context, info) => {
            try {
                const req = authorize(context.req)

                // TODO: category field validations
                const category = await new Category({
                    name,
                    author: req._id
                })

                const result = await category.save()

                return { ...result._doc }
            } catch (err) {
                throw err
            }
        },
    }
}