const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Create a forum (GET)
router.get('/create', forumController.createForumPage);

// Save a forum (POST)
router.post('/', forumController.createForum);

// Get all forums (GET)
router.get('/', forumController.getAllForums);

// Get a specific forum by ID (GET)
router.get('/:id', forumController.getForumById);

// Update a forum by ID (GET)
router.get('/:id/edit', forumController.editForumPage);

// Update a forum by ID (PUT)
router.put('/:id', forumController.updateForum);

// Delete a forum by ID (DELETE)
router.delete('/:id', forumController.deleteForum);

module.exports = router;