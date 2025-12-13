const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String, // Matched db.json (was logoUrl)
    websiteUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Partner', partnerSchema);
