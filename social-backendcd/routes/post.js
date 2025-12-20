const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const { createPost, getFeed, likePost, recommendPosts } = require('../controllers/postcontroller');

router.post('/', authMiddleware, createPost);
router.get('/feed', authMiddleware, getFeed);
router.post('/like/:postId', authMiddleware, likePost);
router.get('/recommend/posts', authMiddleware, recommendPosts);

module.exports = router;
