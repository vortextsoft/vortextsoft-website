const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all services
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM services ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM services WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

// POST (Create) service
router.post('/', async (req, res) => {
    try {
        const { title, subtitle, description, icon, image, features, technologies } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO services (id, title, subtitle, description, icon, image, features, technologies)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [id, title, subtitle, description, icon, image, features, technologies];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// PUT (Update) service
router.put('/:id', async (req, res) => {
    try {
        const { title, subtitle, description, icon, image, features, technologies } = req.body;

        const query = `
            UPDATE services 
            SET title = $1, subtitle = $2, description = $3, icon = $4, image = $5, features = $6, technologies = $7
            WHERE id = $8
            RETURNING *
        `;
        const values = [title, subtitle, description, icon, image, features, technologies, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM services WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

module.exports = router;
