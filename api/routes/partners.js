const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM partners ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { name, logo, website } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO partners(id, name, logo, website)
VALUES($1, $2, $3, $4)
RETURNING *
    `;
        const values = [id, name, logo, website];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item', details: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM partners WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
