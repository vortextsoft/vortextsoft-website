const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// GET all partners
router.get('/', async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch partners' });
    }
});

// POST (Create) partner
router.post('/', async (req, res) => {
    try {
        const newPartner = new Partner({
            name: req.body.name,
            logo: req.body.logo,
            websiteUrl: req.body.websiteUrl
        });
        const savedPartner = await newPartner.save();
        res.status(201).json(savedPartner);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create partner' });
    }
});

// DELETE partner
router.delete('/:id', async (req, res) => {
    try {
        const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) return res.status(404).json({ error: 'Partner not found' });
        res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete partner' });
    }
});

module.exports = router;
