'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

const minds = [
  { id: 'diggity', name: 'Matt Diggity', label: 'Affiliate Lab', icon: '🔬', color: '#00F5A0', desc: 'Test-based SEO. No-hat approach. LeadSpring Grading.' },
  { id: 'spencer', name: 'Spencer Haws', label: 'Niche Pursuits', icon: '🔎', color: '#7C6FFF', desc: 'Long Tail Pro. Low-competition micro niches first.' },
  { id: 'ah', name: 'Authority Hacker', label: 'Gael + Mark', icon: '🧱', color: '#FF6B35', desc: 'Authority sites. Wikipedia do seu nicho + affiliate links.' },
  { id: 'doug', name: 'Doug Cunnington', label: 'Niche Site Project', icon: '🐶', color: '#FFD700', desc: 'Keyword Golden Ratio. Dados reais. Fracassos incluídos.' },
  { id: 'income', name: 'Income School', label: 'Jim + Ricky', icon: '🏗️', color: '#FF4D8D', desc: 'Projeto 24. Blogging honesto. Paixão + demanda.' },
  { id: 'miles', name: 'Miles Beckler', label: 'Miles Beckler', icon: '🎙️', color: '#00F5A0', desc: '1.000 posts honestos. Volume + consistência.' },
  { id: 'shoe', name: 'Jeremy Schoemaker', label: 'Shoemoney', icon: '💻', color: '#7C6FFF', desc: 'Pioneiro do AdSense. Cheque de $132k. Diversificação.' },
]

const modes = [
  { id: 'evaluate', label: 'Avaliar Nicho', icon: '⚖️', color: '#00F5A0', placeholder: 'Ex: suplementos para cabelo, robô de cozinha, colchão ortopédico...', desc: 'Submeta um nicho — o conselho vota e entrega veredicto' },
  { id: 'hunt', label: 'Caçar Micro Nichos', icon: '🎯', color: '#FF6B35', placeholder: 'Ex: casa e decoração, pets, tecnologia, fitness...', desc: 'Dê uma categoria — o conselho caça 12 micro nichos vencedores' },
  { id: 'guide', label: 'Guiar o SaaS', icon: '🗺️', color: '#7C6FFF', placeholder: '(não precisa digitar nada — o conselho analisa o SaaS automaticamente)', desc: 'O conselho orienta as próximas evoluções do Review Machine' },
  { id: 'chat', label: 'Perguntar ao Conselho', icon: '💬', color: '#FF4D8D', placeholder: 'Ex: Qual o melhor nicho para começar com R$0? Como rankear review em 2025?', desc: 'Pergunte qualquer coisa — o conselho responde com experiência real' },
]

