const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addFriend, recommendFriends } = require('../controllers/usercontroller');

router.post('/add-friend', authMiddleware, addFriend);
router.get('/recommend/friends', authMiddleware, recommendFriends);

module.exports = router;
