import React, { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  // --- AUTH & ROLES ---
  // currentUser can be: { role: 'admin' } OR { role: 'staff',  email, name, occupation... }
  const [currentUser, setCurrentUser] = useState(null); 
  
  // If currentUser is Admin, this holds the sub-profile (e.g. 'Alexis', 'Grace')
  const [activeAdminProfile, setActiveAdminProfile] = useState(null);

  // --- DATABASES ---
  const [pendingAccounts, setPendingAccounts] = useState([]);
  
  const [staffProfiles, setStaffProfiles] = useState([
    { id: 'a1', name: 'Alexis', type: 'admin', bio: '', photo: '', zodiac: '♈' },
    { id: 'a2', name: 'Grace', type: 'admin', bio: '', photo: '', zodiac: '♋' },
    { id: 'a3', name: 'Hannah', type: 'admin', bio: '', photo: '', zodiac: '♌' },
    { id: 'a4', name: 'Alan', type: 'admin', bio: '', photo: '', zodiac: '♏' }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Admin', text: 'Welcome to Oasis OS Staff Core!', timestamp: new Date().toISOString() }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 'appt1', client: 'Sarah Connor', service: 'Deep Tissue Massage', color: '#89CFF0', start: new Date(new Date().setHours(10, 0, 0, 0)), duration: 60, room: 1, provider: 'Grace' },
    { id: 'appt2', client: 'John Wick', service: 'Hydrating Facial', color: '#90EE90', start: new Date(new Date().setHours(11, 0, 0, 0)), duration: 45, room: 2, provider: 'Hannah' }
  ]);

  const [activeTimers, setActiveTimers] = useState([]); // { apptId, timeLeft, roomId, providerId }
  const [clockIns, setClockIns] = useState([]); // { staffId, inTime, outTime }

  // --- METHODS ---
  const registerStaff = (email, password) => {
    const newAcct = { id: Date.now().toString(), email, status: 'pending' };
    setPendingAccounts([...pendingAccounts, newAcct]);
    return newAcct;
  };

  const approveStaff = (acctId) => {
    const acct = pendingAccounts.find(a => a.id === acctId);
    if (!acct) return;
    setPendingAccounts(prev => prev.filter(a => a.id !== acctId));
    setStaffProfiles(prev => [...prev, { id: acct.id, name: 'New Staff', email: acct.email, type: 'staff', needsSetup: true }]);
  };

  const loginAdmin = () => {
    setCurrentUser({ role: 'admin' });
  };

  const loginStaff = (email) => {
    const profile = staffProfiles.find(s => s.email === email && s.type === 'staff');
    if (profile) setCurrentUser({ role: 'staff', ...profile });
    else throw new Error("Account pending or not found.");
  };

  const selectAdminProfile = (name) => {
    setActiveAdminProfile(name);
  };

  const clockIn = (staffName) => {
    setClockIns(prev => [...prev, { staffName, inTime: new Date().toISOString(), outTime: null }]);
  };

  const clockOut = (staffName) => {
    setClockIns(prev => 
      prev.map(c => (c.staffName === staffName && !c.outTime) ? { ...c, outTime: new Date().toISOString() } : c)
    );
  };

  const startTreatmentTimer = (apptId, minutes, roomId) => {
    setActiveTimers(prev => [...prev, { apptId, timeLeft: minutes * 60, roomId }]);
  };

  const sendChatMessage = (sender, text, reactions = []) => {
    setChatMessages(prev => [...prev, { id: Date.now(), sender, text, timestamp: new Date().toISOString(), reactions }]);
  };

  const addReaction = (messageId, emoji) => {
    setChatMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        const reactions = m.reactions || [];
        return { ...m, reactions: [...reactions, emoji] };
      }
      return m;
    }));
  };

  return (
    <PortalContext.Provider value={{
      currentUser, setCurrentUser,
      activeAdminProfile, selectAdminProfile,
      loginAdmin, loginStaff, registerStaff,
      pendingAccounts, approveStaff,
      staffProfiles, setStaffProfiles,
      chatMessages, sendChatMessage, addReaction,
      appointments, setAppointments,
      activeTimers, startTreatmentTimer, setActiveTimers,
      clockIns, clockIn, clockOut
    }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);
