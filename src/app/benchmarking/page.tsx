'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

const metricCategories = [
  { id: 'traffic', label: 'Tráfego & Audiência', icon: '◈', color: '#00F5A0', desc: 'Visitas mensais, páginas/visita, tempo no site, bounce rate' },
  { id: 'seo', label: 'SEO & Palavras-chave', icon: '▣', color: '#7C6FFF', desc: 'Domain Authority, KWs rankeadas, backlinks, posições top 10' },
  { id: 'content', label: 'Estratégia de Conteúdo', icon: '✦', color: '#FF6B35', desc: 'Clusters, estrutura editorial, frequência, profundidade' },
  { id: 'monetization', label: 'Monetização', icon: '◆', color: '#FFD700', desc: 'CTAs, densidade de afiliados, modelos de receita' },
  { id: 'full', label: 'Análise Completa', icon: '⬟', color: '#FF4D8D', desc: 'Todos os módulos acima + scorecard e plano de ação' },
]

export default function BenchmarkingPage() {
  const [url, setUrl] = useState('')
  const [niche, setNiche] = useState('')
  const [category, setCategory] = useState('full')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)

  async function analyze() {
    if (!url) return
    setLoading(true)
    setResult('')
    setProgress(0)
    let p = 0
    const tick = setInterval(() => { p = Math.min(p + 1.5, 90); setProgress(p) }, 600)

    try {
      const res = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, niche, category }),
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

  const selected = metricCategories.find(m => m.id === category)!

  return (
    <div className="flex min-h-screen" style={{ background: '#080810' }}>
      <Sidebar />
      <main className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 px-6 py-4 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#7C6FFF] mb-0.5">▣ BENCHMARKING PRO</div>
              <h1 className="font-display text-xl font-bold text-white">Análise Competitiva</h1>
              <p className="text-xs text-[#4B4B60] mt-0.5">Inteligência competitiva estilo SimilarWeb + SEMrush para qualquer site review</p>
            </div>
            <div className="flex gap-2 text-[10px] font-mono text-[#3A3A55]">
              <span className="px-2 py-1 rounded-lg border border-[#1E1E30]">SimilarWeb</span>
              <span className="px-2 py-1 rounded-lg border border-[#1E1E30]">SEMrush</span>
              <span className="px-2 py-1 rounded-lg border border-[#1E1E30]">Ahrefs</span>
            </div>
          </div>
          {progress > 0 && (
            <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: '#1E1E30' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7C6FFF, #00F5A0)' }} />
            </div>
          )}
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Controls */}
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4" style={{ borderRight: '1px solid #1E1E30', background: '#0A0A14' }}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono tracking-widest text-[#3A3A55] block mb-1.5">URL DO CONCORRENTE *</label>
                <input value={url} onChange={e => setUrl(e.target.value)}
                  placeholder="https://sitedereviews.com.br"
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#3A3A55] focus:outline-none font-mono"
                  style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }} />
              </div>
              <div>
                <label className="text-[10px] font-mono tracking-widest text-[#3A3A55] block mb-1.5">NICHO DO SITE</label>
                <input value={niche} onChange={e => setNiche(e.target.value)}
                  placeholder="Ex: eletrônicos, fitness..."
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#3A3A55] focus:outline-none"
                  style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }} />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest text-[#3A3A55] block mb-2">MÓDULO DE ANÁLISE</label>
                <div className="space-y-1.5">
                  {metricCategories.map(m => (
                    <button key={m.id} onClick={() => setCategory(m.id)}
                      className="w-full text-left rounded-xl p-3 transition-all border"
                      style={{
                        background: category === m.id ? `${m.color}0A` : '#0E0E1A',
                        borderColor: category === m.id ? `${m.color}40` : '#1E1E30',
                      }}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span style={{ color: m.color }}>{m.icon}</span>
                        <span className="text-xs font-medium" style={{ color: category === m.id ? m.color : '#9B9BB0' }}>{m.label}</span>
                      </div>
                      <div className="text-[10px] text-[#3A3A55] ml-4">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={analyze} disabled={loading || !url}
                className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all"
                style={{
                  background: loading || !url ? '#1E1E30' : `linear-gradient(135deg, ${selected.color}, #7C6FFF)`,
                  color: loading || !url ? '#3A3A55' : '#000',
                  cursor: loading || !url ? 'not-allowed' : 'pointer',
                }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                    Analisando...
                  </span>
                ) : `${selected.icon} Analisar Site`}
              </button>

              {/* What we analyze */}
              <div className="rounded-xl p-3" style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }}>
                <div className="text-[10px] font-mono text-[#7C6FFF] mb-2">MÉTRICAS ANALISADAS</div>
                {[
                  '📊 Tráfego mensal estimado',
                  '🔑 Top KWs orgânicas',
                  '🔗 Perfil de backlinks',
                  '📝 Arquitetura de conteúdo',
                  '💰 Estratégia de monetização',
                  '🎯 Score de autoridade (0-100)',
                  '⚡ Gaps e oportunidades',
                  '📋 Plano de ação para superar',
                ].map(m => (
                  <div key={m} className="text-[11px] text-[#4B4B60] py-0.5">{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {result && (
              <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C6FFF]" />
                  <span className="text-xs text-[#6B7280] font-mono truncate max-w-xs">{url}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: copied ? '#00F5A0' : '#6B7280' }}>
                    {copied ? '✓ Copiado' : 'Copiar'}
                  </button>
                  <button onClick={() => {
                    const b = new Blob([result], { type: 'text/markdown' })
                    const a = document.createElement('a'); a.href = URL.createObjectURL(b)
                    a.download = `benchmark-${url.replace(/https?:\/\//, '').split('/')[0]}.md`; a.click()
                  }} className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: '#6B7280' }}>
                    ↓ .md
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6">
              {!result && !loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4 opacity-10">▣</div>
                  <p className="text-sm text-[#2A2A40] max-w-xs">
                    Informe a URL de um site concorrente e selecione o módulo de análise
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm">
                    {['tráfego estimado', 'KWs orgânicas', 'perfil de backlinks', 'monetização', 'autoridade', 'gaps de conteúdo'].map(t => (
                      <div key={t} className="text-[10px] font-mono text-[#2A2A40] px-2 py-1.5 rounded-lg border border-[#1E1E30] text-center">{t}</div>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-[#7C6FFF20] animate-spin" style={{ borderTopColor: '#7C6FFF' }} />
                    <div className="absolute inset-3 rounded-full border-2 border-[#00F5A020] animate-spin" style={{ borderTopColor: '#00F5A0', animationDirection: 'reverse' }} />
                  </div>
                  <p className="text-sm text-[#4B4B60]">Analisando {url}...</p>
                  <p className="text-xs text-[#2A2A40]">Processando métricas de tráfego, SEO e conteúdo</p>
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
