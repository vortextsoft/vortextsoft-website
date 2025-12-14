const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

const TABLE = 'applications';

router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db[TABLE] || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        const newItem = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        if (!db[TABLE]) db[TABLE] = [];
        db[TABLE].push(newItem);
        await writeDb(db);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update status
router.put('/:id', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];
        const index = db[TABLE].findIndex(s => s.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Item not found' });

        db[TABLE][index] = { ...db[TABLE][index], ...req.body };
        await writeDb(db);
        res.json(db[TABLE][index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];
        const newItems = db[TABLE].filter(s => s.id !== req.params.id);
        if (newItems.length === db[TABLE].length) {
            return res.status(404).json({ error: 'Item not found' });
        }
        db[TABLE] = newItems;
        await writeDb(db);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
