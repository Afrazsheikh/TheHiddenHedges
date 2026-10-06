import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Heart, Sparkles, ExternalLink, Instagram } from 'lucide-react';

const Footer = ({ onOpenAdmin, whatsappNumber = '9816821195', instagramUrl = 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==', settings = {} }) => {
  const gmapsRedirect = settings.googleMapsRedirectUrl || 'https://maps.google.com/?q=The+Hidden+Hedges+Villa';

  return (
    <footer style={{ background: '#0a0f0b', color: 'var(--text-muted)', borderTop: '1px solid var(--border-gold)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '60px' }} className="grid-4">
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f1611',
                fontWeight: 'bold'
              }}>
                H
              </div>
              <span className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', letterSpacing: '1px' }}>
                THE HIDDEN HEDGES
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              A secluded ultra-luxury private estate featuring heated infinity pool, 5 master bedroom suites, gourmet private chef, and Diwali festival packages.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
              <a
                href={`https://wa.me/91${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(37,211,102,0.15)',
                  border: '1px solid rgba(37,211,102,0.4)',
                  color: '#25D366',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MessageCircle size={16} /> WhatsApp: {whatsappNumber}
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(253,29,29,0.15)',
                  border: '1px solid rgba(253,29,29,0.4)',
                  color: '#ff7b7b',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Instagram size={16} /> @thehiddenhedges
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '20px' }}>Estate Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#overview" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Villa Overview</a>
              <a href="#offers" style={{ color: '#ff9d42', textDecoration: 'none', fontWeight: 600 }}>Diwali & Festive Offers</a>
              <a href="#suites" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Suites & Bedrooms</a>
              <a href="#amenities" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Luxury Amenities</a>
              <a href="#instagram-feed" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Instagram Feed</a>
              <a href="#location" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Location & Directions</a>
            </div>
          </div>

          {/* Digital Marketing SEO Tags */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '20px' }}>Marketing Tags</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Luxury Villa Stay</span>
              <span className="badge-diwali" style={{ fontSize: '0.7rem' }}>Diwali Package</span>
              <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Private Pool Villa</span>
              <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Weekend Getaway</span>
              <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Honeymoon Suite</span>
              <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Estate Booking</span>
            </div>
          </div>

          {/* Admin & Location Direct */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '20px' }}>Location & Management</h4>
            <p style={{ fontSize: '0.88rem', marginBottom: '14px', color: 'var(--text-muted)' }}>
              Pine Ridge Valley, Himachal Pradesh, India
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={gmapsRedirect}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--gold-light)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MapPin size={16} /> Open in Google Maps <ExternalLink size={14} />
              </a>

              <button
                onClick={onOpenAdmin}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '10px'
                }}
              >
                <ShieldCheck size={16} /> Admin Portal Login (munaazpro_db_user)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '30px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          <div>
            © {new Date().getFullYear()} The Hidden Hedges. All Rights Reserved. Designed for Ultimate Luxury.
          </div>
          <div>
            WhatsApp Direct Booking Hotline: <strong style={{ color: '#25D366' }}>+91 {whatsappNumber}</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
