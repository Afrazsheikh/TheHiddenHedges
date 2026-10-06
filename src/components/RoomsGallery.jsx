import React, { useState } from 'react';
import { BedDouble, Maximize, Eye, Users, MessageCircle, Check } from 'lucide-react';

const suitesData = [
  {
    id: 'master-penthouse',
    name: 'Royal Master Penthouse Suite',
    category: 'Penthouse',
    size: '850 sq ft',
    capacity: '2 Guests',
    bed: 'Super King Canopy Bed',
    view: 'Panoramic Valley & Pool View',
    image: '/images/bedroom.jpg',
    price: '₹14,999 / night',
    description: 'Floor-to-ceiling glass wall framing misty pine valleys, ensuite marble bathroom with Jacuzzi tub, private sun terrace, and fireplace.',
    amenities: ['Jacuzzi Tub', 'Private Sun Terrace', 'Fireplace', 'Walk-in Wardrobe', 'Butler Call Button']
  },
  {
    id: 'pine-view-suite',
    name: 'Pine Ridge Sunset Suite',
    category: 'Luxury Suite',
    size: '650 sq ft',
    capacity: '2 Guests',
    bed: 'King Organic Linen Bed',
    view: 'Lush Pine Forest View',
    image: '/images/hero.jpg',
    price: '₹11,999 / night',
    description: 'Spacious modern bedroom opening directly into private pine forest deck with outdoor lounging chairs and warm ambient lights.',
    amenities: ['Private Forest Deck', 'Smart TV with Netflix', 'Rainfall Shower', 'Espresso Machine']
  },
  {
    id: 'garden-chalet-suite',
    name: 'Garden Terrace Suite',
    category: 'Chalet',
    size: '600 sq ft',
    capacity: '2-3 Guests',
    bed: 'King Bed + Day Bed',
    view: 'Private Marigold & Rose Garden',
    image: '/images/diwali.jpg',
    price: '₹9,999 / night',
    description: 'Intimate suite surrounded by blooming gardens and fairy-lit courtyard, ideal for quiet reading and evening tea.',
    amenities: ['Garden Patio Access', 'Mini Bar', 'Aroma Diffuser', 'Custom Pillow Menu']
  },
  {
    id: 'dining-patio-lounge',
    name: 'Starlight Dining & Firepit Deck',
    category: 'Living & Dining',
    size: '1200 sq ft',
    capacity: 'Up to 14 Guests',
    bed: 'Grand Dining Table + Lounge',
    view: '360° Open Horizon View',
    image: '/images/dining.jpg',
    price: 'Included with Full Villa',
    description: 'Open-air timber terrace featuring candlelit banquet table, bonfire firepit, barbecue station, and starlight acoustic setup.',
    amenities: ['Barbecue Grill', 'Outdoor Speakers', 'Heated Fire Pit', 'Custom Wine Chiller']
  }
];

const RoomsGallery = ({ whatsappNumber }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Penthouse', 'Luxury Suite', 'Chalet', 'Living & Dining'];

  const filteredSuites = activeFilter === 'All'
    ? suitesData
    : suitesData.filter(s => s.category === activeFilter);

  const handleBookSuite = (suite) => {
    const msg = `Hi! I would like to check availability for the *${suite.name}* at The Hidden Hedges Villa. Rate: ${suite.price}. Please share open dates!`;
    window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="suites" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
            ACCOMMODATION & SPACES
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Luxury Suites & <span className="text-gold-gradient">Estate Spaces</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Each suite at The Hidden Hedges is crafted with floor-to-ceiling glass windows, organic linens, warm timber accents, and private outdoor decks.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === cat ? '#0f1611' : 'var(--text-muted)',
                fontWeight: activeFilter === cat ? 700 : 500,
                border: activeFilter === cat ? 'none' : '1px solid var(--border-gold)',
                padding: '8px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Suites Grid */}
        <div className="grid-2">
          {filteredSuites.map((suite) => (
            <div key={suite.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Image Header */}
              <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={suite.image}
                  alt={suite.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.06)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(15,22,17,0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: '1px solid var(--border-gold)'
                }}>
                  {suite.price}
                </div>
              </div>

              {/* Suite Content */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dim)', fontSize: '0.82rem', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Maximize size={14} /> {suite.size}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {suite.capacity}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {suite.view}</span>
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 700, marginBottom: '10px' }}>
                  {suite.name}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  {suite.description}
                </p>

                {/* Amenities checklist */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                  {suite.amenities.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      <Check size={14} color="var(--gold-primary)" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBookSuite(suite)}
                  className="btn-primary"
                  style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  <span>Reserve Suite via WhatsApp</span>
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RoomsGallery;
