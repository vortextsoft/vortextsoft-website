const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// POST (Create) post
router.post('/', async (req, res) => {
    try {
        const { title, excerpt, content, author, imageUrl, category, tags, isVisible, link } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO blog_posts (id, title, excerpt, content, author, image_url, category, tags, is_visible, link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const values = [
            id,
            title,
            excerpt,
            content,
            author,
            imageUrl,
            category,
            tags,
            isVisible !== undefined ? isVisible : true,
            link
        ];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item', details: error.message });
    }
});

// PUT (Update) post
router.put('/:id', async (req, res) => {
    try {
        const { title, excerpt, content, author, imageUrl, category, tags, isVisible, link } = req.body;

        const query = `
            UPDATE blog_posts 
            SET title = $1, excerpt = $2, content = $3, author = $4, image_url = $5, category = $6, tags = $7, is_visible = $8, link = $9
            WHERE id = $10
            RETURNING *
        `;
        const values = [
            title,
            excerpt,
            content,
            author,
            imageUrl,
            category,
            tags,
            isVisible,
            link,
            req.params.id
        ];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// PATCH (Update Partial)
router.patch('/:id', async (req, res) => {
    try {
        const fields = req.body;
        const keys = Object.keys(fields);

        if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });

        // Map frontend keys to DB columns
        const fieldMap = {
            title: 'title',
            excerpt: 'excerpt',
            content: 'content',
            author: 'author',
            imageUrl: 'image_url',
            image: 'image_url', // fallback
            category: 'category',
            tags: 'tags',
            isVisible: 'is_visible',
            is_visible: 'is_visible', // direct
            published: 'is_visible', // fallback
            link: 'link'
        };

        const validUpdates = [];
        const values = [];
        let paramCount = 1;

        keys.forEach(key => {
            if (fieldMap[key]) {
                validUpdates.push(`${fieldMap[key]} = $${paramCount}`);
                values.push(fields[key]);
                paramCount++;
            }
        });

        if (validUpdates.length === 0) return res.status(400).json({ error: 'No valid fields' });

        values.push(req.params.id);
        const query = `UPDATE blog_posts SET ${validUpdates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

        const result = await db.query(query, values);

        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});


// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
