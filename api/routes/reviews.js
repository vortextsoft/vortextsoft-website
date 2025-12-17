const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all reviews
router.get('/', async (req, res) => {
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
        const { name, company_name, review, star_rating, profile_image } = req.body;
        const id = uuidv4();

        // Get the max position and add 1 for new review
        const maxPosResult = await db.query('SELECT COALESCE(MAX(order_position), -1) as max FROM reviews');
        const nextPosition = maxPosResult.rows[0].max + 1;

        const query = `
            INSERT INTO reviews (id, name, company_name, review, star_rating, profile_image, order_position)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [id, name, company_name || null, review, star_rating, profile_image || null, nextPosition];

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
        const { name, company_name, review, star_rating, profile_image } = req.body;

        const query = `
            UPDATE reviews 
            SET name = $1, company_name = $2, review = $3, star_rating = $4, profile_image = $5
            WHERE id = $6
            RETURNING *
        `;
        const values = [name, company_name || null, review, star_rating, profile_image || null, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
});

// PATCH - Reorder reviews (swap positions)
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

// POST - Like/Unlike review
router.post('/:id/like', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { userIdentifier } = req.body;

        if (!userIdentifier) {
            return res.status(400).json({ error: 'User identifier required' });
        }

        // Check if user already liked this review
        const existingLike = await db.query(
            'SELECT id FROM review_likes WHERE review_id = $1 AND user_identifier = $2',
            [reviewId, userIdentifier]
        );

        if (existingLike.rows.length > 0) {
            // Unlike - remove the like
            await db.query('DELETE FROM review_likes WHERE review_id = $1 AND user_identifier = $2', [reviewId, userIdentifier]);
            await db.query('UPDATE reviews SET likes_count = likes_count - 1 WHERE id = $1', [reviewId]);
        } else {
            // Like - add the like
            await db.query('INSERT INTO review_likes (review_id, user_identifier) VALUES ($1, $2)', [reviewId, userIdentifier]);
            await db.query('UPDATE reviews SET likes_count = likes_count + 1 WHERE id = $1', [reviewId]);
        }

        // Get updated like count
        const result = await db.query('SELECT likes_count FROM reviews WHERE id = $1', [reviewId]);
        const likesCount = result.rows[0]?.likes_count || 0;

        res.json({ likes_count: likesCount, liked: existingLike.rows.length === 0 });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to process like' });
    }
});

// GET - Check if user liked a review
router.get('/:id/like-status', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { userIdentifier } = req.query;

        if (!userIdentifier) {
            return res.json({ liked: false });
        }

        const result = await db.query(
            'SELECT id FROM review_likes WHERE review_id = $1 AND user_identifier = $2',
            [reviewId, userIdentifier]
        );

        res.json({ liked: result.rows.length > 0 });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check like status' });
    }
});

// DELETE review
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Review not found' });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
});

module.exports = router;
