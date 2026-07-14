import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount or token change
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error('Failed to restore session:', error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('crm-token');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    window.location.href = '/login'; // Safest client-side redirect independent of Router hierarchy
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
