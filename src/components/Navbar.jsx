import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShieldCheck, Menu, X, Sparkles, Instagram, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenAdmin, whatsappNumber = '9816821195', instagramUrl = 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled
          ? 'rgba(15, 22, 17, 0.95)'
          : 'linear-gradient(180deg, rgba(15,22,17,0.9) 0%, rgba(15,22,17,0.4) 70%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
        padding: scrolled ? '10px 0' : '16px 0'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        
        {/* Brand Logo & Name */}
        <a
          href="#"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: 0,
            flexShrink: 1
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f1611',
              fontWeight: 800,
              fontSize: '1.15rem',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.4)',
              flexShrink: 0
            }}
          >
            H
          </div>
          
          <div style={{ minWidth: 0 }}>
            <span
              className="font-serif brand-title"
              style={{
                fontSize: 'clamp(1rem, 3.8vw, 1.35rem)',
                fontWeight: 800,
                letterSpacing: '0.8px',
                color: '#f8f6f0',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              THE HIDDEN HEDGES
            </span>
            <span
              className="brand-subline"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '1.8px',
                color: 'var(--gold-primary)',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              Private Estate & Villa
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{ display: 'none', gap: '24px', alignItems: 'center' }}
          className="desktop-nav"
        >
          <a href="#overview" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Overview</a>
          <a href="#offers" style={{ color: '#ff9d42', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} /> Diwali Offers
          </a>
          <a href="#suites" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Suites</a>
          <a href="#amenities" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Amenities</a>
          <a href="#instagram-feed" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Instagram</a>
          <a href="#location" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Map Location</a>
        </nav>

        {/* Action Buttons Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* Desktop Only Instagram Button */}
          <button
            onClick={handleInstagram}
            className="desktop-only-btn"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--gold-light)',
              padding: '8px 14px',
              borderRadius: '50px',
              cursor: 'pointer',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            title="Follow on Instagram @thehiddenhedges"
          >
            <Instagram size={16} />
            <span>Instagram</span>
          </button>

          {/* Desktop Only Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="desktop-only-btn"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--text-muted)',
              padding: '8px 14px',
              borderRadius: '50px',
              cursor: 'pointer',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
            title="Admin Portal Login"
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>

          {/* Book Now WhatsApp Button (Responsive) */}
          <button
            onClick={handleWhatsApp}
            className="btn-whatsapp nav-book-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <MessageCircle size={17} />
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border-gold)',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '7px 10px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4px',
              flexShrink: 0
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} color="var(--gold-light)" /> : <Menu size={22} color="var(--gold-light)" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: '12px',
            right: '12px',
            marginTop: '8px',
            background: 'rgba(15, 22, 17, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--gold-primary)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            zIndex: 1001,
            animation: 'fadeInDown 0.3s ease'
          }}
        >
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)' }}
          >
            <span>Villa Overview</span>
            <ChevronRight size={16} color="var(--gold-primary)" />
          </a>

          <a
            href="#offers"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ff9d42', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 700, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(230,81,0,0.15)', border: '1px solid rgba(230,81,0,0.3)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} /> Diwali & Special Offers
            </span>
            <ChevronRight size={16} color="#ff9d42" />
          </a>

          <a
            href="#suites"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)' }}
          >
            <span>Suites & Bedroom Spaces</span>
            <ChevronRight size={16} color="var(--gold-primary)" />
          </a>

          <a
            href="#amenities"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)' }}
          >
            <span>Amenities & Experiences</span>
            <ChevronRight size={16} color="var(--gold-primary)" />
          </a>

          <a
            href="#instagram-feed"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Instagram size={16} color="#ff7b7b" /> Instagram Feed
            </span>
            <ChevronRight size={16} color="var(--gold-primary)" />
          </a>

          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)' }}
          >
            <span>Map & Google Location</span>
            <ChevronRight size={16} color="var(--gold-primary)" />
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); handleInstagram(); }}
              className="btn-outline"
              style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
            >
              <Instagram size={16} /> Instagram
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="btn-outline"
              style={{ justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
            >
              <ShieldCheck size={16} /> Admin Login
            </button>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); handleWhatsApp(); }}
            className="btn-whatsapp"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '0.92rem' }}
          >
            <MessageCircle size={18} />
            <span>Direct WhatsApp Booking ({whatsappNumber})</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
          .desktop-only-btn { display: inline-flex !important; }
          .brand-subline { display: block !important; }
        }
        @media (max-width: 959px) {
          .desktop-nav { display: none !important; }
          .desktop-only-btn { display: none !important; }
        }
        @media (max-width: 580px) {
          .brand-subline { display: none !important; }
          .nav-book-btn span { font-size: 0.8rem; }
        }
        @media (max-width: 400px) {
          .nav-book-btn { padding: 6px 12px !important; }
          .nav-book-btn span { display: none; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
