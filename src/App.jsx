import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DiwaliBanner from './components/DiwaliBanner';
import OffersSection from './components/OffersSection';
import AboutVilla from './components/AboutVilla';
import RoomsGallery from './components/RoomsGallery';
import Amenities from './components/Amenities';
import InstagramGallery from './components/InstagramGallery';
import LocationMap from './components/LocationMap';
import GuestReviews from './components/GuestReviews';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';

function App() {
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState({
    whatsappNumber: '9816821195',
    instagramUrl: 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ==',
    villaName: 'The Hidden Hedges'
  });

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');

  // Booking Date Selection Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedOfferCode, setSelectedOfferCode] = useState('DIRECT');
  const [selectedOfferTitle, setSelectedOfferTitle] = useState('The Hidden Hedges Villa Stay');

  useEffect(() => {
    fetchOffers();
    fetchSettings();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers');
      const data = await res.json();
      if (Array.isArray(data)) setOffers(data);
    } catch (err) {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && data.whatsappNumber) setSettings(data);
    } catch (err) {}
  };

  const handleOpenBookingModal = (code = 'DIRECT', title = 'The Hidden Hedges Villa Stay') => {
    setSelectedOfferCode(code);
    setSelectedOfferTitle(title);
    setBookingModalOpen(true);
  };

  const handleOpenAdminTrigger = () => {
    if (adminToken) {
      setAdminDashboardOpen(true);
    } else {
      setAdminModalOpen(true);
    }
  };

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
    setAdminDashboardOpen(true);
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenAdmin={handleOpenAdminTrigger}
        onOpenBookingModal={handleOpenBookingModal}
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        instagramUrl={settings.instagramUrl || 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ=='}
      />

      {/* Main Hero Slider & Instant WhatsApp Reservation */}
      <HeroSection
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        offers={offers}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Grand Diwali Festive Offer Special Section */}
      <DiwaliBanner
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Dynamic Offers & Packages Carousel (Managed Live by Admin) */}
      <OffersSection
        offers={offers}
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* About Villa & 100% Private Estate Story */}
      <AboutVilla />

      {/* Luxury Rooms & Suites Interactive Gallery */}
      <RoomsGallery
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* World-Class Estate Amenities */}
      <Amenities />

      {/* Real Instagram Moments & Reels Showcase */}
      <InstagramGallery
        instagramUrl={settings.instagramUrl || 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ=='}
      />

      {/* Interactive Location Map & Direct Navigation Links */}
      <LocationMap
        settings={settings}
        whatsappNumber={settings.whatsappNumber || '9816821195'}
      />

      {/* Verified Guest Testimonials */}
      <GuestReviews />

      {/* Footer with Digital Marketing SEO Tags */}
      <Footer
        onOpenAdmin={handleOpenAdminTrigger}
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        instagramUrl={settings.instagramUrl || 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ=='}
        settings={settings}
      />

      {/* Sticky Mobile & Desktop WhatsApp & Instagram Floating Action Bar */}
      <WhatsAppFloat
        whatsappNumber={settings.whatsappNumber || '9816821195'}
        instagramUrl={settings.instagramUrl || 'https://www.instagram.com/thehiddenhedges?stkn=MWMzbnByM3QydW5wcQ=='}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Interactive Booking Date Selection Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        offerCode={selectedOfferCode}
        offerTitle={selectedOfferTitle}
        whatsappNumber={settings.whatsappNumber || '9816821195'}
      />

      {/* Admin Credentials Login Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full-Featured Admin Control Panel */}
      {adminDashboardOpen && (
        <AdminDashboard
          token={adminToken}
          onClose={() => setAdminDashboardOpen(false)}
          onRefreshOffers={fetchOffers}
          settings={settings}
          onRefreshSettings={fetchSettings}
        />
      )}

    </div>
  );
}

export default App;
