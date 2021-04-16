const { Category } = require("../../models/category")
const { User } = require("../../models/user")

module.exports = {
    Post: {
        author: async (parent, args, context, info) => {
            try {
                const userId = parent.author
                const user = await User.findOne({ _id: userId })
                return { 
                    ...user._doc,
                    password: null
                }
            } catch (err) {
                throw err
            }
        },
        category: async (parent, args, context, info) => {
            try {
                const categoryId = parent.category
                const category = await Category.findOne({ _id: categoryId })
                return category
            } catch (err) {
                throw err
            }
        },
    }
}