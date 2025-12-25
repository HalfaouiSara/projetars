const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const postController = require('../controllers/postcontroller');
router.post('/', (req, res) => {
    res.send('POST ROUTE ATTEINTE');
});

// =======================
// POSTS
// =======================
console.log('📌 post routes loaded');

// Créer un post
router.post('/', authMiddleware, postController.createPost);

// Fil d’actualité
router.get('/feed', authMiddleware, postController.getFeed);

// Recommandations
router.get('/recommend', authMiddleware, postController.recommendPosts);

// Like / Unlike
router.post('/:postId/like', authMiddleware, postController.likePost);

// Ajouter un commentaire
router.post('/:postId/comment', authMiddleware, postController.addComment);

// Supprimer un post
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;
