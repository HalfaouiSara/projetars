const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // ⚠️ Extraction correcte du token
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contient id
    next();
  } catch (err) {
    console.error('JWT ERROR:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
