// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (
    data: Partial<Pick<User, 'name' | 'about' | 'avatarColor'>>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USER_STORAGE_KEY = '@sysplanner:user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (stored) {
          const parsed: User = JSON.parse(stored);
          setUser(parsed);
        } else {
          const defaultUser: User = {
            id: '1',
            name: 'Usuário SysPlanner',
            email: 'usuario@sysplanner.app',
          };
          setUser(defaultUser);
          await AsyncStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(defaultUser),
          );
        }
      } catch (error) {
        console.warn('Erro ao carregar usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function persistUser(nextUser: User | null) {
    if (nextUser) {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  // Login simples: aceita qualquer e-mail/senha e atualiza o e-mail no perfil
  async function signIn(email: string, _password: string) {
    const baseName = user?.name || 'Usuário SysPlanner';

    const authenticatedUser: User = {
      id: user?.id || '1',
      name: baseName,
      email,
      about: user?.about,
      avatarColor: user?.avatarColor,
    };

    setUser(authenticatedUser);
    await persistUser(authenticatedUser);
  }

  async function signOut() {
    setUser(null);
    await persistUser(null);
  }

  async function updateProfile(
    data: Partial<Pick<User, 'name' | 'about' | 'avatarColor'>>,
  ) {
    if (!user) return;

    const updated: User = {
      ...user,
      ...data,
    };

    setUser(updated);
    await persistUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
