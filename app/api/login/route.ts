import { NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

export async function POST(req: Request){
  const { pwd } = await req.json()
  if(pwd !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error:'bad' }, { status:401 })
  await createSession()
  return NextResponse.json({ ok:true })
}
