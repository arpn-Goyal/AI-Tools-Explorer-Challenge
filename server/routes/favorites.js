const express = require('express');
const router = express.Router();
const tools = require('../data/tools');

let favorites = []; // In-memory store

// GET favorites: List all saved favorites
router.get('/favorites', (req, res) => {
    res.json(favorites);
});

// POST add to favorites : Save a tool to favorites (send {toolId: 1})
router.post('/favorites', (req, res) => {
    const { toolId } = req.body;
    const id = parseInt(toolId);

    // Check if already added
    if (favorites.find(tool => tool.id === id)) {
        return res.status(400).json({ error: 'Already in favorites' });
    }

    const tool = tools.find(t => t.id === id);
    if (!tool) {
        return res.status(404).json({ error: 'Tool not found' });
    }

    favorites.push(tool);
    res.status(201).json({ message: 'Added to favorites', tool });
});

// DELETE to remove favorite
router.delete('/favorites', (req, res) => {
    const { toolId } = req.body;
    const id = parseInt(toolId);

    const index = favorites.findIndex(tool => tool.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Tool not found in favorites' });
    }

    favorites.splice(index, 1);
    res.json({ message: 'Removed from favorites' });
});

module.exports = router;
