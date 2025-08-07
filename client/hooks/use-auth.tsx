'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = { email: string; uid: string } | null;

interface AuthContextValue {
  user: User;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const mockUser = typeof window !== 'undefined' ? localStorage.getItem('mockUser') : null;
    if (mockUser) {
      const userData = JSON.parse(mockUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string) => {
    const userData = { email, uid: 'mock-uid-' + Date.now() };
    localStorage.setItem('mockUser', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
