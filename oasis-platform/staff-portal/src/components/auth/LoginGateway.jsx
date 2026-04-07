import React, { useState } from 'react';
import { GlassCard } from '../../shared-ui/components/GlassCard';
import { usePortal } from '../context/PortalContext';

export const LoginGateway = () => {
  const { loginAdmin, loginStaff, registerStaff } = usePortal();
  const [view, setView] = useState('login'); // 'login', 'register', 'pending'
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'login') {
      if (form.username.toLowerCase() === 'admin' && form.password === 'OasisSecure!') {
        loginAdmin();
      } else {
        try {
          loginStaff(form.username);
        } catch (err) {
          setError(err.message);
        }
      }
    } else {
      registerStaff(form.username, form.password);
      setView('pending');
    }
  };

  if (view === 'pending') {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', padding: '1.5rem', alignItems: 'center', justifyContent: 'center', background: 'var(--color-charcoal)' }}>
        <GlassCard style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Mock CSS Confetti */}
          <div className="absolute inset-0 bg-spa-hibiscus/10 animate-pulse pointer-events-none" />
          <div className="w-24 h-24 bg-spa-green text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-[0_0_30px_#789DDB]">
            ✓
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">Application Received!</h2>
          <p className="text-spa-seafoam text-lg mb-8">Your account is pending approval from the Master Admin.<br/><br/>Once accepted, you will receive your Welcome Email.</p>
          <button onClick={() => setView('login')} className="bg-transparent border border-spa-seafoam text-spa-seafoam px-6 py-2 rounded-lg hover:bg-white/10">Back to Login</button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '1.5rem', alignItems: 'center', justifyContent: 'center', background: 'var(--color-charcoal)', backgroundImage: 'radial-gradient(circle at 50% 50%, #2a3a30 0%, #1a1a1a 100%)' }}>
      <GlassCard style={{ maxWidth: '400px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-terracotta)', fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Oasis Admin</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Staff & Management Portal Access</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder={view === 'login' ? 'Email or Master Username' : 'Email Address'} 
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--color-sand)', outline: 'none' }}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--color-sand)', outline: 'none' }}
            required
          />
          {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
          
          <button 
            type="submit" 
            style={{ marginTop: '0.5rem', padding: '1rem', borderRadius: '8px', background: 'var(--color-sage)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', tracking: '1px', transition: 'background 0.3s' }}
          >
            {view === 'login' ? 'Authenticate' : 'Submit Application'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="text-spa-seafoam text-sm hover:text-white transition-colors">
            {view === 'login' ? 'Staff Members: Apply for Access Here' : 'Already have an account? Sign In'}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
