import React, { useState, useEffect } from 'react';
import { X, Phone, User, Sparkles, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const LeadCaptureModal = ({ whatsappNumber = '9816821195' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Diwali 30% OFF Offer');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show modal 2.5 seconds after first visit if not dismissed previously
    const hasBeenDismissed = localStorage.getItem('leadModalDismissed');
    if (!hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('leadModalDismissed', 'true');
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);

    try {
      // Post lead to backend database
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName || 'Website Visitor',
          phone: phone,
          offerCode: interest,
          message: `Initial URL Lead Capture - Interest: ${interest}`,
          status: 'New Lead'
        })
      });

      setSubmitted(true);
      localStorage.setItem('leadModalDismissed', 'true');
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNotifyAdminWhatsApp = () => {
    const msg = `Hi! I requested a callback on The Hidden Hedges website.%0A%0A` +
      `👤 *Name:* ${guestName || 'Guest'}%0A` +
      `📞 *Phone:* ${phone}%0A` +
      `🎁 *Interest:* ${interest}%0A%0A` +
      `Please contact me with stay options & Diwali offer rates. Thank you!`;

    window.open(`https://wa.me/91${whatsappNumber}?text=${msg}`, '_blank');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10,15,11,0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel animate-float"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '32px 26px',
          borderRadius: '24px',
          position: 'relative',
          border: '1px solid var(--gold-primary)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
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
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: '#0f1611',
                boxShadow: '0 0 20px rgba(212,175,55,0.4)'
              }}>
                <Sparkles size={26} />
              </div>

              <span className="badge-diwali" style={{ fontSize: '0.72rem', display: 'inline-block', marginBottom: '8px' }}>
                EXCLUSIVELY FOR VISITORS
              </span>

              <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 800, marginBottom: '6px' }}>
                Unlock VIP Villa Deals
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                Enter your phone number to receive instant WhatsApp callback & secret Diwali discount rates.
              </p>
            </div>

            <form onSubmit={handleSubmitLead} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '5px', textTransform: 'uppercase' }}>
                  Your Name (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15,22,17,0.9)',
                      border: '1px solid var(--border-gold)',
                      color: '#ffffff',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  <User size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '5px', textTransform: 'uppercase' }}>
                  Phone / WhatsApp Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9816821195"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15,22,17,0.9)',
                      border: '1px solid var(--border-gold)',
                      color: '#ffffff',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      fontWeight: 'bold'
                    }}
                  />
                  <Phone size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '5px', textTransform: 'uppercase' }}>
                  Interested Experience
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15,22,17,0.9)',
                    border: '1px solid var(--border-gold)',
                    color: '#ffffff',
                    padding: '11px 12px',
                    borderRadius: '12px',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="Diwali 30% OFF Offer">🪔 Diwali 30% OFF Offer (DIWALI2026)</option>
                  <option value="Weekend Getaway Deal">🌿 Weekend Getaway Deal (WEEKEND20)</option>
                  <option value="Couples Romantic Suite">💖 Couples Romantic Suite (ROMANCE25)</option>
                  <option value="Full Villa Group Stay">🏡 Full Villa Group Exclusive Booking</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '0.95rem',
                  marginTop: '6px'
                }}
              >
                <span>{loading ? 'Submitting...' : 'Request Instant Callback'}</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Your contact info is saved directly to estate admin management.
              </div>

            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#10b98122',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '1px solid #10b981'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
              Number Saved Successfully!
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '22px', lineHeight: 1.5 }}>
              Thank you, <strong>{guestName || 'Guest'}</strong>! Your number (<strong>{phone}</strong>) has been stored in our admin portal. Our estate manager will contact you shortly.
            </p>

            <button
              onClick={handleNotifyAdminWhatsApp}
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.92rem' }}
            >
              <MessageCircle size={18} />
              <span>Notify Admin via WhatsApp Now</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeadCaptureModal;
