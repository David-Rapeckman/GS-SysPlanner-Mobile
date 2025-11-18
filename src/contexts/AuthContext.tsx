import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextData, SignInCredentials } from '../types/auth';
import { User } from '../types/user';
import { signInRequest } from '../services/authService';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@sysplanner:user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: User = JSON.parse(stored);
          setUser(parsed);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function signIn(credentials: SignInCredentials) {
    const loggedUser = await signInRequest(credentials);
    setUser(loggedUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
