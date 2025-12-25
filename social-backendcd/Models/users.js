const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profil (Demandé dans les consignes )
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },

  // Centres d'intérêt (Crucial pour la recommandation )
  interests: { type: [String], default: [] },

  // Graphe social (Demandé pour la recommandation d'amis )
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Optionnel : pour des reco basées sur la popularité
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

module.exports = mongoose.model('User', UserSchema);