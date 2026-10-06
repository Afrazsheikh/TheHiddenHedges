import React from 'react';
import { Shield, Sunset, Coffee, Utensils, Wifi, Tv, Compass, Sparkles } from 'lucide-react';

const AboutVilla = () => {
  return (
    <section id="about" style={{ padding: '80px 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, #151f18 100%)' }}>
      <div className="container">
        
        <div className="grid-2" style={{ alignItems: 'center', gap: '36px' }}>
          
          {/* Left Text Column */}
          <div>
            <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
              <Sparkles size={13} style={{ display: 'inline', marginRight: '5px' }} /> THE ESTATE EXPERIENCE
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.25 }}>
              A Sanctuary Hidden in <span className="text-gold-gradient">The Forest Hedges</span>
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px', lineHeight: 1.6 }}>
              Nestled on a private ridge surrounded by whispering pines, The Hidden Hedges is an exclusive architectural villa designed for those seeking discretion, tranquility, and modern luxury.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Whether you are celebrating Diwali with family, organizing a weekend sanctuary getaway, or hosting an intimate celebration, the entire 3-acre estate remains 100% reserved exclusively for you.
            </p>

            {/* Feature Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '10px', borderRadius: '10px', color: 'var(--gold-primary)' }}>
                  <Sunset size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '2px' }}>Infinity Pool</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Temperature-controlled pool with valley views.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '10px', borderRadius: '10px', color: 'var(--gold-primary)' }}>
                  <Utensils size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '2px' }}>Private Chef</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Custom menus, BBQ & festive banquets.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '10px', borderRadius: '10px', color: 'var(--gold-primary)' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '2px' }}>100% Private</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>24/7 security & dedicated butler service.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.15)', padding: '10px', borderRadius: '10px', color: 'var(--gold-primary)' }}>
                  <Tv size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem', marginBottom: '2px' }}>Starlight Cinema</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Outdoor 4K projector next to bonfire pit.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div style={{ position: 'relative' }}>
            <div className="glass-panel" style={{ padding: '10px', borderRadius: '20px' }}>
              <img
                src="/images/hero.jpg"
                alt="The Hidden Hedges Estate"
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '14px', display: 'block' }}
              />
            </div>

            {/* Floating Luxury Tag */}
            <div
              className="glass-panel animate-float"
              style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-16px',
                padding: '16px 22px',
                background: 'rgba(15, 22, 17, 0.95)',
                border: '1px solid var(--gold-primary)',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold-light)' }} className="font-serif">4.9 ★</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Over 150+ Verified Luxury Guest Ratings</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutVilla;
