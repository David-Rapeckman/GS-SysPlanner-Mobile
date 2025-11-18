import { SignInCredentials } from '../types/auth';
import { User } from '../types/user';
// import { api } from './api';

export async function signInRequest(
  credentials: SignInCredentials,
): Promise<User> {
  // Quando o backend estiver pronto, troque pela chamada real:
  // const response = await api.post<User>('/auth/login', credentials);
  // return response.data;

  const { email } = credentials;

  return {
    id: '1',
    name: 'SysPlanner User',
    email,
  };
}
