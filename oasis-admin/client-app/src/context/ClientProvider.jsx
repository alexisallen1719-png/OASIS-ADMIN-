'use client';
import { AppProvider } from './AppContext';
import { AuthModal } from '../components/auth/AuthModal';

export const ClientProvider = ({ children }) => {
  return (
    <AppProvider>
      {children}
      <AuthModal />
    </AppProvider>
  );
};
