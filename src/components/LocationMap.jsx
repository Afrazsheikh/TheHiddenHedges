import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Clock, Plane, Train, Car } from 'lucide-react';

const LocationMap = ({ settings = {}, whatsappNumber }) => {
  const mapEmbedUrl = settings.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000!2d77.1734!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzE3LjMiTiA3N8KwMTAnMjQuMiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin';
  const gmapsRedirect = settings.googleMapsRedirectUrl || 'https://maps.google.com/?q=The+Hidden+Hedges+Villa';

  const handleOpenGmaps = () => {
    window.open(gmapsRedirect, '_blank');
  };

  const handleDirectionsAssistance = () => {
    const msg = `Hi! I am driving to *The Hidden Hedges Villa*. Could you please send me exact location pins, landmark guides & gate entry access?`;
    window.open(`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="location" style={{ padding: '100px 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-gold)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
            PRIME LOCATION & ACCESS
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Find <span className="text-gold-gradient">The Hidden Hedges</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Secluded pine hill position with paved private driveway and gated security entrance.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '32px', alignItems: 'center' }}>
          
          {/* Left Location Info */}
          <div>
            
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', marginBottom: '24px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--gold-gradient)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f1611' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>The Hidden Hedges Estate</h3>
                  <p style={{ color: 'var(--gold-light)', fontSize: '0.88rem' }}>Pine Ridge Valley, Himachal Pradesh, India</p>
                </div>
              </div>

              {/* Distance Matrix */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '0.9rem' }}>
                    <Plane size={18} color="var(--gold-primary)" /> Chandigarh Int. Airport (IXC)
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.88rem' }}>2.5 Hours Drive</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '0.9rem' }}>
                    <Train size={18} color="var(--gold-primary)" /> Kalka / Shimla Railway Station
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.88rem' }}>35 Mins Drive</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '0.9rem' }}>
                    <Car size={18} color="var(--gold-primary)" /> Town Centre & Mall Road
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.88rem' }}>20 Mins Drive</span>
                </div>

              </div>

              {/* Redirect Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button onClick={handleOpenGmaps} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Navigation size={18} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={16} />
                </button>

                <button onClick={handleDirectionsAssistance} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                  <Compass size={18} />
                  <span>Get Driving Route</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Embedded Google Map */}
          <div>
            <div className="glass-panel" style={{ padding: '12px', borderRadius: '24px', height: '440px' }}>
              <iframe
                title="The Hidden Hedges Villa Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationMap;
