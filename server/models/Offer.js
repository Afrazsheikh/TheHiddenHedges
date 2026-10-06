const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  code: { type: String, required: true, uppercase: true },
  discount: { type: String, required: true },
  category: { type: String, default: 'Special Offer' },
  validity: { type: String, default: 'Limited Time' },
  image: { type: String, default: '/images/diwali.jpg' },
  description: { type: String, required: true },
  perks: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);
