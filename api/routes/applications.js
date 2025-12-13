const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.get('/', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update status
router.put('/:id', async (req, res) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedApplication) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
