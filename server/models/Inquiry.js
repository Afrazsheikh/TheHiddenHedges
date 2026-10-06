const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  guestName: { type: String, default: 'Guest' },
  phone: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
  guestsCount: { type: Number, default: 2 },
  offerCode: { type: String, default: 'DIRECT' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Confirmed', 'Cancelled'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
