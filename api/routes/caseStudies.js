const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');

// GET all
router.get('/', async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find().sort({ createdAt: -1 });
        res.json(caseStudies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// GET one
router.get('/:id', async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findById(req.params.id);
        if (!caseStudy) return res.status(404).json({ error: 'Item not found' });
        res.json(caseStudy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const newCaseStudy = new CaseStudy(req.body);
        const savedCaseStudy = await newCaseStudy.save();
        res.status(201).json(savedCaseStudy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCaseStudy) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedCaseStudy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedCaseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
        if (!deletedCaseStudy) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
