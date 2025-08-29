'use client'
import { useState } from 'react'

export default function NewRecipe(){
  const [file,setFile] = useState<File|null>(null)
  const [title,setTitle] = useState('')
  const [course,setCourse] = useState('altro')
  const [main,setMain] = useState('veggie')
  const [temp,setTemp] = useState('freddo')
  const [tags,setTags] = useState('')

  async function save(){
    if(!file){ alert('Carica un PDF'); return }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title)
    fd.append('course', course)
    fd.append('main', main)
    fd.append('temp', temp)
    fd.append('tags', tags)
    const r = await fetch('/api/recipes/new', { method:'POST', body: fd })
    if(r.ok) location.href='/'; else alert('Errore upload')
  }

  return (<div className="card" style={{maxWidth:700, margin:'20px auto'}}>
    <h2>Nuova ricetta (PDF)</h2>
    <input className="input" placeholder="Titolo" value={title} onChange={e=>setTitle(e.target.value)} />
    <div className="grid grid-3">
      <select className="select" value={course} onChange={e=>setCourse(e.target.value)}>
        {['primo','secondo','contorno','bevanda','rub','salsa','altro'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
      <select className="select" value={main} onChange={e=>setMain(e.target.value)}>
        {['carne','pesce','veggie'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
      <select className="select" value={temp} onChange={e=>setTemp(e.target.value)}>
        {['caldo','freddo'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
    <input className="input" placeholder="tag (virgole)" value={tags} onChange={e=>setTags(e.target.value)} />
    <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />
    <div style={{height:8}} />
    <button className="btn" onClick={save}>Carica</button>
  </div>)
}
