import { createCookieSessionStorage, redirect } from '@remix-run/node';
import bcrypt from 'bcryptjs';
import { prisma } from './database.server';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true, // not allow client-side JavaScript to see the cookie
  }
})

export async function register({ email, password }) {
  const user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    // const error = new Error('Email already exists');
    throw { email: 'Email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({ data: { email, password: hashedPassword } });
  return createUserSession(createdUser.id, '/expenses');
}

async function createUserSession(userId: number, redirectPath: string) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  })
}

export async function login({ email, password }) {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw { email: 'Email not found' };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw { password: 'Invalid password' };
  }

  // Create a session for the user
  return createUserSession(user.id, '/expenses');
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  const userId = session.get('userId')

  if (!userId) return null

  return prisma.user.findUnique({ where: { id: userId } })
}

export async function destroyUserSession(request, redirectPath: string) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}

export async function authGuard(request) {
  const user = await getUserFromSession(request)

  if (!user) {
    throw redirect('/auth?mode=login')
  }

  return user
}