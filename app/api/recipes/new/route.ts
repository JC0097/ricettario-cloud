import { NextResponse } from 'next/server'
import { isAdmin } from '../../../../lib/auth'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(req: Request){
  if(!(await isAdmin())) return NextResponse.json({ error:'unauthorized' }, { status:401 })

  const form = await req.formData()
  const file = form.get('file') as File
  const title = String(form.get('title')||'')
  const course = String(form.get('course')||'altro')
  const main = String(form.get('main')||'veggie')
  const temp = String(form.get('temp')||'freddo')
  const tags = String(form.get('tags')||'').split(',').map(s=>s.trim()).filter(Boolean)

  if(!file || file.type !== 'application/pdf') return NextResponse.json({ error:'PDF required' }, { status:400 })

  const sb = supabaseAdmin()
  const filename = crypto.randomUUID()+'.pdf'
  const now = new Date()
  const path = `recipes/${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${filename}`

  const { error: upErr } = await sb.storage.from('recipes').upload(path, await file.arrayBuffer(), {
    contentType: 'application/pdf', upsert: false
  })
  if(upErr) return NextResponse.json({ error: upErr.message }, { status:500 })

  const { data: pub } = sb.storage.from('recipes').getPublicUrl(path)

  const { data, error } = await sb.from('recipes').insert({
    title, course, main, temp, tags, file_path: path, file_url: pub?.publicUrl
  }).select().single()

  if(error) return NextResponse.json({ error:error.message }, { status:500 })
  return NextResponse.json(data)
}
