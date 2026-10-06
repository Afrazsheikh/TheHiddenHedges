import React, { useState } from 'react';
import { Sparkles, Tag, Calendar, Check, MessageCircle, ArrowRight, Gift } from 'lucide-react';

const OffersSection = ({ offers = [], whatsappNumber }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOfferModal, setSelectedOfferModal] = useState(null);

  const categories = ['All', 'Festive Special', 'Weekend Deal', 'Couples & Honeymoon'];

  const filteredOffers = activeTab === 'All'
    ? offers
    : offers.filter(o => o.category?.toLowerCase().includes(activeTab.toLowerCase()));

  const handleBookOffer = (offer) => {
    const msg = `Hi! I want to book *The Hidden Hedges Villa* under the *${offer.title}* offer (Code: *${offer.code}* - ${offer.discount}). Please share availability!`;
    
    // Log inquiry to database
    try {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerCode: offer.code,
          message: `Inquiry for offer: ${offer.title}`
        })
      });
    } catch (e) {}

    window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="offers" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> SPECIAL OFFERS & PACKAGES
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Exclusive Deals & <span className="text-gold-gradient">Festive Packages</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Handcrafted luxury offers designed for Diwali celebrations, weekend escapes, and romantic retreats. Managed live from our estate admin panel.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.04)',
                color: activeTab === cat ? '#0f1611' : 'var(--text-muted)',
                fontWeight: activeTab === cat ? 700 : 500,
                border: activeTab === cat ? 'none' : '1px solid var(--border-gold)',
                padding: '10px 22px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid-3">
          {filteredOffers.map((offer) => (
            <div
              key={offer._id || offer.code}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              
              {/* Discount Tag */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: offer.code?.includes('DIWALI') ? 'var(--accent-diwali-grad)' : 'var(--gold-gradient)',
                color: offer.code?.includes('DIWALI') ? '#fff' : '#0f1611',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '30px',
                fontSize: '0.85rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
              }}>
                {offer.discount}
              </div>

              {/* Offer Image */}
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={offer.image || '/images/hero.jpg'}
                  alt={offer.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* Offer Details */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {offer.category}
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  {offer.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '18px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {offer.description}
                </p>

                {/* Perks Checklist */}
                {offer.perks && offer.perks.length > 0 && (
                  <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {offer.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        <Check size={14} color="var(--gold-primary)" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Code & Action */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>CODE</span>
                    <span style={{ fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>{offer.code}</span>
                  </div>

                  <button
                    onClick={() => handleBookOffer(offer)}
                    className="btn-whatsapp"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    <MessageCircle size={16} />
                    <span>Book Offer</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OffersSection;
