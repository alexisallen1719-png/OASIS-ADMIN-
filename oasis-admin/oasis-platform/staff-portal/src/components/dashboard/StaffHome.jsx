import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../../shared-ui/components/GlassCard';
import { usePortal } from '../../context/PortalContext';

// Spa tips hardcoded but could be fetched dynamically
const SPA_TIPS = [
  "SPF Reminder: After exfoliating services, always remind clients to apply SPF daily.",
  "Rebooking Opportunity: The best time to recommend a follow-up is immediately after the service.",
  "Product Recommendation: Recommend only one or two products, not five. Simple is better.",
  "Massage Pressure Check: Always check in during the first 5 minutes to confirm comfort.",
  "Relaxation Moment: Give clients one minute of quiet stillness before ending the service."
];

export const StaffHome = () => {
  const { currentUser, appointments, startTreatmentTimer } = usePortal();
  
  // Local state for the treatment timer simulation
  const [timerState, setTimerState] = useState('idle'); // 'idle', 'running', 'paused', 'completed'
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 + 15); // e.g. 24 mins 15 secs
  const [dailyTip] = useState(SPA_TIPS[Math.floor(Math.random() * SPA_TIPS.length)]);

  useEffect(() => {
    let interval = null;
    if (timerState === 'running' && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (timeRemaining === 0) {
      setTimerState('completed');
    }
    
    // Simulate silent vibration when exactly 6 minutes (360 seconds) remain
    if (timeRemaining === 360 && timerState === 'running') {
      alert("Silent Vibration ✓ Reminder: Your appointment has exactly 6 minutes left.");
    }
    return () => clearInterval(interval);
  }, [timerState, timeRemaining]);

  const handleTimerAction = (action) => {
    if (action === 'start') {
      setTimerState('running');
      startTreatmentTimer('appt2', Math.floor(timeRemaining / 60), 1); // Mock updating global context room status
    }
    if (action === 'pause') setTimerState('paused');
    if (action === 'complete') {
      setTimerState('completed');
      setTimeRemaining(0);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Welcome Header */}
      <GlassCard style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-sage-light)', marginBottom: '0.5rem', fontFamily: 'serif' }}>
            Good Morning, {currentUser?.name || 'Staff'} 🌞
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
            You have <strong style={{color:'var(--color-terracotta)'}}>6 appointments</strong> today.<br/>
            Next client arrives in 18 minutes.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1rem', color: 'var(--color-sand)', marginBottom: '0.5rem' }}>🎂 Today’s Birthday</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>Emma – Front Desk</div>
        </div>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Interactive Treatment Timer */}
          <GlassCard style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-sage-light)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Current Appointment</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-sand)', fontWeight: 'bold' }}>Hydrating Facial</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Room: Facial Room 1</div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '3rem', fontFamily: 'monospace', color: timerState === 'running' ? '#90EE90' : 'var(--color-text-secondary)' }}>
                  {formatTime(timeRemaining)}
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Remaining</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={() => handleTimerAction(timerState === 'running' ? 'pause' : 'start')}
                style={{ flex: 1, padding: '1rem', background: timerState === 'running' ? 'rgba(255,255,255,0.1)' : 'var(--color-sage)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                {timerState === 'running' ? 'Pause Timer' : 'Start Treatment'}
              </button>
              <button 
                onClick={() => handleTimerAction('complete')}
                style={{ flex: 1, padding: '1rem', background: 'transparent', border: '2px solid var(--color-terracotta)', color: 'var(--color-terracotta)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                Complete Treatment
              </button>
            </div>
          </GlassCard>

          {/* Daily Spa Tip */}
          <GlassCard style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(82, 102, 85,0.8), rgba(26, 26, 26, 0.8))' }}>
            <h3 style={{ color: 'var(--color-sand)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Daily Spa Tip
            </h3>
            <p style={{ color: 'white', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              {dailyTip}
            </p>
          </GlassCard>
          
        </div>

        {/* Right Sidebar Status Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Quick Overview of Spa Rooms */}
          <GlassCard style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--color-sage-light)', marginBottom: '1rem' }}>Room Status</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Room 1</span> <span style={{ color: '#ff6b6b' }}>In Treatment</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Room 2</span> <span style={{ color: '#90EE90' }}>Available</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Room 3</span> <span style={{ color: '#FFD700' }}>Cleaning</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Room 4</span> <span style={{ color: '#90EE90' }}>Available</span></div>
            </div>
          </GlassCard>

          {/* Mini Group Chat Panel */}
          <GlassCard style={{ padding: '1.5rem' }}>
             <h4 style={{ color: 'var(--color-sage-light)', marginBottom: '1rem' }}>Team Comms</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div><span style={{color:'var(--color-terracotta)'}}>Jessica:</span> Client arrived early.</div>
                <div><span style={{color:'var(--color-sand)'}}>Miguel:</span> Room 2 is ready.</div>
                <div><span style={{color:'var(--color-sage)'}}>Alexis:</span> Running 5 minutes behind.</div>
             </div>
             <button style={{ width: '100%', padding: '0.5rem', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>
               Open Quick Chat
             </button>
          </GlassCard>
          
        </div>

      </div>
    </div>
  );
};
