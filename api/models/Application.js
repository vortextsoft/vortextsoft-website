const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    jobTitle: String, // Snapshot in case job is deleted
    applicantName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    resumeUrl: String,
    coverLetter: String,
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'rejected', 'hired'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
