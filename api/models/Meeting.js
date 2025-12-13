const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    topic: String,
    reason: String,
    date: {
        type: String, // Keeping as string YYYY-MM-DD to match
        required: true
    },
    time: {
        type: String, // HH:mm
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);
