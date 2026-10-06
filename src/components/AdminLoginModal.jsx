import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('munaazpro_db_user');
  const [password, setPassword] = useState('THB6KY2Ce2bPcjmC');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        onLoginSuccess(data.token);
        onClose();
      } else {
        setError(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Connection error. Please check backend server.');
    } finally {
      setLoading(false);
    }
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
        backdropFilter: 'blur(12px)',
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
          maxWidth: '440px',
          width: '100%',
          padding: '36px',
          borderRadius: '24px',
          position: 'relative',
          border: '1px solid var(--gold-primary)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#0f1611'
          }}>
            <ShieldCheck size={32} />
          </div>

          <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800 }}>
            Admin Portal Access
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Manage Diwali offers, bookings, SEO tags & estate details.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '12px 16px', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15,22,17,0.8)',
                  border: '1px solid var(--border-gold)',
                  color: '#ffffff',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <User size={18} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15,22,17,0.8)',
                  border: '1px solid var(--border-gold)',
                  color: '#ffffff',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Lock size={18} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}
          >
            {loading ? 'Authenticating...' : 'Login to Admin Panel'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            Pre-configured for <strong>munaazpro_db_user</strong>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AdminLoginModal;
