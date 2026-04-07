import React from 'react';
import { GlassCard } from '../../../../shared-ui/components/GlassCard';

export const StepConfirm = ({ bookingData }) => {
  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-sage-dark)', marginBottom: '0.5rem' }}>Review & Confirm</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Almost there! Please review your oasis experience.</p>
      </div>

      <GlassCard style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Service:</span>
            <span style={{ fontWeight: '500' }}>{bookingData.service || 'Not selected'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Provider:</span>
            <span style={{ fontWeight: '500' }}>{bookingData.provider || 'Any Provider'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Time:</span>
            <span style={{ fontWeight: '500' }}>{bookingData.time || 'Not selected'}</span>
          </div>
          <hr style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', color: 'var(--color-sage-dark)', fontWeight: 'bold' }}>
            <span>Deposit Due (25%):</span>
            <span>$25.00</span>
          </div>
        </div>
      </GlassCard>
      
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
        By confirming, you will be redirected to Stripe to securely process your deposit.
      </p>
    </div>
  );
};
