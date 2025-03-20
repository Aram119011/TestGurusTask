const express = require('express');
const postController = require('../controllers/blogController');
const {authenticateUser} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/blogs', authenticateUser, postController.getAllPosts);
router.get('/blog/:id', authenticateUser, postController.getPostById);

router.post('/blogs', authenticateUser, postController.createPost);
router.put('/blog/:id', authenticateUser, postController.updatePost);
router.delete('/blog/:id', authenticateUser, postController.deletePost);

module.exports = router;
