import React from 'react';
import { MessageCircle, Phone, Flame, Instagram, Calendar } from 'lucide-react';

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
      {/* Desktop & Tablet Floating Group (Bottom Right) */}
      <div className="floating-action-container">
        
        {/* Desktop Only Diwali Offer Floating Pill */}
        <div
          onClick={() => onOpenBookingModal ? onOpenBookingModal('DIWALI2026', 'Grand Diwali Festive Package') : handleWhatsApp()}
          className="glass-panel animate-float desktop-floating-pill"
          style={{
            background: 'linear-gradient(135deg, rgba(230,81,0,0.95) 0%, rgba(15,22,17,0.95) 100%)',
            border: '1px solid #ff9d42',
            padding: '8px 16px',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(230,81,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <Flame size={16} color="#fff" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>DIWALI OFFER: 30% OFF</div>
            <div style={{ fontSize: '0.65rem', color: '#ffdfb3' }}>Tap to select dates & claim DIWALI2026</div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="floating-buttons-row">
          
          {/* Instagram Button */}
          <button
            onClick={handleInstagram}
            className="action-circle-btn"
            style={{
              background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              color: '#ffffff'
            }}
            title="Instagram @thehiddenhedges"
          >
            <Instagram size={20} />
          </button>

          {/* Phone Call Button */}
          <button
            onClick={handleCall}
            className="action-circle-btn"
            style={{
              background: 'var(--gold-gradient)',
              color: '#0f1611'
            }}
            title="Call Management Direct"
          >
            <Phone size={20} />
          </button>

          {/* WhatsApp Main Button */}
          <button
            onClick={handleWhatsApp}
            className="btn-whatsapp action-main-btn"
          >
            <MessageCircle size={20} />
            <span>Select Dates & Book</span>
          </button>

        </div>

      </div>

      <style>{`
        .floating-action-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .floating-buttons-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-circle-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .action-circle-btn:hover {
          transform: scale(1.1);
        }

        .action-main-btn {
          height: 48px;
          padding: 0 20px;
          font-size: 0.88rem;
          font-weight: 800;
        }

        /* Mobile Viewport Sleek Bottom Dock Optimization */
        @media (max-width: 768px) {
          .desktop-floating-pill {
            display: none !important;
          }

          .floating-action-container {
            bottom: 12px;
            left: 12px;
            right: 12px;
            align-items: center;
          }

          .floating-buttons-row {
            width: 100%;
            background: rgba(15, 22, 17, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-gold);
            padding: 8px 12px;
            border-radius: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
            justify-content: space-between;
          }

          .action-circle-btn {
            width: 42px;
            height: 42px;
          }

          .action-main-btn {
            height: 42px;
            flex: 1;
            justify-content: center;
            padding: 0 14px;
            font-size: 0.84rem;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloat;
