'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

const categories = [
  'Eletrônicos e Gadgets', 'Casa e Jardim', 'Fitness e Saúde', 'Beleza e Cuidados',
  'Pets', 'Brinquedos e Kids', 'Automotivo', 'Ferramentas', 'Moda e Acessórios',
  'Alimentação e Dieta', 'Esportes', 'Tecnologia / Software', 'Educação', 'Finanças pessoais'
]

export default function NicheAnalyzerPage() {
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  async function analyze() {
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/niche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, budget, timeframe }),
      })
      const data = await res.json()
      if (data.error) setResult(`❌ Erro: ${data.error}`)
      else setResult(data.result)
    } catch (e: any) {
      setResult(`❌ Erro: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <Sidebar />
      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-shrink-0 p-6 border-b border-[#2A2A3E]">
          <div className="text-[10px] font-mono text-[#FF6B35] tracking-widest mb-1">◈ NICHE ANALYZER</div>
          <h1 className="font-display text-2xl font-bold text-white">Análise de Micro Nichos</h1>
          <p className="text-sm text-[#6B7280] mt-1">Descobre os nichos mais lucrativos para seu site review</p>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Controls */}
          <div className="w-80 flex-shrink-0 border-r border-[#2A2A3E] p-5 overflow-y-auto">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-mono text-[#6B7280] tracking-widest block mb-3">CATEGORIA / SEGMENTO</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setCategory('')}
                    className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-all
                      ${!category ? 'bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30' : 'text-[#9B9BB0] hover:bg-[#1A1A26] border border-transparent'}`}
                  >
                    🌐 Todos os segmentos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left text-xs rounded-lg px-3 py-2 transition-all
                        ${category === cat ? 'bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30' : 'text-[#9B9BB0] hover:bg-[#1A1A26] border border-transparent'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#6B7280] tracking-widest block mb-2">ORÇAMENTO INICIAL</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#1A1A26] border border-[#2A2A3E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="">Selecione...</option>
                  <option value="zero - bootstrap puro">R$ 0 - Bootstrap puro</option>
                  <option value="baixo - até R$ 200/mês">R$ 200/mês</option>
                  <option value="médio - até R$ 500/mês">R$ 500/mês</option>
                  <option value="moderado - até R$ 1.000/mês">R$ 1.000/mês</option>
                  <option value="alto - acima de R$ 2.000/mês">R$ 2.000+/mês</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#6B7280] tracking-widest block mb-2">PRAZO DE RETORNO</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-[#1A1A26] border border-[#2A2A3E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="">Selecione...</option>
                  <option value="1-2 meses (curto prazo agressivo)">1-2 meses</option>
                  <option value="3-6 meses (recomendado)">3-6 meses (recomendado)</option>
                  <option value="6-12 meses (crescimento sólido)">6-12 meses</option>
                  <option value="12+ meses (autoridade de longo prazo)">12+ meses</option>
                </select>
              </div>

              <button
                onClick={analyze}
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all
                  ${loading ? 'bg-[#2A2A3E] text-[#4B4B60] cursor-not-allowed' : 'bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-black hover:opacity-90'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Analisando...
                  </span>
                ) : '◈ Analisar Nichos'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 overflow-y-auto">
            {result && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-[#2A2A3E] bg-[#0D0D16] sticky top-0">
                <span className="text-xs text-[#6B7280]">Análise concluída</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                  className="glass px-3 py-1.5 rounded-lg text-xs text-[#9B9BB0] hover:text-white transition-colors"
                >
                  {copied ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
            )}
            <div className="p-6">
              {!result && !loading && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4 opacity-20">◈</div>
                  <p className="text-sm text-[#2A2A3E]">Configure os filtros e clique em Analisar Nichos</p>
                </div>
              )}
              {loading && (
                <div className="h-64 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-2 border-[#2A2A3E] border-t-[#FF6B35] rounded-full animate-spin" />
                  <p className="text-sm text-[#6B7280]">Analisando mercado com Groq...</p>
                </div>
              )}
              {result && (
                <pre className="whitespace-pre-wrap font-body text-sm text-[#C8C8D8] leading-relaxed max-w-4xl">
                  {result}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
