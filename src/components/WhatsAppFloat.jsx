import React from 'react';
import { MessageCircle, Phone, Flame, Sparkles, Instagram } from 'lucide-react';

const WhatsAppFloat = ({ whatsappNumber = '9816821195', instagramUrl = 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==', onOpenBookingModal }) => {
  const handleWhatsApp = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal('DIRECT', 'The Hidden Hedges Villa Stay');
    } else {
      const url = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hi! I am visiting The Hidden Hedges website and would like to inquire about booking availability and Diwali offers.')}`;
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    window.open(`tel:+91${whatsappNumber}`, '_self');
  };

  const handleInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Bar for Mobile & Quick Action Pill */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px'
        }}
      >
        {/* Diwali Special Offer Floating Pill */}
        <div
          onClick={() => onOpenBookingModal ? onOpenBookingModal('DIWALI2026', 'Grand Diwali Festive Package') : handleWhatsApp()}
          className="glass-panel animate-float"
          style={{
            background: 'linear-gradient(135deg, rgba(230,81,0,0.95) 0%, rgba(15,22,17,0.95) 100%)',
            border: '1px solid #ff9d42',
            padding: '10px 18px',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(230,81,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '300px'
          }}
        >
          <Flame size={18} color="#fff" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>DIWALI OFFER: 30% OFF</div>
            <div style={{ fontSize: '0.68rem', color: '#ffdfb3' }}>Tap to select dates & claim DIWALI2026</div>
          </div>
        </div>

        {/* WhatsApp, Call & Instagram Buttons Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Instagram Button */}
          <button
            onClick={handleInstagram}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(253,29,29,0.4)',
              transition: 'transform 0.3s ease'
            }}
            title="Follow @thehiddenhedges on Instagram"
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Instagram size={21} />
          </button>

          {/* Phone Call Button */}
          <button
            onClick={handleCall}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              color: '#0f1611',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
              transition: 'transform 0.3s ease'
            }}
            title="Call Villa Management Direct"
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Phone size={21} />
          </button>

          {/* WhatsApp Main Button */}
          <button
            onClick={handleWhatsApp}
            style={{
              height: '50px',
              padding: '0 20px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.88rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 25px rgba(37,211,102,0.5)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={22} />
            <span>Book Now ({whatsappNumber})</span>
          </button>

        </div>

      </div>
    </>
  );
};

export default WhatsAppFloat;
