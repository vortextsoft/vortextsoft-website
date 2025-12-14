const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM team ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM team WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, role, email, shortDescription, profileImage, linkedin, github } = req.body;
        const id = uuidv4();

        // Using quoted identifiers for camelCase columns in Postgres
        const query = `
            INSERT INTO team (id, name, role, email, "shortDescription", "profileImage", linkedin, github)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [id, name, role, email, shortDescription, profileImage, linkedin, github];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, role, email, shortDescription, profileImage, linkedin, github } = req.body;

        const query = `
            UPDATE team 
            SET name = $1, role = $2, email = $3, "shortDescription" = $4, "profileImage" = $5, linkedin = $6, github = $7
            WHERE id = $8
            RETURNING *
        `;
        const values = [name, role, email, shortDescription, profileImage, linkedin, github, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM team WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
