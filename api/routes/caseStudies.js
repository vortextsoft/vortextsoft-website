const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM case_studies ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// GET one
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM case_studies WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { title, client, description, image, video, category, results } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO case_studies (id, title, client, description, image, video, category, results)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [id, title, client, description, image, video, category, results];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { title, client, description, image, video, category, results } = req.body;

        const query = `
            UPDATE case_studies 
            SET title = $1, client = $2, description = $3, image = $4, video = $5, category = $6, results = $7
            WHERE id = $8
            RETURNING *
        `;
        const values = [title, client, description, image, video, category, results, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM case_studies WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
