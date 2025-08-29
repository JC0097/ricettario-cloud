import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
const COOKIE = process.env.COOKIE_NAME || 'frade_admin'
const SECRET = new TextEncoder().encode(process.env.COOKIE_SECRET!)

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(SECRET)
  cookies().set(COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
}

export async function isAdmin() {
  const t = cookies().get(COOKIE)?.value
  if(!t) return false
  try { const { payload } = await jwtVerify(t, SECRET); return payload.role === 'admin' } catch { return false }
}
