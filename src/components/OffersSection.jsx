import React, { useState } from 'react';
import { Sparkles, Tag, Calendar, Check, MessageCircle, ArrowRight, Gift } from 'lucide-react';

const OffersSection = ({ offers = [], whatsappNumber = '9816821195', onOpenBookingModal }) => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Festive Special', 'Weekend Deal', 'Couples & Honeymoon'];

  const filteredOffers = activeTab === 'All'
    ? offers
    : offers.filter(o => o.category?.toLowerCase().includes(activeTab.toLowerCase()));

  const handleBookOffer = (offer) => {
    if (onOpenBookingModal) {
      onOpenBookingModal(offer.code, offer.title);
    } else {
      const msg = `Hi! I want to book *The Hidden Hedges Villa* under the *${offer.title}* offer (Code: *${offer.code}* - ${offer.discount}). Please share availability!`;
      window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  return (
    <section id="offers" style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px' }}>
          <span className="badge-gold" style={{ marginBottom: '10px', display: 'inline-block' }}>
            <Sparkles size={13} style={{ display: 'inline', marginRight: '5px' }} /> SPECIAL OFFERS & PACKAGES
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            Exclusive Deals & <span className="text-gold-gradient">Festive Packages</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
            Handcrafted luxury offers designed for Diwali celebrations, weekend escapes, and romantic retreats.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.04)',
                color: activeTab === cat ? '#0f1611' : 'var(--text-muted)',
                fontWeight: activeTab === cat ? 700 : 500,
                border: activeTab === cat ? 'none' : '1px solid var(--border-gold)',
                padding: '8px 18px',
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
                borderRadius: '20px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              
              {/* Discount Tag */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 10,
                background: offer.code?.includes('DIWALI') ? 'var(--accent-diwali-grad)' : 'var(--gold-gradient)',
                color: offer.code?.includes('DIWALI') ? '#fff' : '#0f1611',
                fontWeight: 800,
                padding: '5px 12px',
                borderRadius: '30px',
                fontSize: '0.8rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
              }}>
                {offer.discount}
              </div>

              {/* Offer Image */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={offer.image || '/images/hero.jpg'}
                  alt={offer.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
              </div>

              {/* Offer Details */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  {offer.category}
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {offer.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '14px', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {offer.description}
                </p>

                {/* Perks Checklist */}
                {offer.perks && offer.perks.length > 0 && (
                  <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {offer.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        <Check size={13} color="var(--gold-primary)" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Code & Action */}
                <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block' }}>CODE</span>
                    <span style={{ fontWeight: 800, color: '#ffffff', letterSpacing: '1px', fontSize: '0.92rem' }}>{offer.code}</span>
                  </div>

                  <button
                    onClick={() => handleBookOffer(offer)}
                    className="btn-whatsapp"
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    <MessageCircle size={15} />
                    <span>Select Dates & Book</span>
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
