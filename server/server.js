const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static Folder for generated & uploaded real images
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', require('./routes/auth').router);
app.use('/api/offers', require('./routes/offers'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/upload', require('./routes/upload'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    villa: 'The Hidden Hedges'
  });
});

// Fallback to index.html for SPA frontend
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, '../index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Server] The Hidden Hedges Backend running on http://localhost:${PORT}`);
});
