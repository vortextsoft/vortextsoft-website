const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Full-time'
    },
    location: String,
    description: String,
    responsibilities: String, // db.json has this as a long string with newlines, not array
    requirements: String,     // db.json has this as a long string with newlines
    isOpen: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
