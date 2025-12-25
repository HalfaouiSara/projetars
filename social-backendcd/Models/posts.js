const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  // L'auteur est relié au modèle User [cite: 13, 18]
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Contenu textuel du post [cite: 13]
  content: {
    type: String,
    required: true
  },

  // URL de l'image (pour l'affichage frontend) [cite: 13, 17]
  image: {
    type: String,
    default: ""
  },

  // Tags/Catégories : CRUCIAL pour la recommandation de contenu [cite: 14, 16]
  // Exemple: ["sport", "tech"]
  tags: {
    type: [String],
    default: [],
    index: true
  },

  // Système de Likes (Stocke les IDs des utilisateurs qui ont aimé) 
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Système de Commentaires [cite: 13]
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]

}, {
  // Génère automatiquement createdAt et updatedAt [cite: 17, 20]
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);