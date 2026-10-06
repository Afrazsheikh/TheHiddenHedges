import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageCircle, Sparkles, ChevronRight, Award, ShieldCheck } from 'lucide-react';

const heroImages = [
  '/images/hero.jpg',
  '/images/diwali.jpg',
  '/images/bedroom.jpg',
  '/images/dining.jpg'
];

const HeroSection = ({ whatsappNumber = '9816821195', offers = [], onOpenBookingModal }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroBookClick = (e) => {
    e.preventDefault();
    if (onOpenBookingModal) {
      onOpenBookingModal('DIRECT', 'The Hidden Hedges Luxury Villa Stay');
    } else {
      window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hi! I would like to inquire about booking a stay at The Hidden Hedges Villa.')}`, '_blank');
    }
  };

  return (
    <section id="overview" style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '90px', paddingBottom: '50px', overflow: 'hidden' }}>
      
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
          background: 'linear-gradient(180deg, rgba(15,22,17,0.7) 0%, rgba(15,22,17,0.85) 65%, rgba(15,22,17,1) 100%)',
          zIndex: 2
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-block', marginBottom: '14px' }}>
            <span className="badge-diwali animate-pulse-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
              <Sparkles size={13} /> EXCLUSIVE DIWALI & FESTIVE OFFERS AVAILABLE
            </span>
          </div>

          {/* Title - Refined Modern Scale */}
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', color: '#ffffff' }}>
            Where Nature Meets <span className="text-gold-gradient">Unrivaled Luxury</span>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            A secluded private mountain estate featuring heated infinity pool, master bedroom suites, gourmet private chef, and starlight patio dining.
          </p>

          {/* Key Specs Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '18px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
              <Award size={16} color="var(--gold-primary)" /> 5 Bedroom Luxury Suites
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
              <Award size={16} color="var(--gold-primary)" /> Heated Infinity Pool
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
              <Award size={16} color="var(--gold-primary)" /> 100% Private Estate
            </div>
          </div>

          {/* Primary Action Button */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={handleHeroBookClick} className="btn-whatsapp" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              <Calendar size={18} />
              <span>Check Dates & Book via WhatsApp (+91 {whatsappNumber})</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
