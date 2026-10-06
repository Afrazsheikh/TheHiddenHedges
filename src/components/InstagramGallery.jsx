import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Sparkles } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: '/images/hero.jpg',
    likes: '1,420',
    comments: '86',
    caption: 'Twilight serenity at The Hidden Hedges. The heated pool reflecting mountain skies... ✨ #thehiddenhedges #luxuryvilla'
  },
  {
    id: 2,
    image: '/images/diwali.jpg',
    likes: '2,150',
    comments: '124',
    caption: 'Diwali preparations in full bloom! Traditional rangoli, brass diyas & champagne by the lawn 🪔🍾 #diwali2026 #festivegetaway'
  },
  {
    id: 3,
    image: '/images/bedroom.jpg',
    likes: '1,890',
    comments: '92',
    caption: 'Good morning from the Royal Master Penthouse. Waking up above the misty clouds 🌲☁️ #mountainvilla #luxurytravel'
  },
  {
    id: 4,
    image: '/images/dining.jpg',
    likes: '1,630',
    comments: '75',
    caption: 'Candlelight outdoor banquet prepared by our private estate chef under starlight canopy 🍷🍽️ #privatechef #estateexperience'
  }
];

const InstagramGallery = ({ instagramUrl = 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==' }) => {
  const handleFollowInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <section id="instagram-feed" style={{ padding: '90px 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, #162019 100%)', borderTop: '1px solid var(--border-gold)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Instagram size={14} /> INSTAGRAM REAL MOMENTS
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Experience <span className="text-gold-gradient">@thehiddenhedges</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>
            Tag us in your villa memories or follow our live stories on Instagram for real guest stays and seasonal updates.
          </p>

          <button
            onClick={handleFollowInstagram}
            style={{
              background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
              color: '#ffffff',
              fontWeight: 800,
              padding: '12px 26px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.92rem',
              boxShadow: '0 4px 20px rgba(253,29,29,0.4)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Instagram size={20} />
            <span>Follow @thehiddenhedges on Instagram</span>
            <ExternalLink size={16} />
          </button>
        </div>

        {/* Instagram Grid */}
        <div className="grid-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              onClick={handleFollowInstagram}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt="The Hidden Hedges Instagram"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Overlay on hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(15,22,17,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  color: '#ffffff',
                  fontWeight: 700,
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart size={18} fill="#ff4b4b" color="#ff4b4b" /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={18} /> {post.comments}
                  </span>
                </div>
              </div>

              <div style={{ padding: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {post.caption}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramGallery;
