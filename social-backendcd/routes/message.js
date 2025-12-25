const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Message = require('../Models/message'); // On suppose que le modèle est créé

// Route pour envoyer un message
router.post('/', auth, async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const newMessage = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;