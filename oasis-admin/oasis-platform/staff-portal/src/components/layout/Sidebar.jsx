import React from 'react';
import { GlassCard } from '../../../../shared-ui/components/GlassCard';
import { usePortal } from '../../context/PortalContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentUser, setPortalUser } = usePortal(); // Assuming setPortalUser logs them out if needed

  const adminItems = [
    { id: 'calendar', label: 'Calendar 📅' },
    { id: 'chat', label: 'Chat 💬' },
    { id: 'staff', label: 'Staff 👥' },
    { id: 'store', label: 'Store 🛍️' },
    { id: 'rooms', label: 'Rooms 🛋️' },
    { id: 'notifications', label: 'Notifications 🔔' },
    { id: 'clients', label: 'Clients 📝' },
    { id: 'forms', label: 'Forms 📋' },
    { id: 'marketing', label: 'Marketing 📈' },
    { id: 'clock_in', label: 'Clock in ⏱️' }
  ];

  const staffItems = [
    { id: 'home', label: 'Home 🏠' },
    { id: 'calendar', label: 'Calendar 📅' },
    { id: 'clock_in', label: 'Clock in ⏱️' },
    { id: 'chat', label: 'Chat 💬' },
    { id: 'rooms', label: 'Rooms 🛋️' },
    { id: 'hours', label: 'Hours ⌛' },
    { id: 'income', label: 'Income 💸' },
    { id: 'notifications', label: 'Notifications 🔔' },
    { id: 'profile', label: 'Profile 👤' }
  ];

  const navItems = currentUser?.role === 'admin' ? adminItems : staffItems;

  return (
    <aside style={{ width: '260px', height: '100%', paddingRight: '1rem' }}>
      <GlassCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Profile / Role Information */}
        <div style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--color-sage-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.1rem' }}>Oasis Admin</h2>
          <div style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentUser?.role === 'admin' ? 'red' : '#789DDB' }} />
            {currentUser?.role === 'admin' ? 'Master Terminal' : `${currentUser?.name} Workspace`}
          </div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto', paddingRight: '10px' }} className="scrollbar-hide">
          {navItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                color: activeTab === item.id ? 'var(--color-sand)' : 'var(--color-text-secondary)',
                fontWeight: activeTab === item.id ? 'bold' : '500',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                transition: 'all 0.2s ease',
                borderRadius: '8px',
                background: activeTab === item.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                borderLeft: activeTab === item.id ? '3px solid var(--color-terracotta)' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) e.currentTarget.style.color = 'var(--color-sand)';
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
        
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <button onClick={() => window.location.reload()} style={{ 
            background: 'rgba(255,107,107,0.1)', 
            border: '1px solid rgba(255,107,107,0.3)', 
            color: '#ff6b6b', 
            cursor: 'pointer',
            padding: '0.75rem',
            borderRadius: '8px',
            width: '100%',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}>
            Log Out System
          </button>
        </div>

      </GlassCard>
    </aside>
  );
};
