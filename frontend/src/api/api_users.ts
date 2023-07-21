import { IUser } from '../models/users';
import { fetchData } from './api_blogs';

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

// match the backend route for user authentication method
export async function getSigninedUser(): Promise<IUser> {
  const response = await fetchData(`http://localhost:4000/api/users`, {
    method: 'GET',
  });
  return response.json();
}

export async function signUp(credential: SignupCredentials): Promise<IUser> {
  const response = await fetchData(`http://localhost:4000/api/users/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  });

  return response.json();
}

export async function signIn(credential: SigninCredentials): Promise<IUser> {
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
