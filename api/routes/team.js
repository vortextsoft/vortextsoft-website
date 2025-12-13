const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ error: 'Item not found' });
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMember = new TeamMember(req.body);
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMember = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMember) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
