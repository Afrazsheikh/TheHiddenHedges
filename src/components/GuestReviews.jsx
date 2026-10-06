import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviewsData = [
  {
    name: 'Vikram & Radhika Mehta',
    location: 'New Delhi',
    rating: 5,
    tag: 'Diwali Celebration Stay',
    comment: 'The Hidden Hedges surpassed all our expectations! Celebrating Diwali here with our extended family was magical. The private chef prepared a royal feast, and the illuminated infinity pool was breathtaking.',
    date: 'Diwali Guest'
  },
  {
    name: 'Ananya & Rohan Kapoor',
    location: 'Mumbai',
    rating: 5,
    tag: 'Couple Sanctuary',
    comment: 'Absolute privacy and luxury! Waking up in the Master Penthouse Suite to misty pine valley views was like being in a Swiss chalet. The WhatsApp booking was effortless.',
    date: 'Verified Stay'
  },
  {
    name: 'Dr. Sameer Oberoi',
    location: 'Chandigarh',
    rating: 5,
    tag: 'Family Getaway',
    comment: ' Flawless estate management. The outdoor starlight cinema by the bonfire pit made our evening unforgettable. 10/10 recommendation for private group luxury stays.',
    date: 'Verified Stay'
  }
];

const GuestReviews = () => {
  return (
    <section id="reviews" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>
            VERIFIED GUEST TESTIMONIALS
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Loved by Our <span className="text-gold-gradient">Discerning Guests</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Read real stories from families, couples, and celebration groups who experienced The Hidden Hedges.
          </p>
        </div>

        <div className="grid-3">
          {reviewsData.map((rev, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', borderRadius: '20px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#d4af37" color="#d4af37" />
                  ))}
                </div>
                <Quote size={28} color="var(--gold-primary)" style={{ opacity: 0.4 }} />
              </div>

              <div style={{ fontSize: '0.78rem', color: '#ff9d42', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                {rev.tag}
              </div>

              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px', flex: 1, fontStyle: 'italic' }}>
                "{rev.comment}"
              </p>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{rev.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GuestReviews;
