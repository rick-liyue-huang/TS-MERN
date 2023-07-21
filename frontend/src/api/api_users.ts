import { IUser } from '../models/users';
import { fetchData } from './api_blogs';

export interface SignUpCredentials {
  username: string;
  email: string;
  rawPassword: string;
}

export interface SignInCredentials {
  username: string;
  rawPassword: string;
}

// match the backend route for user authentication method
export async function getSigninedUser(): Promise<IUser> {
  const response = await fetchData(`http://localhost:4000/api/users`, {
    method: 'GET',
  });
  return response.json();
}

export async function signUp(credential: SignUpCredentials): Promise<IUser> {
  const response = await fetchData(`http://localhost:4000/api/users/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  });

  return response.json();
}

export async function signIn(credential: SignInCredentials): Promise<IUser> {
  const response = await fetchData(`http://localhost:4000/api/users/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  });

  return response.json();
}

export async function signOut(): Promise<void> {
  await fetchData(`http://localhost:4000/api/users/sign-out`, {
    method: 'POST',
  });
}
