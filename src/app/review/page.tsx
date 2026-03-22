'use client'
import { useState, useRef } from 'react'
import Sidebar from '@/components/Sidebar'

type ReviewType = 'pilar' | 'satellite' | 'cluster' | 'comparativo' | 'seo'

const satelliteLabels = [
  { i: 0, label: 'Satélite 1 — Funciona mesmo? Teste real' },
  { i: 1, label: 'Satélite 2 — Vale a pena em 2026?' },
  { i: 2, label: 'Satélite 3 — É confiável ou é golpe?' },
  { i: 3, label: 'Satélite 4 — Resultados reais e experiência' },
  { i: 4, label: 'Satélite 5 — Reclamações: o que ninguém fala' },
  { i: 5, label: 'Satélite 6 — Melhor alternativa no mercado' },
]

const typeConfig: Record<ReviewType, { label: string; size: string; emoji: string; desc: string }> = {
  pilar:       { label: 'Artigo Pilar',       size: '7–8.5k palavras',      emoji: '🏛', desc: 'Hub central — 5 partes' },
  satellite:   { label: 'Artigo Satélite',    size: '3.5–4k palavras',      emoji: '🛸', desc: 'Resolve 1 objeção' },
  comparativo: { label: 'Comparativo',         size: '5–6k palavras',        emoji: '⚖️', desc: 'Múltiplos produtos' },
  cluster:     { label: 'Plano de Cluster',    size: 'Pilar + 6 satélites',  emoji: '🌐', desc: 'Ecossistema completo' },
  seo:         { label: 'Pack SEO Técnico',    size: 'Slug + Meta + KWs',    emoji: '🔍', desc: 'JSON estruturado' },
}

