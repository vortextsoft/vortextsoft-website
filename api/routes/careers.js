const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Item not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedJob) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
