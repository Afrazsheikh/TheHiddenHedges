import React from 'react';
import { Waves, UtensilsCrossed, Film, Flame, Wifi, Sparkles, Footprints, CarTaxiFront } from 'lucide-react';

const amenitiesList = [
  {
    icon: Waves,
    title: 'Heated Infinity Pool',
    desc: 'Temperature controlled swimming pool with underwater ambient lighting and sun deck.'
  },
  {
    icon: UtensilsCrossed,
    title: 'Private Gourmet Chef',
    desc: 'Customized dining menus featuring Himachali delicacies, Italian woodfired pizza & Diwali banquets.'
  },
  {
    icon: Film,
    title: 'Starlight Outdoor Cinema',
    desc: '4K laser projector under starry skies with outdoor plush beanbags and gourmet popcorn.'
  },
  {
    icon: Flame,
    title: 'Bonfire & BBQ Patio',
    desc: 'Private timber hearth firepit for cool mountain evenings with live acoustic music options.'
  },
  {
    icon: Wifi,
    title: 'High-Speed Starlink WiFi',
    desc: 'Uninterrupted 300+ Mbps connectivity across all indoor suites, pool deck, and gardens.'
  },
  {
    icon: Sparkles,
    title: 'Aromatherapy & Spa Rituals',
    desc: 'In-villa wellness masseuse treatments using organic herbal oils and floral baths.'
  },
  {
    icon: Footprints,
    title: 'Private Pine Forest Trails',
    desc: 'Exclusive 3-acre gated grounds with manicured lawns, organic fruit orchards, and nature paths.'
  },
  {
    icon: CarTaxiFront,
    title: 'Chauffeur & Airport Transfer',
    desc: 'Luxury SUV pickups from Chandigarh & Shimla airports directly to the villa entrance.'
  }
];

const Amenities = () => {
  return (
    <section id="amenities" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #151f18 0%, var(--bg-dark) 100%)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
            WORLD-CLASS AMENITIES
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Curated Experiences & <span className="text-gold-gradient">Modern Luxury</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Everything you need for an effortless, pampered stay surrounded by mountain pine forests.
          </p>
        </div>

        <div className="grid-4">
          {amenitiesList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '30px 24px',
                  borderRadius: '20px',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'var(--gold-gradient)',
                  color: '#0f1611',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(212,175,55,0.3)'
                }}>
                  <IconComponent size={26} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Amenities;
