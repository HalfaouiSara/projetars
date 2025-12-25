const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getUserProfile,
    updateProfile,
    addFriend,
    recommendFriends,
    searchUsers
} = require('../controllers/usercontroller');

// --- Gestion de Profil (Consigne 13) ---
// Récupérer les infos de l'utilisateur connecté ou d'un autre utilisateur
//router.get('/profile/:id', authMiddleware, getUserProfile);
// Mettre à jour ses propres infos (bio, intérêts, photo)
//router.put('/profile', authMiddleware, updateProfile);

// --- Social & Recherche ---
// Rechercher des utilisateurs (utile pour le frontend)
//router.get('/search', authMiddleware, searchUsers);
// Ajouter un ami
router.post('/add-friend', authMiddleware, addFriend);

// --- Système de Recommandation (Consigne 15) ---
// Recommandation d'amis (Similarité ou Graphe)
router.get('/recommend/friends', authMiddleware, recommendFriends);

module.exports = router;