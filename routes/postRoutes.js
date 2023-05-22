const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a new post in a forum (GET)
router.get('/forums/:forumId/posts/create', postController.createPostPage);

// Save a new post in a forum (POST)
router.post('/forums/:forumId/posts', postController.createPost);

// Get all posts in a forum (GET)
router.get('/forums/:forumId/posts', postController.getAllPosts);

// Get a specific post by ID in a forum (GET)
router.get('/forums/:forumId/posts/:postId', postController.getPostById);

// Update a post by ID in a forum (GET)
router.get('/forums/:forumId/posts/:postId/edit', postController.editPostPage);

// Update a post by ID in a forum (PUT)
router.put('/forums/:forumId/posts/:postId', postController.updatePost);

// Delete a post by ID in a forum (DELETE)
router.delete('/forums/:forumId/posts/:postId', postController.deletePost);

module.exports = router;