export default function MastermindsPage() {
  const [mode, setMode] = useState('evaluate')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)

  const selectedMode = modes.find(m => m.id === mode)!

  async function consult() {
    if (mode !== 'guide' && !input.trim()) return
    setLoading(true)
    setResult('')
    setProgress(0)
    let p = 0
    const tick = setInterval(() => { p = Math.min(p + 1.2, 88); setProgress(p) }, 500)

    try {
      const res = await fetch('/api/masterminds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, input }),
      })
      const data = await res.json()
      clearInterval(tick)
      setProgress(100)
      setTimeout(() => setProgress(0), 800)
      setResult(data.error ? `❌ ${data.error}` : data.result)
    } catch (e: any) {
      clearInterval(tick)
      setResult(`❌ ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#080810' }}>
      <Sidebar />
      <main className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#FF4D8D] mb-0.5">⬟ MASTERMIND COUNCIL</div>
              <h1 className="font-display text-xl font-bold text-white">7 Mentes do SEO de Afiliados</h1>
              <p className="text-xs text-[#4B4B60] mt-0.5">Matt Diggity · Spencer Haws · Authority Hacker · Doug Cunnington · Income School · Miles Beckler · Shoemoney</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-[#3A3A55]">CONSELHO ATIVO</div>
              <div className="flex gap-1 mt-1 justify-end">
                {minds.map(m => (
                  <div key={m.id} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                    style={{ background: `${m.color}20`, border: `1px solid ${m.color}40` }} title={m.name}>
                    {m.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {progress > 0 && (
            <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: '#1E1E30' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF4D8D, #7C6FFF, #00F5A0)' }} />
            </div>
          )}
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left panel */}
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4 space-y-4" style={{ borderRight: '1px solid #1E1E30', background: '#0A0A14' }}>

            {/* Mode selector */}
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#3A3A55] mb-2">MODO DE CONSULTA</div>
              <div className="space-y-1.5">
                {modes.map(m => (
                  <button key={m.id} onClick={() => { setMode(m.id); setInput(''); setResult('') }}
                    className="w-full text-left rounded-xl p-3 transition-all border"
                    style={{
                      background: mode === m.id ? `${m.color}0A` : '#0E0E1A',
                      borderColor: mode === m.id ? `${m.color}40` : '#1E1E30',
                    }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{m.icon}</span>
                      <span className="text-xs font-medium" style={{ color: mode === m.id ? m.color : '#9B9BB0' }}>{m.label}</span>
                    </div>
                    <div className="text-[10px] text-[#3A3A55] ml-5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            {mode !== 'guide' && (
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#3A3A55] mb-1.5">
                  {mode === 'evaluate' ? 'NICHO PARA AVALIAR' : mode === 'hunt' ? 'CATEGORIA / SETOR' : 'SUA PERGUNTA'}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder={selectedMode.placeholder}
                  rows={3}
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#3A3A55] focus:outline-none resize-none"
                  style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }} />
              </div>
            )}

            <button onClick={consult} disabled={loading || (mode !== 'guide' && !input.trim())}
              className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all"
              style={{
                background: (loading || (mode !== 'guide' && !input.trim())) ? '#1E1E30' : `linear-gradient(135deg, ${selectedMode.color}, #7C6FFF)`,
                color: (loading || (mode !== 'guide' && !input.trim())) ? '#3A3A55' : '#000',
                cursor: (loading || (mode !== 'guide' && !input.trim())) ? 'not-allowed' : 'pointer',
              }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  Consultando...
                </span>
              ) : `${selectedMode.icon} Consultar Conselho`}
            </button>

            {/* Council cards */}
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#3A3A55] mb-2">AS 7 MENTES</div>
              <div className="space-y-1.5">
                {minds.map(m => (
                  <div key={m.id} className="rounded-lg p-2.5" style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{m.icon}</span>
                      <span className="text-xs font-medium" style={{ color: m.color }}>{m.name}</span>
                    </div>
                    <div className="text-[10px] text-[#3A3A55]">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {result && (
              <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D8D]" />
                  <span className="text-xs text-[#6B7280] font-mono">
                    {mode === 'evaluate' ? `Avaliação: ${input}` : mode === 'hunt' ? `Caça: ${input}` : mode === 'guide' ? 'Guia do SaaS' : `Chat: ${input.slice(0, 40)}...`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: copied ? '#00F5A0' : '#6B7280' }}>
                    {copied ? '✓ Copiado' : 'Copiar'}
                  </button>
                  <button onClick={() => {
                    const b = new Blob([result], { type: 'text/markdown' })
                    const a = document.createElement('a'); a.href = URL.createObjectURL(b)
                    a.download = `mastermind-${mode}-${Date.now()}.md`; a.click()
                  }} className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: '#6B7280' }}>
                    ↓ .md
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              {!result && !loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-6 opacity-20">⬟</div>
                  <p className="text-sm text-[#2A2A40] max-w-xs mb-6">
                    O conselho está pronto. Selecione um modo, insira seu input e consulte as 7 mentes.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {[
                      { t: 'Avalie "colchão ortopédico"', m: 'evaluate', i: 'colchão ortopédico' },
                      { t: 'Caçar nichos em "pets"', m: 'hunt', i: 'pets' },
                      { t: 'Guiar o SaaS', m: 'guide', i: '' },
                      { t: 'Melhor nicho com R$0?', m: 'chat', i: 'Qual o melhor nicho para começar com R$0 e site novo?' },
                    ].map(ex => (
                      <button key={ex.t} onClick={() => { setMode(ex.m); setInput(ex.i); }}
                        className="text-left text-xs p-3 rounded-xl border border-[#1E1E30] hover:border-[#2A2A45] transition-colors text-[#4B4B60] hover:text-[#9B9BB0]">
                        {ex.t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-3">
                    {minds.slice(0, 4).map((m, i) => (
                      <div key={m.id} className="w-10 h-10 rounded-full flex items-center justify-center text-lg animate-pulse"
                        style={{ background: `${m.color}15`, border: `1px solid ${m.color}30`, animationDelay: `${i * 150}ms` }}>
                        {m.icon}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#4B4B60]">As 7 mentes estão deliberando...</p>
                  <p className="text-xs text-[#2A2A40]">Analisando com metodologias reais de Matt Diggity, Spencer Haws e o conselho completo</p>
                </div>
              ) : (
                <pre className="prose-review whitespace-pre-wrap font-body text-sm leading-relaxed max-w-4xl">{result}</pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
