const Message = require('../Models/message');

// Envoyer un message
exports.sendMessage = async (req, res) => {
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
};

// Récupérer la discussion entre deux personnes
exports.getChat = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 }); // Ordre chronologique
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};