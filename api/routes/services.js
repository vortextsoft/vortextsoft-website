const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all services
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM services ORDER BY order_position ASC, created_at DESC');
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

        // Get the max position and add 1 for new service
        const maxPosResult = await db.query('SELECT COALESCE(MAX(order_position), -1) as max FROM services');
        const nextPosition = maxPosResult.rows[0].max + 1;

        const query = `
            INSERT INTO services (id, title, description, icon, order_position)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [id, title, description, icon, nextPosition];

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
            SET title = $1, description = $2, icon = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [title, description, icon, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// PATCH - Reorder services (swap positions)
router.patch('/reorder', async (req, res) => {
    try {
        const { serviceId, targetPosition } = req.body;

        // Get current service
        const currentResult = await db.query('SELECT order_position FROM services WHERE id = $1', [serviceId]);
        if (currentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        const currentPosition = currentResult.rows[0].order_position;

        // Get service at target position
        const targetResult = await db.query('SELECT id FROM services WHERE order_position = $1', [targetPosition]);

        if (targetResult.rows.length > 0) {
            const targetId = targetResult.rows[0].id;

            // Swap positions
            await db.query('UPDATE services SET order_position = $1 WHERE id = $2', [targetPosition, serviceId]);
            await db.query('UPDATE services SET order_position = $1 WHERE id = $2', [currentPosition, targetId]);
        } else {
            // Just update if no service at target position
            await db.query('UPDATE services SET order_position = $1 WHERE id = $2', [targetPosition, serviceId]);
        }

        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to reorder services' });
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
