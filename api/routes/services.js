const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

// POST (Create) service
router.post('/', async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create service' });
    }
});

// PUT (Update) service
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedService) return res.status(404).json({ error: 'Service not found' });
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ error: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

module.exports = router;
