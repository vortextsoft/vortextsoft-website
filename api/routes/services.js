const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

// GET all services
router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        const services = db.services || [];
        // Sort by display order (if exists) or creation?
        // services.sort((a, b) => a.order - b.order);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const service = db.services.find(s => s.id === req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

// POST (Create) service - Admin only (TODO: Auth middleware)
router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        const newService = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        db.services.push(newService);
        await writeDb(db);
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// PUT (Update) service
router.put('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const index = db.services.findIndex(s => s.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Service not found' });

        db.services[index] = { ...db.services[index], ...req.body };
        await writeDb(db);
        res.json(db.services[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const newServices = db.services.filter(s => s.id !== req.params.id);
        if (newServices.length === db.services.length) {
            return res.status(404).json({ error: 'Service not found' });
        }
        db.services = newServices;
        await writeDb(db);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

module.exports = router;
