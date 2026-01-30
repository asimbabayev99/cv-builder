'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function register(
  _prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  if (!email || !password || !firstName || !lastName) {
    return 'All fields are required.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }

  // Call the backend sign-up endpoint
  const res = await fetch(`${BACKEND_URL}/api/v1/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return data?.detail || 'Registration failed. Please try again.';
  }

  // Account created — sign in automatically via NextAuth credentials
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Account created but sign-in failed. Please log in manually.';
    }
    throw error;
  }
}
