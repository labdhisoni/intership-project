import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Simulated login function (replace with your real API call)
  const login = async (email: string, password: string): Promise<boolean> => {
    // Example dummy users (replace with your backend validation)
    const dummyUsers: User[] = [
      { id: 1, name: 'Store Owner', email: 'owner@example.com', role: 'store_owner' },
      { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      { id: 3, name: 'Normal User', email: 'user@example.com', role: 'user' },
    ];

    const foundUser = dummyUsers.find(
      (u) => u.email === email && password.length >= 8 // dummy password check
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
