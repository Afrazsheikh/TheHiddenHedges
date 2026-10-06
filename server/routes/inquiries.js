const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { verifyToken } = require('./auth');
const { getIsConnected } = require('../config/db');

let memoryInquiries = [];

// POST new booking inquiry (Public - triggered on WhatsApp click or Direct Inquiry form)
router.post('/', async (req, res) => {
  try {
    const inquiryData = req.body;
    if (getIsConnected()) {
      const inquiry = new Inquiry(inquiryData);
      await inquiry.save();
      return res.status(201).json({ success: true, inquiry });
    } else {
      const inquiry = {
        _id: 'inq-' + Date.now(),
        ...inquiryData,
        status: 'New',
        createdAt: new Date()
      };
      memoryInquiries.unshift(inquiry);
      return res.status(201).json({ success: true, inquiry });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to record inquiry: ' + err.message });
  }
});

// GET all inquiries (Admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (getIsConnected()) {
      const list = await Inquiry.find().sort({ createdAt: -1 });
      return res.json(list);
    }
    return res.json(memoryInquiries);
  } catch (err) {
    return res.json(memoryInquiries);
  }
});

// PUT update inquiry status (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (getIsConnected() && !id.startsWith('inq-')) {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    } else {
      const item = memoryInquiries.find(i => i._id === id);
      if (item) {
        item.status = status;
        return res.json(item);
      }
      return res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
