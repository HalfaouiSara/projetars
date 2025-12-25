const router = require('express').Router();
const { register, login, getMe } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authMiddleware');

// Inscription (Consigne 13 & 18)
router.post('/register', register);

// Connexion
router.post('/login', login);

// Vérifier l'utilisateur actuel (Utile pour le Frontend)
// Cette route permet de récupérer les infos de l'utilisateur via son Token JWT
router.get('/me', authMiddleware, getMe);

module.exports = router;