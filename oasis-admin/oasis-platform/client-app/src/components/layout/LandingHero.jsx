import React from 'react';
import { Button } from '../../../../shared-ui/components/Button';

export const LandingHero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Background Looping Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -2
        }}
      >
        <source src="https://cdn.pixabay.com/video/2016/08/22/4733-183786499_tiny.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Luxury Color Overlay to ensure text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(54, 69, 59, 0.4)', /* translucent sage green */
        zIndex: -1
      }} />

      {/* Floating Center Content */}
      <div className="fade-in" style={{
        textAlign: 'center',
        color: 'var(--color-sand)',
        padding: '3rem',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(235, 230, 224, 0.1)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '800px',
        width: '90%'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem', 
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 300
        }}>
          Find Your Oasis
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '2.5rem', 
          lineHeight: '1.6',
          color: 'rgba(235, 230, 224, 0.9)'
        }}>
          Relaxation, Medical Spa Treatments, and Wellness tailored for you.
          East Lansing's premier destination for holistic restoration.
        </p>
        <Button 
          onClick={scrollToBooking}
          style={{ 
            fontSize: '1.2rem', 
            padding: '1rem 3rem',
            backgroundColor: 'var(--color-terracotta)',
            color: 'var(--color-sand)'
          }}
        >
          Book Your Escape
        </Button>
      </div>
    </div>
  );
};
