import React, { useState } from 'react';
import { Flame, Sparkles, MessageCircle, Copy, Check, Gift, Tag, Clock } from 'lucide-react';

const DiwaliBanner = ({ whatsappNumber = '9816821195', onOpenBookingModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('DIWALI2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimOffer = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal('DIWALI2026', 'Grand Diwali Festive Package (30% OFF)');
    } else {
      const msg = `Hi! I want to book the *Grand Diwali Festive Package* at The Hidden Hedges with Promo Code: *DIWALI2026* (30% OFF). Please share available dates!`;
      window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  return (
    <section id="diwali-special" style={{ padding: '70px 0', background: 'linear-gradient(180deg, #18231c 0%, #1a150d 100%)', borderTop: '1px solid rgba(230,81,0,0.3)', borderBottom: '1px solid rgba(230,81,0,0.3)', position: 'relative', overflow: 'hidden' }}>
      
      <div className="container">
        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(35, 20, 10, 0.95) 0%, rgba(20, 30, 22, 0.95) 100%)', border: '1px solid rgba(230,81,0,0.4)', padding: '32px 36px', borderRadius: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'center' }} className="grid-2">
            
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }} className="badge-diwali animate-pulse-glow">
                <Flame size={15} color="#ff9d42" /> GRAND DIWALI FESTIVE OFFER
              </div>

              <h2 className="font-serif" style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', lineHeight: 1.25 }}>
                Celebrate Diwali at <span style={{ color: '#ff9d42' }}>The Hidden Hedges</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '20px', lineHeight: 1.6 }}>
                Transform your festival into an unforgettable luxury mountain escape. Private fireworks, traditional rangoli, festive feast by private chef, and heated infinity pool access.
              </p>

              {/* Offer Perks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8f6f0', fontSize: '0.85rem' }}>
                  <Gift size={16} color="#ff9d42" /> Gourmet Chef Feast
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8f6f0', fontSize: '0.85rem' }}>
                  <Sparkles size={16} color="#ff9d42" /> Organic Champagne
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8f6f0', fontSize: '0.85rem' }}>
                  <Flame size={16} color="#ff9d42" /> Diyas Illumination
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8f6f0', fontSize: '0.85rem' }}>
                  <Clock size={16} color="#ff9d42" /> 30% Flat Discount
                </div>
              </div>

              {/* Promo Code Box */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', background: 'rgba(0,0,0,0.4)', padding: '12px 18px', borderRadius: '14px', border: '1px dashed rgba(230,81,0,0.5)', marginBottom: '22px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#ff9d42', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>PROMO CODE</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '2px', color: '#ffffff' }}>DIWALI2026</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  style={{
                    marginLeft: 'auto',
                    background: copied ? '#10b981' : 'rgba(230,81,0,0.2)',
                    border: '1px solid rgba(230,81,0,0.5)',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <button onClick={handleClaimOffer} className="btn-diwali" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                <MessageCircle size={18} />
                <span>Select Dates & Claim Offer</span>
              </button>

            </div>

            {/* Right Visual Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '18px', overflow: 'hidden', border: '2px solid rgba(230,81,0,0.4)', boxShadow: '0 16px 36px rgba(0,0,0,0.6)' }}>
                <img
                  src="/images/diwali.jpg"
                  alt="Diwali Festive Offer The Hidden Hedges"
                  style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(15,22,17,0.92)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-gold)', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Tag size={20} color="#ff9d42" />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Special Festive Deal</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>SAVE 30% ON STAY</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DiwaliBanner;
