const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find({ isVisible: true }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Item not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Patch for partial updates (legacy support)
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
