'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { section: 'CORE', items: [
    { href: '/',            label: 'Dashboard',      icon: '⬡' },
  ]},
  { section: 'FERRAMENTAS', items: [
    { href: '/review',      label: 'Review Machine', icon: '◆' },
    { href: '/benchmarking',label: 'Benchmark Pro',  icon: '▣' },
    { href: '/agents',      label: 'Agentes IA',     icon: '◈' },
  ]},
]

export default function Sidebar() {
  const pathname  = usePathname()
  const [col, setCol] = useState(false)

  return (
    <aside style={{
      position:'fixed', left:0, top:0, height:'100%', zIndex:50,
      width: col ? 52 : 240,
      background:'rgba(10,11,13,0.97)',
      borderRight:'1px solid #1C1D20',
      display:'flex', flexDirection:'column',
      transition:'width .25s',
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'18px 14px 14px', borderBottom:'1px solid #1C1D20' }}>
        <div style={{ width:28, height:28, borderRadius:5, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:14, fontWeight:900, color:'#E5E7EB', background:'#1C1D20', letterSpacing:1 }}>R</div>
        {!col && (
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:13, letterSpacing:3, color:'#D1D5DB' }}>REVIEW MACHINE</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#374151', letterSpacing:'2px' }}>v3.0 · CLAUDE</div>
          </div>
        )}
        <button onClick={()=>setCol(!col)} style={{ color:'#374151', fontSize:11, marginLeft:'auto', flexShrink:0, background:'none', border:'none', cursor:'pointer' }}>
          {col ? '→' : '←'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, overflowY:'auto', padding:'12px 8px' }}>
        {nav.map(section => (
          <div key={section.section} style={{ marginBottom:16 }}>
            {!col && (
              <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'3px', color:'#374151', padding:'0 6px', marginBottom:6, textTransform:'uppercase' }}>
                {section.section}
              </div>
            )}
            {section.items.map(item => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href}
                  style={{
                    display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
                    borderRadius:5, marginBottom:2, textDecoration:'none',
                    background: active ? 'rgba(55,65,81,0.25)' : 'transparent',
                    border: `1px solid ${active ? '#2D2F34' : 'transparent'}`,
                    transition:'all .15s',
                    position:'relative',
                  }}>
                  {active && <span style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:2, height:14, background:'#6B7280', borderRadius:1 }} />}
                  <span style={{ fontSize:13, color: active ? '#D1D5DB' : '#4B5563', flexShrink:0 }}>{item.icon}</span>
                  {!col && (
                    <span style={{ fontSize:12, fontWeight:600, color: active ? '#E5E7EB' : '#6B7280', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {item.label}
                    </span>
                  )}
                  {!col && active && <span style={{ marginLeft:'auto', width:5, height:5, borderRadius:'50%', background:'#6B7280', flexShrink:0 }} />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding:'10px 10px 12px', borderTop:'1px solid #1C1D20' }}>
        {!col ? (
          <>
            <div style={{ background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:5, padding:'8px 10px', marginBottom:6 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#6B7280', display:'inline-block', animation:'pulse 2s infinite' }} />
                <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#9CA3AF', letterSpacing:'2px' }}>GEMINI ONLINE</span>
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#374151' }}>gemini-2.0-flash</div>
            </div>
            <button onClick={async()=>{await fetch('/api/auth',{method:'DELETE'}); window.location.href='/login'}}
              style={{ width:'100%', padding:'7px', borderRadius:5, border:'1px solid #1C1D20', background:'transparent', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'2px', color:'#374151', cursor:'pointer' }}>
              ⏻ SAIR
            </button>
          </>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#6B7280', display:'inline-block' }} />
            <button onClick={async()=>{await fetch('/api/auth',{method:'DELETE'}); window.location.href='/login'}}
              style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#374151', background:'none', border:'none', cursor:'pointer' }}>⏻</button>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </aside>
  )
}
