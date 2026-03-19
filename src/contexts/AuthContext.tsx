import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string, otp: string) => Promise<void>;
  signUp: (phone: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (phone: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const updatedUser = await fetchUser(user.phone);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const signIn = async (phone: string, otp: string) => {
    if (otp !== '1234') {
      throw new Error('Invalid OTP');
    }

    const userData = await fetchUser(phone);
    if (!userData) {
      throw new Error('User not found. Please sign up first.');
    }

    localStorage.setItem('gigshield_phone', phone);
    setUser(userData);
  };

  const signUp = async (phone: string, name: string) => {
    const existingUser = await fetchUser(phone);
    if (existingUser) {
      throw new Error('User already exists. Please sign in.');
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        phone,
        name,
        language: 'Tamil',
        wallet_balance: 0,
        is_active: true,
        fraud_score: 0,
      })
      .select()
      .single();

    if (error) throw error;

    localStorage.setItem('gigshield_phone', phone);
    setUser(data);
  };

  const signOut = async () => {
    localStorage.removeItem('gigshield_phone');
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    setUser(data);
  };

  useEffect(() => {
    const phone = localStorage.getItem('gigshield_phone');
    if (phone) {
      fetchUser(phone)
        .then((userData) => {
          if (userData) setUser(userData);
        })
        .catch((error) => {
          console.error('Error loading user:', error);
          localStorage.removeItem('gigshield_phone');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, updateUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
