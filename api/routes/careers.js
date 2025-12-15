const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all
router.get('/', async (req, res) => {
    try {
        // Frontend expects "isOpen"
        const result = await db.query('SELECT * FROM careers WHERE "isOpen" = true ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// GET one
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM careers WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { title, type, location, description, responsibilities, requirements } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO careers(id, title, type, location, description, responsibilities, requirements, "isOpen")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [id, title, type, location, description, responsibilities, requirements, true];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item', details: error.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { title, type, location, description, responsibilities, requirements, isOpen } = req.body;

        const query = `
            UPDATE careers 
            SET title = $1, type = $2, location = $3, description = $4, responsibilities = $5, requirements = $6, "isOpen" = $7
            WHERE id = $8
            RETURNING *
        `;
        const values = [title, type, location, description, responsibilities, requirements, isOpen !== undefined ? isOpen : true, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item', details: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM careers WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
