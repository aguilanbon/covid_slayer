import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authApi, tokenManager } from "../services/api";
import type { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = tokenManager.getToken();
    if (token) {
      try {
        const response = await authApi.verifyToken();
        if (response.user) {
          setUser(response.user);
        } else {
          tokenManager.removeToken();
          setUser(null);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        tokenManager.removeToken();
        setUser(null);
      }
    }
    setInitializing(false);
    setLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.login(email, password);

      if (response.token && response.user) {
        tokenManager.setToken(response.token);
        setUser(response.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await authApi.signup(fullName, email, password, avatar);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenManager.removeToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading,
    initializing,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
