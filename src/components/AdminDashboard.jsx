import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Check, X, ShieldCheck, Tag, Sparkles, Phone, MessageCircle, BarChart3, Globe, Search, RefreshCw, Flame, ExternalLink, Upload, Image as ImageIcon, UserCheck } from 'lucide-react';

const AdminDashboard = ({ token, onClose, onRefreshOffers, settings = {}, onRefreshSettings }) => {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [offersList, setOffersList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Upload state
  const [uploadSlot, setUploadSlot] = useState('hero');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Offer Form State
  const [offerForm, setOfferForm] = useState({
    title: '',
    subtitle: '',
    code: '',
    discount: '30% OFF',
    category: 'Festive Special',
    validity: 'Valid for Diwali',
    image: '/images/diwali.jpg',
    description: '',
    perks: 'Gourmet Festive Feast, Vintage Champagne, Fireworks Lighting',
    isFeatured: true,
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  // Settings Form State
  const [siteSettings, setSiteSettings] = useState({
    whatsappNumber: settings.whatsappNumber || '9816821195',
    instagramUrl: settings.instagramUrl || 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==',
    villaName: settings.villaName || 'The Hidden Hedges',
    metaTitle: settings.metaTitle || 'The Hidden Hedges | Premium Luxury Villa & Private Estate',
    metaDescription: settings.metaDescription || 'Experience secluded ultra-luxury at The Hidden Hedges. Private heated infinity pool, gourmet dining by chef, festive Diwali packages & mountain views.',
    keywords: settings.keywords || 'luxury villa, private pool villa, Diwali offer villa, weekend getaway, holiday stay, The Hidden Hedges',
    googleMapsRedirectUrl: settings.googleMapsRedirectUrl || 'https://maps.google.com/?q=The+Hidden+Hedges+Villa',
    pricePerNight: settings.pricePerNight || '₹24,999'
  });

  useEffect(() => {
    fetchOffers();
    fetchInquiries();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers');
      const data = await res.json();
      setOffersList(data);
    } catch (err) {}
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setInquiriesList(data);
    } catch (err) {}
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMsg({ type: 'error', text: 'Please choose an image file to upload' });
      return;
    }

    setUploading(true);
    setMsg({ type: '', text: '' });

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('targetSlot', uploadSlot);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg({ type: 'success', text: `Success! ${data.message} The website visual has been updated without file bloat.` });
        setSelectedFile(null);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMsg({ type: 'error', text: data.message || 'Upload failed' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Error uploading image: ' + err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    const perksArray = typeof offerForm.perks === 'string'
      ? offerForm.perks.split(',').map(p => p.trim()).filter(Boolean)
      : offerForm.perks;

    const payload = {
      ...offerForm,
      perks: perksArray
    };

    try {
      const url = editingId ? `/api/offers/${editingId}` : '/api/offers';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMsg({ type: 'success', text: editingId ? 'Offer updated successfully!' : 'New offer published live!' });
        resetForm();
        fetchOffers();
        onRefreshOffers();
      } else {
        const d = await res.json();
        setMsg({ type: 'error', text: d.message || 'Failed to save offer' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditOffer = (offer) => {
    setEditingId(offer._id);
    setOfferForm({
      title: offer.title || '',
      subtitle: offer.subtitle || '',
      code: offer.code || '',
      discount: offer.discount || '20% OFF',
      category: offer.category || 'Special Offer',
      validity: offer.validity || '',
      image: offer.image || '/images/diwali.jpg',
      description: offer.description || '',
      perks: Array.isArray(offer.perks) ? offer.perks.join(', ') : offer.perks,
      isFeatured: !!offer.isFeatured,
      isActive: !!offer.isActive
    });
    setActiveTab('offers');
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMsg({ type: 'success', text: 'Offer deleted successfully' });
        fetchOffers();
        onRefreshOffers();
      }
    } catch (err) {}
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      });
      if (res.ok) {
        setMsg({ type: 'success', text: 'Digital Marketing & Estate Settings updated live!' });
        if (onRefreshSettings) onRefreshSettings();
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update settings' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setOfferForm({
      title: '',
      subtitle: '',
      code: '',
      discount: '25% OFF',
      category: 'Festive Special',
      validity: 'Limited Time',
      image: '/images/diwali.jpg',
      description: '',
      perks: '',
      isFeatured: false,
      isActive: true
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10,15,11,0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 10000,
        overflowY: 'auto',
        padding: '30px 20px'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header Bar */}
        <div className="glass-panel" style={{ padding: '20px 28px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'var(--gold-gradient)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f1611' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                The Hidden Hedges - Admin Control Panel
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                MongoDB Atlas Connected | User: munaazpro_db_user | Hotline: 9816821195
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-outline"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <X size={18} />
            <span>Close Admin Panel</span>
          </button>
        </div>

        {/* Status Toast Message */}
        {msg.text && (
          <div style={{
            background: msg.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${msg.type === 'success' ? '#10b981' : '#ef4444'}`,
            color: msg.type === 'success' ? '#34d399' : '#f87171',
            padding: '14px 20px',
            borderRadius: '14px',
            marginBottom: '24px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{msg.text}</span>
            <X size={18} style={{ cursor: 'pointer' }} onClick={() => setMsg({ type: '', text: '' })} />
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              background: activeTab === 'inquiries' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'inquiries' ? '#0f1611' : 'var(--text-main)',
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <Phone size={18} /> Captured Visitor Phone Numbers ({inquiriesList.length})
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            style={{
              background: activeTab === 'offers' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'offers' ? '#0f1611' : 'var(--text-main)',
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <Flame size={18} /> Manage Offers ({offersList.length})
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            style={{
              background: activeTab === 'upload' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'upload' ? '#0f1611' : 'var(--text-main)',
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <ImageIcon size={18} /> Upload Real Photos (Zero-Bloat)
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            style={{
              background: activeTab === 'seo' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'seo' ? '#0f1611' : 'var(--text-main)',
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <Globe size={18} /> SEO & Digital Marketing
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              background: activeTab === 'settings' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'settings' ? '#0f1611' : 'var(--text-main)',
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <Phone size={18} /> Estate Hotline Settings
          </button>
        </div>

        {/* TAB 1: CAPTURED VISITOR PHONE NUMBERS & INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800 }}>
                  Captured Visitor Phone Numbers & Lead Enquiries
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                  Real-time list of phone numbers captured from initial URL visits & WhatsApp booking clicks.
                </p>
              </div>

              <button onClick={fetchInquiries} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-gold)', color: 'var(--gold-light)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} /> Refresh Leads
              </button>
            </div>

            {inquiriesList.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', padding: '20px 0' }}>No captured leads yet. When visitors open the URL and submit their phone number, they will instantly appear here.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-gold)', color: 'var(--gold-light)' }}>
                      <th style={{ padding: '12px' }}>Timestamp</th>
                      <th style={{ padding: '12px' }}>Visitor Name</th>
                      <th style={{ padding: '12px' }}>Captured Phone Number</th>
                      <th style={{ padding: '12px' }}>Offer / Interest</th>
                      <th style={{ padding: '12px' }}>Lead Source</th>
                      <th style={{ padding: '12px' }}>Direct Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiriesList.map((inq) => (
                      <tr key={inq._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px', color: 'var(--text-dim)' }}>
                          {new Date(inq.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px', color: '#ffffff', fontWeight: 700 }}>
                          {inq.guestName || 'Website Visitor'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.5px' }}>
                            {inq.phone || 'WhatsApp Click'}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge-gold" style={{ fontSize: '0.75rem' }}>
                            {inq.offerCode || 'DIWALI2026'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          {inq.message || 'URL First Visit Lead'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {inq.phone ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <a
                                href={`tel:${inq.phone}`}
                                style={{ background: 'var(--gold-gradient)', color: '#0f1611', padding: '6px 12px', borderRadius: '16px', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Phone size={12} /> Call
                              </a>
                              <a
                                href={`https://wa.me/91${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! Thank you for requesting info about The Hidden Hedges Villa. How can we assist with your stay dates?')}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ background: '#25D366', color: '#fff', padding: '6px 12px', borderRadius: '16px', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <MessageCircle size={12} /> WhatsApp
                              </a>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>Direct Click Logged</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE OFFERS */}
        {activeTab === 'offers' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' }} className="grid-2">
            
            {/* Form Column */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 700 }}>
                  {editingId ? 'Edit Offer Details' : 'Post New Diwali or Special Offer'}
                </h3>
                {editingId && (
                  <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: '#ff9d42', fontSize: '0.8rem', cursor: 'pointer' }}>
                    + Cancel Edit Mode
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveOffer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                    Offer Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Diwali Festive Luxury Retreat"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    required
                    style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                      Promo Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DIWALI2026"
                      value={offerForm.code}
                      onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                      required
                      style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', fontWeight: 'bold' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                      Discount Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30% OFF"
                      value={offerForm.discount}
                      onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                      required
                      style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                      Category
                    </label>
                    <select
                      value={offerForm.category}
                      onChange={(e) => setOfferForm({ ...offerForm, category: e.target.value })}
                      style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                    >
                      <option value="Festive Special">Festive Special (Diwali)</option>
                      <option value="Weekend Deal">Weekend Deal</option>
                      <option value="Couples & Honeymoon">Couples & Honeymoon</option>
                      <option value="Early Bird">Early Bird Special</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                      Banner Image URL / Slot
                    </label>
                    <select
                      value={offerForm.image}
                      onChange={(e) => setOfferForm({ ...offerForm, image: e.target.value })}
                      style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                    >
                      <option value="/images/diwali.jpg">🪔 Festive Diwali Decor Image</option>
                      <option value="/images/hero.jpg">🌲 Luxury Villa & Pool Image</option>
                      <option value="/images/bedroom.jpg">🛏️ Penthouse Master Suite</option>
                      <option value="/images/dining.jpg">🍷 Starlight Dining Terrace</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the offer experience, dining inclusions, and stay privileges..."
                    value={offerForm.description}
                    onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    required
                    style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '4px' }}>
                    Included Perks (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Gourmet Festive Feast, Champagne Bottle, Fireworks Lighting"
                    value={offerForm.perks}
                    onChange={(e) => setOfferForm({ ...offerForm, perks: e.target.value })}
                    style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px', margin: '6px 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={offerForm.isFeatured}
                      onChange={(e) => setOfferForm({ ...offerForm, isFeatured: e.target.checked })}
                    />
                    <span>Highlight as Featured Offer</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={offerForm.isActive}
                      onChange={(e) => setOfferForm({ ...offerForm, isActive: e.target.checked })}
                    />
                    <span>Active Live on Website</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}
                >
                  <Plus size={18} />
                  <span>{loading ? 'Publishing...' : editingId ? 'Update Offer' : 'Publish Offer Live'}</span>
                </button>

              </form>
            </div>

            {/* Existing Offers List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 700 }}>
                  Active Live Offers ({offersList.length})
                </h3>
                <button onClick={fetchOffers} style={{ background: 'transparent', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                  <RefreshCw size={14} /> Refresh List
                </button>
              </div>

              {offersList.map((offer) => (
                <div key={offer._id} className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={offer.image || '/images/diwali.jpg'}
                    alt={offer.title}
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(230,81,0,0.2)', color: '#ff9d42', padding: '2px 8px', borderRadius: '10px' }}>
                        {offer.code}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>
                        {offer.discount}
                      </span>
                    </div>

                    <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>
                      {offer.title}
                    </h4>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {offer.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => handleEditOffer(offer)}
                      style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', color: 'var(--gold-light)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer._id)}
                      style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: UPLOAD REAL VILLA PHOTOS */}
        {activeTab === 'upload' && (
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
            <div style={{ maxWidth: '750px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
                  REAL IMAGE UPLOADER & REPLACER
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, marginBottom: '10px' }}>
                  Replace Existing Website Images
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Upload your actual villa photos from your computer. Overwrites target slots directly without accumulating storage bloat!
                </p>
              </div>

              <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '28px', borderRadius: '20px', border: '1px solid var(--border-gold)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Select Image Slot to Overwrite
                  </label>
                  <select
                    value={uploadSlot}
                    onChange={(e) => setUploadSlot(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,22,17,0.9)', border: '1px solid var(--border-gold)', color: '#ffffff', padding: '12px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
                  >
                    <option value="hero">📸 Hero Main Background (Replaces /images/hero.jpg)</option>
                    <option value="diwali">🪔 Festive Diwali Banner (Replaces /images/diwali.jpg)</option>
                    <option value="bedroom">🛏️ Penthouse Suite Bedroom (Replaces /images/bedroom.jpg)</option>
                    <option value="dining">🍷 Starlight Dining Terrace (Replaces /images/dining.jpg)</option>
                    <option value="custom">🖼️ New Custom Villa Photo (Generates clean named file)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Choose Photo File from Computer
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    style={{
                      width: '100%',
                      background: 'rgba(15,22,17,0.9)',
                      border: '1px dashed var(--border-gold)',
                      color: '#ffffff',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  />
                  {selectedFile && (
                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                      ✓ Selected File: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem', marginTop: '10px' }}
                >
                  <Upload size={20} />
                  <span>{uploading ? 'Replacing Image...' : 'Upload & Overwrite Target Slot'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: SEO & MARKETING */}
        {activeTab === 'seo' && (
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '16px' }}>
              Digital Marketing & Search Engine Optimization (SEO)
            </h3>
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '6px' }}>
                  Meta Title (Google Search Title)
                </label>
                <input
                  type="text"
                  value={siteSettings.metaTitle}
                  onChange={(e) => setSiteSettings({ ...siteSettings, metaTitle: e.target.value })}
                  style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '12px', borderRadius: '10px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '6px' }}>
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={siteSettings.metaDescription}
                  onChange={(e) => setSiteSettings({ ...siteSettings, metaDescription: e.target.value })}
                  style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '12px', borderRadius: '10px' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '14px', justifyContent: 'center' }}>
                <Globe size={18} />
                <span>Save Digital Marketing & SEO Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: ESTATE HOTLINE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '16px' }}>
              Estate Contact & Hotline Settings
            </h3>
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '6px' }}>
                    WhatsApp Hotline Number
                  </label>
                  <input
                    type="text"
                    value={siteSettings.whatsappNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                    style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '12px', borderRadius: '10px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '6px' }}>
                    Base Nightly Rate Display
                  </label>
                  <input
                    type="text"
                    value={siteSettings.pricePerNight}
                    onChange={(e) => setSiteSettings({ ...siteSettings, pricePerNight: e.target.value })}
                    style={{ width: '100%', background: 'rgba(15,22,17,0.8)', border: '1px solid var(--border-gold)', color: '#fff', padding: '12px', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '14px', justifyContent: 'center' }}>
                <Phone size={18} />
                <span>Save Estate Contact Settings</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
