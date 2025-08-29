import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
const COOKIE = process.env.COOKIE_NAME || 'frade_admin'
const SECRET = new TextEncoder().encode(process.env.COOKIE_SECRET!)

export async function middleware(req: NextRequest){
  const isAdminArea = req.nextUrl.pathname.startsWith('/admin')
  if(!isAdminArea) return NextResponse.next()
  const t = req.cookies.get(COOKIE)?.value
  if(!t) return NextResponse.redirect(new URL('/admin', req.url))
  try { await jwtVerify(t, SECRET); return NextResponse.next() }
  catch { return NextResponse.redirect(new URL('/admin', req.url)) }
}

export const config = { matcher: ['/admin/:path*'] }
