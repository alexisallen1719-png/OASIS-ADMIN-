import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { CalendarView } from './components/calendar/CalendarView';
import { RoomsMap } from './components/rooms/RoomsMap';
import { Checkout } from './components/pos/Checkout';
import { AdminCMS } from './components/admin/AdminCMS';
import { StaffHome } from './components/dashboard/StaffHome';
import { StaffChat } from './components/chat/StaffChat';
import { GlassCard } from './shared-ui/components/GlassCard';
import { usePortal } from './context/PortalContext';
import { LoginGateway } from './components/auth/LoginGateway';
import './shared-ui/styles/animations.css';

function App() {
  const { currentUser } = usePortal();
  const [activeTab, setActiveTab] = useState(currentUser?.role === 'staff' ? 'home' : 'calendar');

  if (!currentUser) {
    return <LoginGateway />;
  }

  // --- ADMIN & STAFF ROUTING ---
  const renderContent = () => {
    switch (activeTab) {
      // Shared / General mappings (Mock placeholders for new complex modules to be built in subsequent steps)
      case 'calendar':
      case 'schedule':
        return <CalendarView />;
      case 'rooms':
        return <RoomsMap />;
      case 'pos':
      case 'store':
        return <Checkout />;
      case 'admin':
      case 'staff':
        return <AdminCMS />;
      case 'home':
        return <StaffHome />;
      case 'chat':
        return <StaffChat />;

      // Temporary Modules waiting for implementation in later steps:
      case 'clock_in':
      case 'notifications':
      case 'clients':
      case 'forms':
      case 'marketing':
      case 'hours':
      case 'income':
      case 'profile':
      case 'home': // Staff specific homepage
      default:
        return (
          <GlassCard style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ color: 'var(--color-sage-light)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{activeTab} Module</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>This module is currently being constructed according to the Phase 10 Blueprint.</p>
          </GlassCard>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '1.5rem', maxWidth: '1440px', margin: '0 auto', gap: '2rem' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, padding: '1rem 0' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
