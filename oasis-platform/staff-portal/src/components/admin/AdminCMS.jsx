import React, { useState } from 'react';
import { GlassCard } from '../../../shared-ui/components/GlassCard';
import { Button } from '../../../shared-ui/components/Button';
import { Input } from '../../../shared-ui/components/Input';

export const AdminCMS = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const pages = ['Home Page', 'Services Page', 'Promotions Page', 'Booking Rules Settings'];
  
  const canvasBlocks = [
    { id: 'b1', type: 'Hero Banner', title: 'Welcome to Oasis' },
    { id: 'b2', type: 'Text Section', title: 'Our Philosophy' },
    { id: 'b3', type: 'Service Grid', title: 'Top Treatments' }
  ];

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '250px 1fr 300px', gap: '1.5rem', height: 'calc(100vh - 4rem)' }}>
      
      {/* Pane 1: Page Navigation */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'var(--color-sage-dark)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Page Structure</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pages.map(page => (
            <li 
              key={page}
              style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: page === 'Home Page' ? 'rgba(138, 154, 134, 0.1)' : 'transparent',
                border: page === 'Home Page' ? '1px solid var(--color-sage-light)' : '1px solid transparent',
                color: page === 'Home Page' ? 'var(--color-sand)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {page}
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Pane 2: Visual Canvas Editor */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'var(--color-sand)' }}>Visual Editor (Live Preview)</h2>
          <Button style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>View Live Site</Button>
        </div>
        
        <div style={{
          flex: 1, 
          backgroundColor: 'var(--color-charcoal-light)', 
          borderRadius: 'var(--radius-md)', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          overflowY: 'auto'
        }}>
          {canvasBlocks.map(block => (
            <div 
              key={block.id}
              onClick={() => setSelectedBlock(block.id)}
              style={{
                padding: '2rem',
                backgroundColor: 'var(--color-charcoal)',
                border: selectedBlock === block.id ? '2px solid var(--color-terracotta)' : '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-sand)',
                cursor: 'grab',
                textAlign: 'center',
                boxShadow: selectedBlock === block.id ? 'var(--shadow-glow)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <h4 style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                {block.type} Block
              </h4>
              <p style={{ fontSize: '1.2rem' }}>{block.title}</p>
            </div>
          ))}
          
          <div style={{ textAlign: 'center', padding: '1rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
            + Drag & Drop New Block Here
          </div>
        </div>
      </GlassCard>

      {/* Pane 3: Properties Inspector */}
      <GlassCard style={{ overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--color-sage-light)', fontSize: '1.1rem' }}>Properties</h3>
          <Button style={{ backgroundColor: 'var(--color-terracotta)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Publish</Button>
        </div>
        
        {selectedBlock ? (
          <div className="animate-pop-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Input label="Section Title" defaultValue={canvasBlocks.find(b => b.id === selectedBlock)?.title} />
            <Input label="Background Image URL" placeholder="https://..." />
            <Input label="Padding Top" defaultValue="4rem" />
            <Input label="Padding Bottom" defaultValue="4rem" />
            <div style={{ marginTop: '1rem' }}>
              <Button style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--color-terracotta-light)', color: 'var(--color-terracotta-light)' }}>
                Remove Block
              </Button>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
            Select a block on the canvas to edit its properties.
          </p>
        )}
      </GlassCard>
    </div>
  );
};
