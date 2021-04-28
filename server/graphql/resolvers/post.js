const { Category } = require("../../models/category")
const { User } = require("../../models/user")
const { Post } = require("../../models/post")
const { sortArgsHelper } = require("../../utils/tools")

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
        related: async (parent, { sort }, context, info) => {
            try {
                let sortArgs = sortArgsHelper(sort)
                const posts = await Post
                .find({"category": parent.category})
                .sort([[sortArgs.sortBy, sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit)

                return posts
            } catch (err) {
                throw err
            }
        }
    }
}