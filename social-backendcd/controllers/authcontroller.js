const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription (Consigne 13 & 18)
exports.register = async (req, res) => {
  const { username, email, password, interests } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Cet email est déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      interests
    });

    // On ne renvoie pas le mot de passe au frontend
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" });

    // Création du Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        interests: user.interests,
        friends: user.friends
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer l'utilisateur actuel (Essentiel pour le Frontend)
exports.getMe = async (req, res) => {
  try {
    // req.user.id vient de votre authMiddleware
    const user = await User.findById(req.user.id).select('-password').populate('friends', 'username');
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};