const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No authorization token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thehiddenhedges_super_secret_jwt_key_2026');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const expectedUser = process.env.ADMIN_USER || 'munaazpro_db_user';
  const expectedPass = process.env.ADMIN_PASS || 'THB6KY2Ce2bPcjmC';

  if (username === expectedUser && password === expectedPass) {
    const token = jwt.sign(
      { username: expectedUser, role: 'admin' },
      process.env.JWT_SECRET || 'thehiddenhedges_super_secret_jwt_key_2026',
      { expiresIn: '24h' }
    );
    return res.json({
      success: true,
      token,
      user: { username: expectedUser, role: 'admin' },
      message: 'Login successful'
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your admin username and password.' });
});

// Verify Session Route
router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = { router, verifyToken };