// ── SEO Pack display ──────────────────────────────────────────────
function SEOPackDisplay({ data }: { data: any }) {
  if (!data) return null
  return (
    <div className="space-y-5 p-6">
      {/* Produto */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px' }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>PRODUTO IDENTIFICADO</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-display)', letterSpacing: 1 }}>{data.produto_nome}</div>
      </div>
      {/* Slug + KW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 5 }}>KW PRINCIPAL</div>
          <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{data.keyword_principal}</div>
        </div>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 5 }}>SLUG</div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{data.slug}</div>
        </div>
      </div>
      {/* Meta */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 5 }}>
          META DESCRIPTION <span style={{ color: 'var(--text-muted)' }}>({(data.meta_description || '').length} chars)</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{data.meta_description}</div>
      </div>
      {/* H1s */}
      {data.h1_opcoes?.length > 0 && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>OPÇÕES DE H1</div>
          {data.h1_opcoes.map((h: string, i: number) => (
            <div key={i} style={{ padding: '6px 0', borderBottom: i < data.h1_opcoes.length - 1 ? '1px solid var(--border)' : 'none', fontSize: 13, color: 'var(--text)' }}>
              <span style={{ color: 'var(--gold-dim)', fontFamily: 'var(--font-mono)', fontSize: 10, marginRight: 8 }}>{i + 1}</span>{h}
            </div>
          ))}
        </div>
      )}
      {/* KWs fundo de funil */}
      {data.keywords_fundo_funil?.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>KEYWORDS FUNDO DE FUNIL</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.keywords_fundo_funil.map((k: string, i: number) => (
              <span key={i} style={{ background: 'rgba(200,168,75,0.08)', border: '1px solid var(--gold-dim)', borderRadius: 20, padding: '3px 10px', fontSize: 11, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>{k}</span>
            ))}
          </div>
        </div>
      )}
      {/* Termos semânticos */}
      {data.termos_semanticos?.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>
            TERMOS SEMÂNTICOS ({data.termos_semanticos.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {data.termos_semanticos.map((t: string, i: number) => (
              <span key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Ecosystem map ─────────────────────────────────────────────────
const ecosystemNodes = [
  { id: 'pilar',   label: 'Artigo Pilar', size: '7-8.5k', hub: true },
  { id: 'sat0',    label: 'Funciona mesmo?' },
  { id: 'sat1',    label: 'Vale a pena?' },
  { id: 'sat2',    label: 'É confiável?' },
  { id: 'sat3',    label: 'Resultados reais' },
  { id: 'sat4',    label: 'Reclamações' },
  { id: 'sat5',    label: 'Alternativas' },
  { id: 'seo',     label: 'Pack SEO' },
]

export default function ReviewPage() {
  const [type, setType]                   = useState<ReviewType>('pilar')
  const [satIdx, setSatIdx]               = useState(0)
  const [name, setName]                   = useState('')
  const [link, setLink]                   = useState('')
  const [comparativeLinks, setComparativeLinks] = useState('')
  const [loading, setLoading]             = useState(false)
  const [output, setOutput]               = useState('')
  const [seoData, setSeoData]             = useState<any>(null)
  const [words, setWords]                 = useState(0)
  const [copied, setCopied]               = useState(false)
  const [progress, setProgress]           = useState(0)
  const [doneNodes, setDoneNodes]         = useState<Set<string>>(new Set())
  const progressRef                       = useRef<NodeJS.Timeout>()

  function startProgress() {
    setProgress(0)
    let p = 0
    progressRef.current = setInterval(() => {
      p += Math.random() * 1.5
      if (p > 88) p = 88
      setProgress(p)
    }, 900)
  }
  function stopProgress() {
    clearInterval(progressRef.current)
    setProgress(100)
    setTimeout(() => setProgress(0), 900)
  }

  async function generate() {
    if (!name && !link) return
    setLoading(true)
    setOutput('')
    setSeoData(null)
    setWords(0)
    startProgress()

    try {
      // ── SEO Pack — não usa streaming ──────────────
      if (type === 'seo') {
        const res = await fetch('/api/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName: name, productLink: link, type }),
        })
        const json = await res.json()
        if (json.seoData) {
          setSeoData(json.seoData)
          setDoneNodes(prev => new Set([...prev, 'seo']))
        } else if (json.raw) {
          setOutput(json.raw)
        }
        return
      }

      // ── Streaming para todos os outros tipos ──────
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: name, productLink: link, comparativeLinks, type, satelliteIndex: satIdx }),
      })

      if (!res.ok) {
        const err = await res.json()
        setOutput(`❌ ${err.error}`)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const text = JSON.parse(data).choices?.[0]?.delta?.content || ''
            full += text
            setOutput(full)
            setWords(full.split(/\s+/).filter(Boolean).length)
          } catch {}
        }
      }

      // Marcar nó como concluído
      const nodeId = type === 'satellite' ? `sat${satIdx}` : type
      setDoneNodes(prev => new Set([...prev, nodeId]))

    } catch (e: any) {
      setOutput(`❌ Erro: ${e.message}`)
    } finally {
      setLoading(false)
      stopProgress()
    }
  }

  const currentNodeId = type === 'satellite' ? `sat${satIdx}` : type
  const hasOutput = output || seoData

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />

      <main className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">

        {/* ── Top bar ───────────────────────────────── */}
        <div className="flex-shrink-0 px-6 py-4 border-b" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '3px', color: 'var(--gold)', marginBottom: 3 }}>
                ◆ SITE REVIEW MILIONÁRIO
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 2, color: '#fff' }}>
                MÁQUINA DE REVIEWS
              </h1>
            </div>
            {words > 0 && (
              <div className="text-center px-4 py-2 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)', letterSpacing: 1 }}>
                  {words.toLocaleString('pt-BR')}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>PALAVRAS</div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))' }} />
            </div>
          )}
        </div>

        {/* ── Body ──────────────────────────────────── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── Controls panel ────────────────────── */}
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4 space-y-4" style={{ borderRight: '1px solid var(--border)', background: 'var(--bg2)' }}>

            {/* Tipo de artigo */}
            <div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                TIPO DE ENTREGA
              </div>
              <div className="space-y-1.5">
                {(Object.entries(typeConfig) as [ReviewType, typeof typeConfig.pilar][]).map(([t, cfg]) => (
                  <button key={t} onClick={() => setType(t)}
                    className="w-full text-left rounded-lg p-3 transition-all border flex items-center gap-3"
                    style={{
                      background: type === t ? 'rgba(200,168,75,0.08)' : 'var(--bg)',
                      borderColor: type === t ? 'var(--gold)' : 'var(--border)',
                    }}>
                    <span style={{ fontSize: 18 }}>{cfg.emoji}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: type === t ? 'var(--gold-light)' : 'var(--text-dim)' }}>{cfg.label}</div>
                      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: type === t ? 'var(--gold-dim)' : 'var(--text-muted)' }}>{cfg.size}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Satélite picker */}
            {type === 'satellite' && (
              <div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                  SATÉLITE
                </div>
                <div className="space-y-1">
                  {satelliteLabels.map(s => (
                    <button key={s.i} onClick={() => setSatIdx(s.i)}
                      className="w-full text-left rounded-lg px-3 py-2 transition-all border"
                      style={{
                        background: satIdx === s.i ? 'rgba(200,168,75,0.08)' : 'var(--bg)',
                        borderColor: satIdx === s.i ? 'var(--gold)' : 'var(--border)',
                        fontSize: 11,
                        color: satIdx === s.i ? 'var(--gold-light)' : 'var(--text-muted)',
                      }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                  NOME DO PRODUTO
                </label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Ex: Multi Processador de Alimentos"
                  style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'var(--font-body)' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                  LINK AFILIADO
                </label>
                <textarea value={link} onChange={e => setLink(e.target.value)}
                  placeholder="https://mercadolivre.com.br/..."
                  rows={3} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--text)', outline: 'none', resize: 'none', fontFamily: 'var(--font-mono)' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              {type === 'comparativo' && (
                <div>
                  <label style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>
                    LINKS DOS PRODUTOS (um por linha)
                  </label>
                  <textarea value={comparativeLinks} onChange={e => setComparativeLinks(e.target.value)}
                    placeholder={'https://produto1.com\nhttps://produto2.com'}
                    rows={4} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--text)', outline: 'none', resize: 'none', fontFamily: 'var(--font-mono)' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              )}

              <button onClick={generate} disabled={loading || (!name && !link)}
                style={{
                  width: '100%', padding: '14px', borderRadius: 8, border: 'none',
                  fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 3,
                  background: loading || (!name && !link) ? 'var(--border)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                  color: loading || (!name && !link) ? 'var(--text-muted)' : '#000',
                  cursor: loading || (!name && !link) ? 'not-allowed' : 'pointer',
                  transition: 'opacity .2s',
                }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                    GERANDO...
                  </span>
                ) : '◆ GERAR'}
              </button>
            </div>

            {/* Ecossistema map */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
                ECOSSISTEMA
              </div>
              <div className="space-y-1">
                {ecosystemNodes.map(n => {
                  const done  = doneNodes.has(n.id)
                  const active = currentNodeId === n.id
                  return (
                    <div key={n.id}
                      style={{
                        padding: '7px 10px',
                        borderRadius: 6,
                        border: `1px solid ${n.hub ? 'var(--gold)' : active ? 'var(--gold-dim)' : 'var(--border)'}`,
                        background: n.hub ? 'rgba(200,168,75,0.08)' : active ? 'rgba(200,168,75,0.04)' : 'var(--bg)',
                        display: 'flex', alignItems: 'center', gap: 8, fontSize: 11,
                        color: n.hub ? 'var(--gold-light)' : active ? 'var(--text)' : 'var(--text-muted)',
                      }}>
                      <span style={{ fontSize: 14 }}>{done ? '✅' : loading && active ? '⏳' : '○'}</span>
                      <span style={{ flex: 1 }}>{n.label}</span>
                      {n.size && <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{n.size}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Output panel ──────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {hasOutput && (
              <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: loading ? 'var(--gold)' : 'var(--green)', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{loading ? 'gerando...' : 'concluído'}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: copied ? 'var(--green)' : 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
                    {copied ? '✓ COPIADO' : '◈ COPIAR'}
                  </button>
                  {output && (
                    <button onClick={() => {
                      const b = new Blob([output], { type: 'text/markdown' })
                      const a = document.createElement('a'); a.href = URL.createObjectURL(b)
                      a.download = `review-${name || 'produto'}.md`; a.click()
                    }} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', fontSize: 11, color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
                      ↓ .md
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              {!hasOutput && !loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4" style={{ opacity: 0.3 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--gold)', letterSpacing: 4 }}>◆</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--text-dim)' }}>
                    Configure o produto e clique em Gerar
                  </div>
                </div>
              ) : seoData ? (
                <SEOPackDisplay data={seoData} />
              ) : (
                <pre className="prose-review whitespace-pre-wrap text-sm leading-relaxed max-w-3xl" style={{ fontFamily: 'var(--font-body)' }}>
                  {output}{loading && <span className="cursor-blink" />}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
