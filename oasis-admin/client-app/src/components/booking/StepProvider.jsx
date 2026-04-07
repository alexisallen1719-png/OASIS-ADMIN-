import React from 'react';
import { GlassCard } from '../../../../shared-ui/components/GlassCard';

const mockProviders = [
  { id: 'p1', name: 'Elena R.', occupation: 'Esthetician', rating: '5.0', image: '👩‍oard' },
  { id: 'p2', name: 'Michael T.', occupation: 'Massage Therapist', rating: '4.9', image: '👨‍⚕️' },
  { id: 'p3', name: 'Sarah L.', occupation: 'Lead Therapist', rating: '5.0', image: '👩‍⚕️' }
];

export const StepProvider = ({ selectedProviderId, onSelectProvider }) => {
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-sage-dark)' }}>Select Provider</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {mockProviders.map((provider) => {
          const isSelected = selectedProviderId === provider.id;
          return (
            <GlassCard
              hoverReveal
              key={provider.id}
              onClick={() => onSelectProvider(provider.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: isSelected ? '2px solid var(--color-terracotta)' : '1px solid var(--glass-border)',
                backgroundColor: isSelected ? 'rgba(208, 123, 101, 0.1)' : 'var(--glass-bg)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2rem', marginRight: '1rem' }}>{provider.image}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)', marginBottom: '0.2rem' }}>{provider.name}</h3>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{provider.occupation}</span>
              </div>
              <div style={{ color: 'var(--color-sage-dark)', fontWeight: 'bold' }}>
                ⭐ {provider.rating}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
