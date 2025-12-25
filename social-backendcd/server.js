const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importation de mongoose
require('dotenv').config(); // Pour lire votre fichier .env

const app = express();
app.use(cors());
// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route de test pour vérifier que le serveur répond
app.get('/', (req, res) => {
    res.send('🚀 Le serveur backend est opérationnel !');
});
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/social_db')
    .then(() => console.log('✅ Connecté à MongoDB avec succès !'))
    .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

// Vos routes (assurez-vous que les chemins sont corrects par rapport à server.js)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/users', require('./routes/user'));
app.use('/api/messages', require('./routes/message'));
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur : http://localhost:${PORT}`);
});