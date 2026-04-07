import React from 'react';
import { GlassCard } from '../../shared-ui/components/GlassCard';
import { Input } from '../../shared-ui/components/Input';
import { Button } from '../../shared-ui/components/Button';

export const Checkout = () => {
  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      
      {/* Product Scanner Section */}
      <div>
        <h2 style={{ color: 'var(--color-sand)', marginBottom: '1.5rem' }}>POS & Inventory</h2>
        <GlassCard>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
              <Input placeholder="Scan Barcode or Search Product..." />
            </div>
            <Button style={{ height: 'fit-content', marginTop: '0.2rem' }}>Scan</Button>
          </div>

          <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
             <p style={{ color: 'var(--color-text-secondary)' }}>Ready for next item...</p>
          </div>
        </GlassCard>
      </div>

      {/* Cart & Ticket Summary */}
      <div>
        <h2 style={{ color: 'var(--color-sand)', marginBottom: '1.5rem' }}>Current Ticket</h2>
        <GlassCard style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 3.5rem)' }}>
          <div style={{ flex: 1 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span>
                <span>$0.00</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                <span>Tax</span>
                <span>$0.00</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-sage-light)' }}>
                <span>Commission To:</span>
                <select style={{ background: 'transparent', color: 'var(--color-sand)', border: 'none', outline: 'none' }}>
                  <option>Assign Staff</option>
                  <option>Elena R.</option>
                  <option>Michael T.</option>
                </select>
             </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', color: 'var(--color-sand)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                <span>Total</span>
                <span>$0.00</span>
             </div>
             <Button style={{ width: '100%', backgroundColor: 'var(--color-terracotta)', fontSize: '1.1rem' }}>
               Process Payment
             </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
