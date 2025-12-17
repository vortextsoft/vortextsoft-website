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
        const {
            title, subtitle, clientName, clientType, category,
            description, problemStatement, solution, results, features,
            heroImage, heroVideo
        } = req.body;

        const id = uuidv4();

        const query = `
            INSERT INTO case_studies (
                id, title, subtitle, client_name, client_type, category, 
                description, problem_statement, solution, results, features, 
                hero_image, hero_video
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;
        const values = [
            id, title, subtitle, clientName, clientType, category,
            description, problemStatement, solution, results, features,
            heroImage, heroVideo
        ];

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
        const {
            title, subtitle, clientName, clientType, category,
            description, problemStatement, solution, results, features,
            heroImage, heroVideo
        } = req.body;

        const query = `
            UPDATE case_studies 
            SET title = $1, subtitle = $2, client_name = $3, client_type = $4, category = $5,
                description = $6, problem_statement = $7, solution = $8, results = $9, features = $10,
                hero_image = $11, hero_video = $12
            WHERE id = $13
            RETURNING *
        `;
        const values = [
            title, subtitle, clientName, clientType, category,
            description, problemStatement, solution, results, features,
            heroImage, heroVideo, req.params.id
        ];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to update item', details: error.message });
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
