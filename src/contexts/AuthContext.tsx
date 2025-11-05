import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/config/api';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('edu-user');
    const savedToken = localStorage.getItem('edu-token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
   const { data } = await api.post<AuthResponse>('/api/Auth/login', {

      email,
      senha: password
    });

    const mappedUser: User = {
      id: data.usuario.id,
      nome: data.usuario.nome,
      email: data.usuario.email,
      tipoUsuario: data.usuario.tipoUsuario,
      funcao: data.usuario.funcao,
      telasPermitidasIds: data.usuario.telasPermitidasIds,
    };

    setUser(mappedUser);

    localStorage.setItem('edu-user', JSON.stringify(mappedUser));
    localStorage.setItem('edu-token', data.token);

    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu-user');
    localStorage.removeItem('edu-token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
