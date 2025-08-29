'use client'
import { useState } from 'react'

export default function AdminLogin(){
  const [pwd,setPwd] = useState('')
  const [err,setErr] = useState('')
  async function submit(e:any){ e.preventDefault()
    const r = await fetch('/api/login', { method:'POST', body: JSON.stringify({ pwd }) })
    if(r.ok) location.href='/admin/new'; else setErr('Password errata')
  }
  return (<form onSubmit={submit} className="card" style={{maxWidth:420, margin:'40px auto'}}>
    <h2>Area Admin</h2>
    <input className="input" type="password" placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} />
    {err && <div className="tag" style={{color:'#fca5a5'}}>{err}</div>}
    <div style={{height:8}} />
    <button className="btn" type="submit">Entra</button>
  </form>)
}
