const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const { verifyToken } = require('./auth');
const { getIsConnected } = require('../config/db');

// Initial default seed offers in case DB is newly initialized or in fallback mode
let memoryOffers = [
  {
    _id: 'seed-diwali-1',
    title: 'Grand Diwali Festive Luxury Retreat',
    subtitle: 'Light Up Your Festival of Lights at The Hidden Hedges',
    code: 'DIWALI2026',
    discount: '30% OFF',
    category: 'Festive Special',
    validity: 'Valid for Diwali Season',
    image: '/images/diwali.jpg',
    description: 'Celebrate Diwali with private fireworks lighting, handcrafted brass diyas decor, complimentary vintage champagne, multi-course festive dining by our private chef, and heated infinity pool access.',
    perks: ['Gourmet Festive Feast by Chef', 'Complimentary Champagne Bottle', 'Rangoli & Diyas Illumination', '30% Villa Stay Discount'],
    isFeatured: true,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'seed-weekend-2',
    title: 'Luxury Weekend Sanctuary Escape',
    subtitle: 'Recharge in Complete Secluded Tranquility',
    code: 'WEEKEND20',
    discount: '20% OFF',
    category: 'Weekend Deal',
    validity: 'Friday - Sunday Bookings',
    image: '/images/hero.jpg',
    description: 'Indulge in 2 nights of pure luxury with signature floating pool breakfast, afternoon high tea on the garden lawn, and late checkout up to 3 PM.',
    perks: ['Signature Floating Breakfast', 'Complimentary Late Checkout', 'Evening Lawn High Tea', 'High-Speed Starlink WiFi'],
    isFeatured: false,
    isActive: true,
    createdAt: new Date()
  },
  {
    _id: 'seed-romance-3',
    title: 'Romantic Starlight Couple Sanctuary',
    subtitle: 'Curated Romantic Moments Under Mountain Skies',
    code: 'ROMANCE25',
    discount: '25% OFF',
    category: 'Couples & Honeymoon',
    validity: 'Year-Round Special',
    image: '/images/bedroom.jpg',
    description: 'Candlelight dinner under grape arbor patio, rose bath ritual setup, outdoor bonfire under starry canopy, and personalized private butler service.',
    perks: ['Candlelight Outdoor Dining', 'Rose Petal Jacuzzi Bath', 'Private Bonfire & S\'mores', 'Dedicated Private Butler'],
    isFeatured: true,
    isActive: true,
    createdAt: new Date()
  }
];

// Seed DB if connected and empty
const seedOffersIfEmpty = async () => {
  if (!getIsConnected()) return;
  try {
    const count = await Offer.countDocuments();
    if (count === 0) {
      await Offer.insertMany(memoryOffers.map(({ _id, ...rest }) => rest));
      console.log('[Offers] Successfully seeded initial offers into MongoDB');
    }
  } catch (err) {
    console.error('[Offers] Seeding error:', err.message);
  }
};

// GET all offers (Public)
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await seedOffersIfEmpty();
      const offers = await Offer.find().sort({ createdAt: -1 });
      if (offers && offers.length > 0) return res.json(offers);
    }
    return res.json(memoryOffers);
  } catch (err) {
    return res.json(memoryOffers);
  }
});

// POST new offer (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newOfferData = req.body;
    if (getIsConnected()) {
      const offer = new Offer(newOfferData);
      await offer.save();
      return res.status(201).json(offer);
    } else {
      const newOffer = {
        _id: 'mem-' + Date.now(),
        ...newOfferData,
        createdAt: new Date()
      };
      memoryOffers.unshift(newOffer);
      return res.status(201).json(newOffer);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating offer: ' + err.message });
  }
});

// PUT update offer (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected() && !id.startsWith('mem-') && !id.startsWith('seed-')) {
      const updated = await Offer.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    } else {
      const index = memoryOffers.findIndex(o => o._id === id);
      if (index !== -1) {
        memoryOffers[index] = { ...memoryOffers[index], ...req.body };
        return res.json(memoryOffers[index]);
      }
      return res.status(404).json({ message: 'Offer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating offer: ' + err.message });
  }
});

// DELETE offer (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected() && !id.startsWith('mem-') && !id.startsWith('seed-')) {
      await Offer.findByIdAndDelete(id);
      return res.json({ message: 'Offer deleted successfully' });
    } else {
      memoryOffers = memoryOffers.filter(o => o._id !== id);
      return res.json({ message: 'Offer deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting offer: ' + err.message });
  }
});

module.exports = router;
