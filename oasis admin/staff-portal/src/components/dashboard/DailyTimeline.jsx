import React from 'react';
import { GlassCard } from '../../../../shared-ui/components/GlassCard';

export const DailyTimeline = () => {
  const appointments = [
    { id: 1, time: '1:00 PM', client: 'Monica G.', service: 'Botanical Hydrofacial', room: 'Room 2' },
    { id: 2, time: '2:30 PM', client: 'Ryan B.', service: 'Deep Tissue Recovery', room: 'Room 4' },
    { id: 3, time: '4:00 PM', client: 'Sarah M.', service: 'Signature Swedish', room: 'Room 1' },
  ];

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--color-sand)' }}>Daily Timeline</h2>
        <span style={{ color: 'var(--color-sage-light)', fontSize: '0.9rem' }}>Clocked In: 8 Hours</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {appointments.map((apt) => (
          <GlassCard hoverReveal key={apt.id} style={{ display: 'flex', alignItems: 'center', padding: '1.25rem' }}>
            <div style={{ minWidth: '80px', color: 'var(--color-terracotta-light)', fontWeight: 'bold' }}>
              {apt.time}
            </div>
            <div style={{ flex: 1, marginLeft: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
              <h3 style={{ color: 'var(--color-sand)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{apt.client}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{apt.service}</p>
            </div>
            <div style={{ color: 'var(--color-sage-light)', fontWeight: 500, backgroundColor: 'rgba(138, 154, 134, 0.1)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)' }}>
              {apt.room}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
