import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE = process.env.COOKIE_NAME || 'frade_admin'
const SECRET = new TextEncoder().encode(process.env.COOKIE_SECRET!)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Lascia passare la pagina di login /admin
  if (pathname === '/admin') return NextResponse.next()

  // 2) Proteggi SOLO le sotto-pagine admin (/admin/*)
  if (pathname.startsWith('/admin/')) {
    const t = req.cookies.get(COOKIE)?.value
    if (!t) return NextResponse.redirect(new URL('/admin', req.url))
    try {
      await jwtVerify(t, SECRET)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  // altro traffico passa
  return NextResponse.next()
}

// Importante: fai match sia /admin che /admin/*
export const config = { matcher: ['/admin', '/admin/:path*'] }
