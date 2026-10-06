import React from 'react';
import { Shield, Sunset, Coffee, Utensils, Wifi, Tv, Compass, Sparkles } from 'lucide-react';

const AboutVilla = () => {
  return (
    <section id="about" style={{ padding: '100px 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, #151f18 100%)' }}>
      <div className="container">
        
        <div className="grid-2" style={{ alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div>
            <span className="badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> THE ESTATE EXPERIENCE
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px', lineHeight: 1.2 }}>
              A Sanctuary Hidden in <span className="text-gold-gradient">The Forest Hedges</span>
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '24px' }}>
              Nestled on a private ridge surrounded by whispering pines, The Hidden Hedges is an exclusive architectural villa designed for those seeking discretion, tranquility, and uncompromising modern luxury.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '32px' }}>
              Whether you are celebrating Diwali with family, organizing a weekend sanctuary getaway, or hosting an intimate celebration, the entire 3-acre estate remains 100% reserved exclusively for you.
            </p>

            {/* Feature Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '12px', borderRadius: '12px', color: 'var(--gold-primary)' }}>
                  <Sunset size={24} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Infinity Pool</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Temperature-controlled swimming pool with valley views.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '12px', borderRadius: '12px', color: 'var(--gold-primary)' }}>
                  <Utensils size={24} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Private Chef</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Custom tailored menus, BBQ feasts & festive banquets.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '12px', borderRadius: '12px', color: 'var(--gold-primary)' }}>
                  <Shield size={24} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>100% Private</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Gated estate with 24/7 private security & butler service.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '12px', borderRadius: '12px', color: 'var(--gold-primary)' }}>
                  <Tv size={24} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>Starlight Cinema</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Outdoor 4K projector cinema next to private bonfire pit.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div style={{ position: 'relative' }}>
            <div className="glass-panel" style={{ padding: '12px', borderRadius: '24px' }}>
              <img
                src="/images/hero.jpg"
                alt="The Hidden Hedges Estate"
                style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
              />
            </div>

            {/* Floating Luxury Tag */}
            <div
              className="glass-panel animate-float"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                padding: '20px 28px',
                background: 'rgba(15, 22, 17, 0.95)',
                border: '1px solid var(--gold-primary)'
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gold-light)' }} className="font-serif">4.9 ★</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Over 150+ Verified Luxury Guest Ratings</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutVilla;
