import { User } from './user';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}
