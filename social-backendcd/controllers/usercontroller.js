const User = require('../Models/users');

// Ajouter un ami (Relation mutuelle demandée dans la consigne 13)
exports.addFriend = async (req, res) => {
  try {
    const { userId } = req.body;
    const myId = req.user.id;

    if (myId === userId) return res.status(400).json({ msg: "Vous ne pouvez pas vous ajouter vous-même" });

    const user = await User.findById(myId);
    const friend = await User.findById(userId);

    if (!friend) return res.status(404).json({ msg: "Utilisateur non trouvé" });

    // Ajout mutuel pour construire le graphe social 
    if (!user.friends.includes(userId)) user.friends.push(userId);
    if (!friend.friends.includes(myId)) friend.friends.push(myId);

    await user.save();
    await friend.save();

    res.json({ msg: "Ami ajouté avec succès", friends: user.friends });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Recommandation d'amis (Consigne 15)
exports.recommendFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Dans recommendFriends, assure-toi d'avoir cette ligne :
    const allUsers = await User.find({ _id: { $ne: user._id, $nin: user.friends } });
    // Normalisation des intérêts de l'utilisateur actuel
    const myInterests = user.interests.map(i => i.toLowerCase());

    const recommendations = allUsers.map(u => {
      // 1. Amis communs (Graphe)
      const commonFriends = u.friends.filter(f =>
        user.friends.map(id => id.toString()).includes(f.toString())
      ).length;

      // 2. Intérêts communs (Contenu) - Normalisés en minuscules
      const uInterests = u.interests.map(i => i.toLowerCase());
      const commonInterests = uInterests.filter(i => myInterests.includes(i)).length;

      // Calcul du score hybride
      const score = (commonFriends * 0.6) + (commonInterests * 0.4);

      return { user: u, score };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
