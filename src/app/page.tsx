'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.4 + 0.08,
    }))
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(160,165,175,${p.o})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++)
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y
          const d = Math.sqrt(dx*dx+dy*dy)
          if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(120,125,135,${0.06*(1-d/100)})`; ctx.lineWidth=0.4; ctx.stroke() }
        }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
}

const steps = [
  { n:'01', t:'Analise o nicho',        d:'Agentes IA → nicho → 15 oportunidades rankeadas com todas as métricas',              href:'/agents',      icon:'◉' },
  { n:'02', t:'Benchmark os líderes',   d:'Benchmark Pro → URL do concorrente → análise estilo SimilarWeb + SEMrush',            href:'/benchmarking', icon:'▣' },
  { n:'03', t:'Gere os artigos',        d:'Review Machine → produto → pilar 8k + cluster de 6 satélites prontos para publicar', href:'/review',      icon:'◆' },
  { n:'04', t:'Automatize com agentes', d:'Agentes IA → pipeline completo → relatório profundo de mercado em minutos',           href:'/agents',      icon:'◈' },
]

const modules = [
  { href:'/review',       icon:'◆', label:'Review Machine',  desc:'Artigo pilar 7–8.5k palavras em 5 partes + 6 satélites. Prompt maximizado v3.' },
  { href:'/benchmarking', icon:'▣', label:'Benchmark Pro',   desc:'Análise competitiva estilo SimilarWeb + SEMrush + Ahrefs. Scorecard completo.' },
  { href:'/agents',       icon:'◈', label:'Agentes IA',      desc:'Pipeline completo · Análise de nicho · The Council · Benchmark. Tudo em um lugar.' },
]

export default function Home() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#111214', position:'relative' }}>
      <Sidebar />
      <main style={{ marginLeft:240, flex:1, overflowY:'auto', position:'relative' }}>

        {/* Hero */}
        <div style={{ position:'relative', padding:'72px 56px 56px', borderBottom:'1px solid #1C1D20', overflow:'hidden', minHeight:320 }}>
          <Particles />
          {/* Vinheta */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%, rgba(55,65,81,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'4px', color:'#374151', marginBottom:20, textTransform:'uppercase' }}>
              ◈ BY MAICKNUCLEAR · GEMINI CONNECTED
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(42px,6vw,72px)', lineHeight:.95, letterSpacing:3, color:'#D1D5DB', marginBottom:20 }}>
              REVIEW MACHINE<br /><span style={{ color:'#F9FAFB' }}>BY MAICKNUCLEAR</span>
            </h1>
            <p style={{ color:'#4B5563', fontSize:15, maxWidth:500, lineHeight:1.7, fontFamily:'var(--font-body)' }}>
              Plataforma de autoridade para sites review. Artigos 8k, benchmarking competitivo e agentes de inteligência de mercado.
            </p>
            <div style={{ display:'flex', gap:32, marginTop:32 }}>
              {[['3','Ferramentas'],['8.5k','Palavras/Pilar'],['6','Satélites'],['7','Mentes no Council']].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:26, color:'#9CA3AF', letterSpacing:1 }}>{v}</div>
                  <div style={{ fontSize:10, color:'#374151', fontFamily:'var(--font-mono)', letterSpacing:'1px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:'40px 56px' }}>
          {/* Módulos */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:32 }}>
            {modules.map(m => (
              <Link key={m.href} href={m.href} style={{ textDecoration:'none' }}>
                <div style={{ background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:8, padding:'20px', transition:'border-color .15s', cursor:'pointer' }}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='#2D2F34')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='#1C1D20')}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:18, color:'#4B5563' }}>{m.icon}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#374151' }}>→</span>
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:2, color:'#D1D5DB', marginBottom:8 }}>{m.label}</div>
                  <div style={{ fontSize:12, color:'#4B5563', lineHeight:1.6 }}>{m.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Fluxo recomendado */}
          <div style={{ background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:8, padding:'24px 28px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#4B5563' }}>⚡</span>
              <div style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:3, color:'#9CA3AF' }}>FLUXO RECOMENDADO</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {steps.map(s => (
                <Link key={s.n} href={s.href} style={{ textDecoration:'none' }}>
                  <div style={{ padding:'14px', border:'1px solid #1C1D20', borderRadius:6, background:'#111214', transition:'border-color .15s' }}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor='#2D2F34')}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor='#1C1D20')}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#374151', marginBottom:8 }}>{s.n}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:'#9CA3AF', marginBottom:6, letterSpacing:'.3px' }}>{s.t}</div>
                    <div style={{ fontSize:11, color:'#374151', lineHeight:1.5 }}>{s.d}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
