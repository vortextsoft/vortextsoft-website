const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

// GET all partners
router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        const partners = db.partners || [];
        res.json(partners);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch partners' });
    }
});

// POST (Create) partner
router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        // Ensure partners array exists
        if (!db.partners) db.partners = [];

        const newPartner = {
            id: uuidv4(),
            name: req.body.name,
            logo: req.body.logo, // URL or base64
            createdAt: new Date().toISOString()
        };

        db.partners.push(newPartner);
        await writeDb(db);
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create partner' });
    }
});

// DELETE partner
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();
        if (!db.partners) db.partners = [];

        const newPartners = db.partners.filter(p => p.id !== req.params.id);

        if (newPartners.length === db.partners.length) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        db.partners = newPartners;
        await writeDb(db);
        res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete partner' });
    }
});

module.exports = router;
