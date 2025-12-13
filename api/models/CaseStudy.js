const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    client: String,
    description: String,
    imageUrl: String,
    tags: [String],
    results: [String],
    link: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
