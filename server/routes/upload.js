const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { verifyToken } = require('./auth');

// Multer Storage setup replacing target slots or saving cleanly
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const targetSlot = req.body.targetSlot || 'custom';
    let filename = '';

    if (targetSlot === 'hero') filename = 'hero.jpg';
    else if (targetSlot === 'diwali') filename = 'diwali.jpg';
    else if (targetSlot === 'bedroom') filename = 'bedroom.jpg';
    else if (targetSlot === 'dining') filename = 'dining.jpg';
    else filename = `real_villa_${Date.now()}${path.extname(file.originalname).toLowerCase() || '.jpg'}`;

    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max file size
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// POST /api/upload (Admin Protected Upload)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const publicUrl = `/images/${req.file.filename}?v=${Date.now()}`;
    return res.json({
      success: true,
      message: `Image successfully replaced in slot: ${req.body.targetSlot || 'custom'}!`,
      imageUrl: publicUrl,
      filename: req.file.filename
    });
  } catch (err) {
    return res.status(500).json({ message: 'Upload error: ' + err.message });
  }
});

// GET /api/upload/images - List available images in public/images
router.get('/images', (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../../public/images');
    if (!fs.existsSync(uploadDir)) return res.json([]);

    const files = fs.readdirSync(uploadDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    const list = files.map(f => ({
      name: f,
      url: `/images/${f}`
    }));
    return res.json(list);
  } catch (err) {
    return res.json([]);
  }
});

module.exports = router;
