import React, { useState } from 'react';
import { Flame, Sparkles, MessageCircle, Copy, Check, Gift, Tag, Clock } from 'lucide-react';

const DiwaliBanner = ({ whatsappNumber }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('DIWALI2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookDiwali = () => {
    const msg = `Hi! I want to book the *Grand Diwali Festive Package* at The Hidden Hedges with Promo Code: *DIWALI2026* (30% OFF). Please share available dates!`;
    window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="diwali-special" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #18231c 0%, #1a150d 100%)', borderTop: '1px solid rgba(230,81,0,0.3)', borderBottom: '1px solid rgba(230,81,0,0.3)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Glow Elements */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(230,81,0,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <div className="container">
        <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(35, 20, 10, 0.9) 0%, rgba(20, 30, 22, 0.9) 100%)', border: '1px solid rgba(230,81,0,0.4)', padding: '40px', borderRadius: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }} className="grid-2">
            
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }} className="badge-diwali animate-pulse-glow">
                <Flame size={16} color="#ff9d42" /> GRAND DIWALI FESTIVE OFFER 2026
              </div>

              <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
                Celebrate Diwali at <span style={{ color: '#ff9d42' }}>The Hidden Hedges</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '24px' }}>
                Transform your festival of lights into an unforgettable luxury escape. Enjoy private fireworks, handmade rangoli, gourmet dining, organic champagne, and heated infinity pool views.
              </p>

              {/* Offer Perks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8f6f0', fontSize: '0.9rem' }}>
                  <Gift size={18} color="#ff9d42" /> Private Festive Feast by Chef
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8f6f0', fontSize: '0.9rem' }}>
                  <Sparkles size={18} color="#ff9d42" /> Complimentary Champagne
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8f6f0', fontSize: '0.9rem' }}>
                  <Flame size={18} color="#ff9d42" /> Illumination & Diyas Decor
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8f6f0', fontSize: '0.9rem' }}>
                  <Clock size={18} color="#ff9d42" /> 30% Flat Rate Discount
                </div>
              </div>

              {/* Promo Code Box */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.4)', padding: '14px 20px', borderRadius: '16px', border: '1px dashed rgba(230,81,0,0.5)', marginBottom: '28px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#ff9d42', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Promo Code</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '2px', color: '#ffffff' }}>DIWALI2026</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  style={{
                    marginLeft: 'auto',
                    background: copied ? '#10b981' : 'rgba(230,81,0,0.2)',
                    border: '1px solid rgba(230,81,0,0.5)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <button onClick={handleBookDiwali} className="btn-diwali" style={{ width: '100%', justifyContent: 'center' }}>
                <MessageCircle size={20} />
                <span>Claim Diwali Offer via WhatsApp ({whatsappNumber})</span>
              </button>

            </div>

            {/* Right Visual Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(230,81,0,0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                <img
                  src="/images/diwali.jpg"
                  alt="Diwali Festive Offer The Hidden Hedges"
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block', transform: 'scale(1.02)' }}
                />
              </div>

              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(15,22,17,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-gold)', padding: '12px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Tag size={24} color="#ff9d42" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Special Festive Discount</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>SAVE 30% ON STAY</div>
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
