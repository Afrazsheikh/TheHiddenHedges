import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageCircle, Sparkles, ChevronRight, Award, ShieldCheck } from 'lucide-react';

const heroImages = [
  '/images/hero.jpg',
  '/images/diwali.jpg',
  '/images/bedroom.jpg',
  '/images/dining.jpg'
];

const HeroSection = ({ whatsappNumber, offers = [] }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('4 Guests (Whole Villa)');
  const [selectedOffer, setSelectedOffer] = useState('DIWALI2026');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchBook = async (e) => {
    e.preventDefault();
    const msg = `Hello! I would like to check availability for *The Hidden Hedges Villa*.%0A%0A` +
      `📅 *Check-In:* ${checkIn || 'To be confirmed'}%0A` +
      `📅 *Check-Out:* ${checkOut || 'To be confirmed'}%0A` +
      `👥 *Guests:* ${guests}%0A` +
      `🎁 *Offer Code:* ${selectedOffer}%0A%0A` +
      `Please confirm rate & reservation details. Thank you!`;

    // Fire & forget inquiry log to backend database
    try {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guestsCount: parseInt(guests) || 4,
          offerCode: selectedOffer,
          message: 'Direct Hero Reservation Search'
        })
      });
    } catch (err) {}

    window.open(`https://wa.me/91${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="overview" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '60px', overflow: 'hidden' }}>
      
      {/* Background Image Carousel Slider */}
      {heroImages.map((img, idx) => (
        <div
          key={img}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === currentImgIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 1
          }}
        />
      ))}

      {/* Dark Luxury Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(15,22,17,0.75) 0%, rgba(15,22,17,0.85) 60%, rgba(15,22,17,1) 100%)',
          zIndex: 2
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <span className="badge-diwali animate-pulse-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={14} /> EXCLUSIVE DIWALI & FESTIVE OFFERS AVAILABLE
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: '#ffffff' }}>
            Where Nature Meets <span className="text-gold-gradient">Unrivaled Luxury</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '36px', maxWidth: '680px', margin: '0 auto 36px' }}>
            A secluded private mountain estate featuring heated infinity pool, master bedroom suites, gourmet private chef, and starlight patio dining.
          </p>

          {/* Key Specs Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
              <Award size={18} color="var(--gold-primary)" /> 5 Bedroom Luxury Suites
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
              <Award size={18} color="var(--gold-primary)" /> Heated Infinity Pool
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
              <Award size={18} color="var(--gold-primary)" /> 100% Private Estate
            </div>
          </div>

          {/* Reservation Box */}
          <div className="glass-panel" style={{ padding: '28px', textAlign: 'left' }}>
            <form onSubmit={handleSearchBook} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Check-In Date
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15,22,17,0.7)',
                      border: '1px solid var(--border-gold)',
                      color: '#ffffff',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15,22,17,0.7)',
                    border: '1px solid var(--border-gold)',
                    color: '#ffffff',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Guests & Party
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15,22,17,0.7)',
                    border: '1px solid var(--border-gold)',
                    color: '#ffffff',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="2 Guests (Couples Suite)">2 Guests (Couples Suite)</option>
                  <option value="4 Guests (Family Suite)">4 Guests (Family Suite)</option>
                  <option value="6-8 Guests (Half Villa)">6-8 Guests (Half Villa)</option>
                  <option value="10-14 Guests (Full Villa Exclusive)">10-14 Guests (Full Villa Exclusive)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#ff9d42', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Select Special Offer
                </label>
                <select
                  value={selectedOffer}
                  onChange={(e) => setSelectedOffer(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(230,81,0,0.15)',
                    border: '1px solid rgba(230,81,0,0.5)',
                    color: '#ff9d42',
                    fontWeight: 'bold',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="DIWALI2026">🪔 DIWALI2026 (30% OFF Festive Deal)</option>
                  <option value="WEEKEND20">🌿 WEEKEND20 (20% OFF Sanctuary)</option>
                  <option value="ROMANCE25">💖 ROMANCE25 (25% OFF Couples)</option>
                  <option value="DIRECT">Direct Booking (Best Price Guarantee)</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '6px' }}>
                <button type="submit" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}>
                  <MessageCircle size={22} />
                  <span>Book via WhatsApp ({whatsappNumber})</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
