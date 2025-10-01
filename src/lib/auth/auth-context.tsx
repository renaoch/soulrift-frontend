'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from './auth-store';
import { apiClient } from '../../app/api/client';

interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    setUser,
    setLoading,
    setError,
    logout: logoutStore,
    clearError,
  } = useAuthStore();

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    clearError();

    try {
      const response = await apiClient.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<boolean> => {
    setLoading(true);
    clearError();

    try {
      const response = await apiClient.register(userData);
      
      if (response.success) {
        // Don't auto-login after registration, let user verify email
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logoutStore();
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    clearError();

    try {
      const response = await apiClient.resetPassword(email);
      
      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Reset password failed');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Reset password failed';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
