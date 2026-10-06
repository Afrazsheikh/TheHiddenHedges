const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { verifyToken } = require('./auth');
const { getIsConnected } = require('../config/db');

let memorySettings = {
  whatsappNumber: '9816821195',
  instagramUrl: 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==',
  villaName: 'The Hidden Hedges',
  tagline: 'A Secluded Luxury Sanctuary & Private Estate',
  locationText: 'Pine Ridge Valley, Himachal Pradesh, India',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000!2d77.1734!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzE3LjMiTiA3N8KwMTAnMjQuMiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
  googleMapsRedirectUrl: 'https://maps.google.com/?q=The+Hidden+Hedges+Villa',
  metaTitle: 'The Hidden Hedges | Premium Luxury Villa & Private Estate',
  metaDescription: 'Experience unparalleled luxury at The Hidden Hedges. Private infinity pool, gourmet dining, Diwali festive offers & mountain views. Book direct via WhatsApp 9816821195.',
  keywords: 'luxury villa, private pool villa, Diwali offer villa, weekend getaway, holiday stay, The Hidden Hedges',
  pricePerNight: '₹24,999'
};

// GET settings (Public)
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      let doc = await Settings.findOne();
      if (!doc) {
        doc = new Settings(memorySettings);
        await doc.save();
      }
      return res.json(doc);
    }
    return res.json(memorySettings);
  } catch (err) {
    return res.json(memorySettings);
  }
});

// PUT settings (Admin only)
router.put('/', verifyToken, async (req, res) => {
  try {
    if (getIsConnected()) {
      let doc = await Settings.findOne();
      if (doc) {
        Object.assign(doc, req.body, { updatedAt: Date.now() });
        await doc.save();
      } else {
        doc = new Settings({ ...memorySettings, ...req.body });
        await doc.save();
      }
      return res.json(doc);
    } else {
      memorySettings = { ...memorySettings, ...req.body };
      return res.json(memorySettings);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings: ' + err.message });
  }
});

module.exports = router;
