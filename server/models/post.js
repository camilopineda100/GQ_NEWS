const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        maxLength: 100
    },
    excerpt: {
        required: true,
        type: String,
        maxLength: 1000
    },
    content: {
        required: true,
        type: String,
        maxLength: 10000
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: String,
        enums: ['DRAFT', 'PUBLIC']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })

const Post = mongoose.model('Post', postSchema)

module.exports = { Post }