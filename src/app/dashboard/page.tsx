'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function MarketDashboardPage() {
  const [niche, setNiche] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [rawResult, setRawResult] = useState('')

  async function analyze() {
    if (!niche) return
    setLoading(true)
    setData(null)
    setRawResult('')

    try {
      const res = await fetch('/api/niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: niche, budget: 'moderado', timeframe: '6 meses', dashboardMode: true }),
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      setRawResult(result.result)

      // Try parse structured data
      try {
        const jsonMatch = result.result.match(/```json([\s\S]*?)```/)
        if (jsonMatch) setData(JSON.parse(jsonMatch[1]))
      } catch {}
    } catch (e: any) {
      setRawResult(`❌ ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const topNiches = [
    'Fritadeiras Air Fryer', 'Fones Bluetooth', 'Aspiradores robô',
    'Suplementos fitness', 'Câmeras de segurança', 'Cafeteiras',
    'Caixas de som portáteis', 'Smartwatches', 'Purificadores de água',
    'Ferramentas elétricas'
  ]

  return (
    <div className="flex min-h-screen" style={{ background: '#080810' }}>
      <Sidebar />
      <main className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 px-6 py-4 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
          <div className="text-[10px] font-mono tracking-widest text-[#FFD700] mb-0.5">◆ MARKET DASHBOARD</div>
          <h1 className="font-display text-xl font-bold text-white">Dashboard de Análise de Mercado</h1>
          <p className="text-xs text-[#4B4B60] mt-0.5">Inteligência competitiva e análise de oportunidades por nicho</p>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4" style={{ borderRight: '1px solid #1E1E30', background: '#0A0A14' }}>
            <div className="mb-4">
              <label className="text-[10px] font-mono tracking-widest text-[#3A3A55] block mb-1.5">NICHO A ANALISAR</label>
              <input value={niche} onChange={e => setNiche(e.target.value)}
                placeholder="Ex: air fryer, fones bluetooth..."
                className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#3A3A55] focus:outline-none mb-3"
                style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }} />

              <div className="text-[10px] font-mono tracking-widest text-[#3A3A55] mb-2">NICHOS POPULARES</div>
              <div className="flex flex-wrap gap-1.5">
                {topNiches.map(n => (
                  <button key={n} onClick={() => setNiche(n)}
                    className="text-[11px] px-2 py-1 rounded-lg transition-all border"
                    style={{
                      background: niche === n ? 'rgba(255,215,0,0.1)' : '#0E0E1A',
                      borderColor: niche === n ? '#FFD70040' : '#1E1E30',
                      color: niche === n ? '#FFD700' : '#4B4B60'
                    }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyze} disabled={loading || !niche}
              className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all"
              style={{
                background: loading || !niche ? '#1E1E30' : 'linear-gradient(135deg, #FFD700, #FF6B35)',
                color: loading || !niche ? '#3A3A55' : '#000',
                cursor: loading || !niche ? 'not-allowed' : 'pointer'
              }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  Analisando...
                </span>
              ) : '◆ Analisar Mercado'}
            </button>

            {/* Metrics legend */}
            <div className="mt-4 rounded-xl p-3" style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }}>
              <div className="text-[10px] font-mono text-[#FFD700] mb-2">MÉTRICAS ANALISADAS</div>
              {['Volume de busca', 'Dificuldade SERP', 'Ticket médio', 'Comissão afiliados', 'Concorrência', 'Score de oportunidade', 'Sazonalidade', 'Tendência 2026'].map(m => (
                <div key={m} className="flex items-center gap-2 py-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#FFD700]" />
                  <span className="text-[11px] text-[#4B4B60]">{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {!rawResult && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-3 opacity-10">◆</div>
                <p className="text-sm text-[#2A2A40]">Selecione ou digite um nicho para analisar o mercado</p>
              </div>
            )}
            {loading && (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-[#FFD70020] animate-spin" style={{ borderTopColor: '#FFD700' }} />
                  <div className="absolute inset-3 rounded-full border-2 border-[#FF6B3520] animate-spin" style={{ borderTopColor: '#FF6B35', animationDirection: 'reverse' }} />
                </div>
                <p className="text-sm text-[#4B4B60]">Analisando mercado de {niche}...</p>
              </div>
            )}
            {rawResult && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
                    <span className="text-sm font-display font-bold text-white">Análise: {niche}</span>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(rawResult)}
                    className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: '#6B7280' }}>
                    Copiar
                  </button>
                </div>
                <pre className="prose-review whitespace-pre-wrap font-body text-sm leading-relaxed max-w-4xl">
                  {rawResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
