const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: String,
    shortDescription: String, // Matched with db.json
    profileImage: String,     // Matched with db.json
    linkedin: String,
    github: String,
    twitter: String,
    email: String,
    order: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
