const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    excerpt: String,
    tags: String, // Matched db.json (single string)
    link: String, // Matched db.json (external link)
    imageUrl: String,
    isVisible: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
