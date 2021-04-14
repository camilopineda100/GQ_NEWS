const { User } = require('../../models/user') 

module.exports = {
    Mutation: {
        authUser: async (parent, args, context, info) => {
            return true
        },
        signUp: async (parent, args, context, info) => {
            try {
                const user = new User({
                    email: args.fields.email,
                    password: args.fields.password
                })
                
                const result = await user.save()

                return { ...result._doc }
            } catch(err) {

            }
            return true
        }
    }
}