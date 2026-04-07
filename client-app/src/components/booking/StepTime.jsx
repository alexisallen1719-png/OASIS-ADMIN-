import React from 'react';
import { GlassCard } from '../../../../shared-ui/components/GlassCard';

const mockTimes = [
  "10:00 AM", "11:30 AM", "1:00 PM", "3:45 PM", "5:00 PM"
];

export const StepTime = ({ selectedTime, onSelectTime }) => {
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-sage-dark)' }}>Select Time</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
        {mockTimes.map((time, idx) => {
          const isSelected = selectedTime === time;
          return (
            <GlassCard
               hoverReveal
               key={idx}
               onClick={() => onSelectTime(time)}
               style={{
                 cursor: 'pointer',
                 textAlign: 'center',
                 padding: '1rem',
                 border: isSelected ? '2px solid var(--color-sage)' : '1px solid var(--glass-border)',
                 backgroundColor: isSelected ? 'var(--color-sage)' : 'var(--glass-bg)',
                 color: isSelected ? 'var(--color-white)' : 'var(--color-charcoal)',
                 fontWeight: isSelected ? 'bold' : 'normal',
                 transition: 'all 0.2s ease'
               }}
            >
              {time}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
