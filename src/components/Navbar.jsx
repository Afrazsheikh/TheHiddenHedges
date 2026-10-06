import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShieldCheck, Menu, X, Sparkles, Instagram } from 'lucide-react';

const Navbar = ({ onOpenAdmin, whatsappNumber = '9816821195', instagramUrl = 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const url = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hi! I would like to inquire about booking a stay at The Hidden Hedges Villa.')}`;
    window.open(url, '_blank');
  };

  const handleInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(15, 22, 17, 0.92)' : 'linear-gradient(to bottom, rgba(15,22,17,0.85), transparent)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '20px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f1611',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
          }}>
            H
          </div>
          <div>
            <span className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '1px', color: '#f8f6f0', display: 'block' }}>
              THE HIDDEN HEDGES
            </span>
            <span style={{ fontSize: '0.68rem', letterSpacing: '2px', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'block' }}>
              Private Villa & Estate
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '26px', alignItems: 'center' }} className="desktop-nav">
          <a href="#overview" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Overview</a>
          <a href="#offers" style={{ color: '#ff9d42', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} /> Diwali Offers
          </a>
          <a href="#suites" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Suites</a>
          <a href="#amenities" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Amenities</a>
          <a href="#instagram-feed" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Instagram</a>
          <a href="#location" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Map Location</a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button
            onClick={handleInstagram}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--gold-light)',
              padding: '10px 14px',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            title="Follow on Instagram @thehiddenhedges"
          >
            <Instagram size={16} />
            <span className="desktop-only">Instagram</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="btn-whatsapp"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <MessageCircle size={18} />
            <span>Book Now</span>
          </button>

          <button
            onClick={onOpenAdmin}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--text-muted)',
              padding: '10px 14px',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            title="Admin Login"
          >
            <ShieldCheck size={16} />
            <span className="desktop-only">Admin</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-gold)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <a href="#overview" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Villa Overview</a>
          <a href="#offers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ff9d42', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Diwali & Festive Offers</a>
          <a href="#suites" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Suites & Bedrooms</a>
          <a href="#amenities" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Amenities & Experiences</a>
          <a href="#instagram-feed" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Instagram Feed (@thehiddenhedges)</a>
          <a href="#location" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Map & Directions</a>
          
          <button onClick={handleInstagram} className="btn-outline" style={{ justifyContent: 'center' }}>
            <Instagram size={18} /> Follow Instagram (@thehiddenhedges)
          </button>
          
          <button onClick={handleWhatsApp} className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
            <MessageCircle size={18} /> Direct WhatsApp Booking ({whatsappNumber})
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .desktop-only { display: inline !important; }
        }
        @media (max-width: 899px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
