import { NextResponse } from 'next/server'
import { supabaseAnon } from '@/lib/supabase'

export async function GET(){
  const sb = supabaseAnon()
  const { data, error } = await sb.from('recipes').select('*').order('created_at', { ascending:false })
  if(error) return NextResponse.json({ error:error.message }, { status:500 })
  return NextResponse.json(data)
}
