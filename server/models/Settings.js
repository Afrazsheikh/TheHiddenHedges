const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String, default: '9816821195' },
  instagramUrl: { type: String, default: 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==' },
  villaName: { type: String, default: 'The Hidden Hedges' },
  tagline: { type: String, default: 'A Secluded Luxury Sanctuary & Private Estate' },
  locationText: { type: String, default: 'Pine Ridge Valley, Himachal Pradesh, India' },
  mapEmbedUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000!2d77.1734!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzE3LjMiTiA3N8KwMTAnMjQuMiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin' },
  googleMapsRedirectUrl: { type: String, default: 'https://maps.google.com/?q=The+Hidden+Hedges+Villa' },
  metaTitle: { type: String, default: 'The Hidden Hedges | Premium Luxury Villa & Private Estate' },
  metaDescription: { type: String, default: 'Experience unparalleled luxury at The Hidden Hedges. Private infinity pool, gourmet dining, Diwali festive offers & mountain views. Book direct via WhatsApp 9816821195.' },
  keywords: { type: String, default: 'luxury villa, private pool villa, Diwali offer villa, weekend getaway, holiday stay, The Hidden Hedges' },
  pricePerNight: { type: String, default: '₹24,999' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
