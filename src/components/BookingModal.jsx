import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, offerCode = 'DIRECT', offerTitle = 'The Hidden Hedges Villa Stay', whatsappNumber = '9816821195' }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('4 Guests (Whole Villa)');
  const [code, setCode] = useState(offerCode);

  useEffect(() => {
    setCode(offerCode);
  }, [offerCode]);

  if (!isOpen) return null;

  const handleConfirmWhatsApp = (e) => {
    e.preventDefault();

    const formattedIn = checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'To be selected';
    const formattedOut = checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'To be selected';

    const msg = `Hello! I would like to check availability for *The Hidden Hedges Villa*.%0A%0A` +
      `🏷️ *Package:* ${offerTitle}%0A` +
      `🎟️ *Offer Code:* ${code || 'DIRECT'}%0A` +
      `📅 *Check-In Date:* ${formattedIn}%0A` +
      `📅 *Check-Out Date:* ${formattedOut}%0A` +
      `👥 *Guests Party:* ${guests}%0A%0A` +
      `Please confirm open dates and reservation details. Thank you!`;

    // Log inquiry to database
    try {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guestsCount: parseInt(guests) || 4,
          offerCode: code,
          message: `Package inquiry: ${offerTitle}`
        })
      });
    } catch (err) {}

    window.open(`https://wa.me/91${whatsappNumber}?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10,15,11,0.85)',
        backdropFilter: 'blur(14px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '32px 28px',
          borderRadius: '24px',
          position: 'relative',
          border: '1px solid var(--gold-primary)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--border-gold)',
            color: '#fff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Sparkles size={14} /> SELECT YOUR DATES
          </span>
          <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800, marginBottom: '6px' }}>
            Reserve Villa Stay
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {offerTitle}
          </p>
        </div>

        <form onSubmit={handleConfirmWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Check-In Date *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15,22,17,0.9)',
                  border: '1px solid var(--border-gold)',
                  color: '#ffffff',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Check-Out Date *
            </label>
            <input
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15,22,17,0.9)',
                border: '1px solid var(--border-gold)',
                color: '#ffffff',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Guests Party Size
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15,22,17,0.9)',
                border: '1px solid var(--border-gold)',
                color: '#ffffff',
                padding: '12px 14px',
                borderRadius: '12px',
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
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#ff9d42', marginBottom: '6px', textTransform: 'uppercase' }}>
              Selected Offer Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                background: 'rgba(230,81,0,0.15)',
                border: '1px solid rgba(230,81,0,0.4)',
                color: '#ff9d42',
                fontWeight: 'bold',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-whatsapp"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '15px',
              fontSize: '0.98rem',
              marginTop: '8px'
            }}
          >
            <MessageCircle size={20} />
            <span>Confirm Dates & Open WhatsApp</span>
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Hotline: +91 {whatsappNumber} | Instant Response Guaranteed
          </div>

        </form>

      </div>
    </div>
  );
};

export default BookingModal;
