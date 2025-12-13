const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Create new message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
});

// Delete message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

// Mark message as replied
router.patch('/:id/replied', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        message.replied = true;
        message.repliedAt = new Date();
        await message.save();

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
});

module.exports = router;
