'use client'
import useSWR from 'swr'
import { useState, useMemo } from 'react'
const fetcher = (u:string)=> fetch(u).then(r=>r.json())

export default function Home(){
  const { data } = useSWR('/api/recipes', fetcher)
  const [course,setCourse] = useState('')
  const [main,setMain] = useState('')
  const [temp,setTemp] = useState('')
  const [q,setQ] = useState('')
  const filtered = useMemo(()=> (data||[]).filter((r:any)=>
    (!course || r.course===course) && (!main || r.main===main) && (!temp || r.temp===temp) &&
    (!q || r.title.toLowerCase().includes(q.toLowerCase()))
  ), [data,course,main,temp,q])

  return (<div>
    <h1>Ricettario (PDF)</h1>
    <div className="grid grid-4">
      <input className="input" placeholder="Cerca titolo..." value={q} onChange={e=>setQ(e.target.value)} />
      <select className="select" value={course} onChange={e=>setCourse(e.target.value)}>
        <option value="">Portata</option>
        {['primo','secondo','contorno','bevanda','rub','salsa','altro'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
      <select className="select" value={main} onChange={e=>setMain(e.target.value)}>
        <option value="">Main</option>
        {['carne','pesce','veggie'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
      <select className="select" value={temp} onChange={e=>setTemp(e.target.value)}>
        <option value="">Servizio</option>
        {['caldo','freddo'].map(o=>(<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
    <div style={{height:8}} />
    <div className="grid" style={{gap:12}}>
      {filtered?.map((r:any)=>(
        <div key={r.id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{r.title}</div>
              <div className="small">{r.course} • {r.main} • {r.temp}</div>
              {r.tags?.length? <div className="tag">#{r.tags.join(' #')}</div> : null}
            </div>
            <a className="btn" href={r.file_url} target="_blank">Apri PDF</a>
          </div>
        </div>
      ))}
      {!filtered?.length && <div className="small">Nessuna ricetta trovata.</div>}
    </div>
    <div style={{height:16}} />
    <div className="small">Area admin: <a href="/admin">/admin</a></div>
  </div>)
}
