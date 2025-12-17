const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all reviews (public - only visible)
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reviews WHERE is_visible = true ORDER BY order_position ASC, created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// GET all reviews (admin - including hidden)
router.get('/admin', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reviews ORDER BY order_position ASC, created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// GET single review
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reviews WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

// POST (Create) review
router.post('/', async (req, res) => {
    try {
        const { name, company_name, profile_image, review_text, star_rating, is_visible } = req.body;
        const id = uuidv4();

        // Get the max position and add 1 for new review
        const maxPosResult = await db.query('SELECT COALESCE(MAX(order_position), -1) as max FROM reviews');
        const nextPosition = maxPosResult.rows[0].max + 1;

        const query = `
            INSERT INTO reviews (id, name, company_name, profile_image, review_text, star_rating, is_visible, order_position)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [id, name, company_name || null, profile_image || null, review_text, star_rating || 5, is_visible !== false, nextPosition];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// PUT (Update) review
router.put('/:id', async (req, res) => {
    try {
        const { name, company_name, profile_image, review_text, star_rating, is_visible } = req.body;

        const query = `
            UPDATE reviews 
            SET name = $1, company_name = $2, profile_image = $3, review_text = $4, star_rating = $5, is_visible = $6
            WHERE id = $7
            RETURNING *
        `;
        const values = [name, company_name || null, profile_image || null, review_text, star_rating || 5, is_visible !== false, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to update review' });
    }
});

// PATCH - Reorder reviews (for drag-drop)
router.patch('/reorder', async (req, res) => {
    try {
        const { reviewId, targetPosition } = req.body;

        // Get current review
        const currentResult = await db.query('SELECT order_position FROM reviews WHERE id = $1', [reviewId]);
        if (currentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        const currentPosition = currentResult.rows[0].order_position;

        // Get review at target position
        const targetResult = await db.query('SELECT id FROM reviews WHERE order_position = $1', [targetPosition]);

        if (targetResult.rows.length > 0) {
            const targetId = targetResult.rows[0].id;

            // Swap positions
            await db.query('UPDATE reviews SET order_position = $1 WHERE id = $2', [targetPosition, reviewId]);
            await db.query('UPDATE reviews SET order_position = $1 WHERE id = $2', [currentPosition, targetId]);
        } else {
            // Just update if no review at target position
            await db.query('UPDATE reviews SET order_position = $1 WHERE id = $2', [targetPosition, reviewId]);
        }

        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to reorder reviews' });
    }
});

// POST - Like a review
router.post('/:id/like', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('user-agent');
        const likeId = uuidv4();

        // Check if already liked
        const existingLike = await db.query(
            'SELECT id FROM review_likes WHERE review_id = $1 AND ip_address = $2',
            [reviewId, ipAddress]
        );

        if (existingLike.rows.length > 0) {
            return res.status(400).json({ error: 'Already liked this review' });
        }

        // Add like
        await db.query(
            'INSERT INTO review_likes (id, review_id, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
            [likeId, reviewId, ipAddress, userAgent]
        );

        // Increment likes_count
        const result = await db.query(
            'UPDATE reviews SET likes_count = likes_count + 1 WHERE id = $1 RETURNING likes_count',
            [reviewId]
        );

        res.json({ likes_count: result.rows[0].likes_count, liked: true });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to like review' });
    }
});

// DELETE - Unlike a review
router.delete('/:id/like', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Remove like
        const deleteResult = await db.query(
            'DELETE FROM review_likes WHERE review_id = $1 AND ip_address = $2 RETURNING id',
            [reviewId, ipAddress]
        );

        if (deleteResult.rows.length === 0) {
            return res.status(400).json({ error: 'Like not found' });
        }

        // Decrement likes_count
        const result = await db.query(
            'UPDATE reviews SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = $1 RETURNING likes_count',
            [reviewId]
        );

        res.json({ likes_count: result.rows[0].likes_count, liked: false });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to unlike review' });
    }
});

// DELETE review
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
});

module.exports = router;
