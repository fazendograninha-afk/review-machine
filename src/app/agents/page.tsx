'use client'
import { useState, useEffect, useRef } from 'react'
import Sidebar from '@/components/Sidebar'

// ── Tipos ─────────────────────────────────────────────────────────
type Mode = 'pipeline' | 'nicho' | 'council' | 'benchmark'
type StepStatus = 'waiting' | 'running' | 'done' | 'error'
interface Step { id: string; label: string; icon: string; status: StepStatus; output?: string }

// ── Partículas ────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 72 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.5 + 0.1,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,185,195,${p.o})`
        ctx.fill()
      })
      // linhas entre partículas próximas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(160,165,175,${0.08 * (1 - dist / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

// ── Configuração dos modos ────────────────────────────────────────
const MODES: { id: Mode; icon: string; label: string; sub: string }[] = [
  { id: 'pipeline', icon: '◈', label: 'Pipeline Completo', sub: '6 agentes em sequência — relatório profundo de nicho' },
  { id: 'nicho',    icon: '◉', label: 'Análise de Nicho',  sub: '15 micro nichos rankeados por ROI + métricas completas' },
  { id: 'council',  icon: '⬟', label: 'The Council',       sub: '7 mentes do SEO mundial avaliam e caçam oportunidades' },
  { id: 'benchmark',icon: '▣', label: 'Benchmark Pro',     sub: 'Análise competitiva estilo SimilarWeb + SEMrush' },
]

// ── Agentes do pipeline ───────────────────────────────────────────
function buildPipelineSteps(niche: string, goal: string): { id: string; label: string; icon: string; system: string; user: string }[] {
  return [
    {
      id: 'market', label: 'Pesquisa de Mercado', icon: '01',
      system: 'Você é um pesquisador de mercado digital especializado em nichos de afiliados brasileiros. Dados concretos, estimativas realistas.',
      user: `NICHO: "${niche}" | OBJETIVO: ${goal || 'montar site review lucrativo'}

ENTREGUE:
1. Tamanho do mercado estimado (R$/ano) e crescimento YoY
2. Top 5 produtos mais buscados com ticket médio e comissão típica
3. Volume de busca estimado (buscas/mês no Brasil)
4. Dificuldade SERP geral (1-10 com justificativa)
5. Principais plataformas de afiliados disponíveis no Brasil (comissões reais)
6. Score de oportunidade: X/10 com critérios objetivos
7. Sazonalidade: picos e vales do nicho ao longo do ano
8. Tendência 2026: crescimento, estagnação ou declínio
9. Ticket médio por categoria de produto
10. Perfil do comprador típico (idade, dores, objeções)`
    },
    {
      id: 'serp', label: 'Análise de SERP', icon: '02',
      system: 'Você é um especialista em SEO e análise de SERP do mercado brasileiro.',
      user: `NICHO: "${niche}"

ENTREGUE:
1. Intenções de busca dominantes (informacional / comercial / transacional — %)
2. Top 10 KWs pilares com volume estimado e KD (0-100)
3. Top 15 long tails fundo de funil (vale a pena / é golpe / funciona mesmo / reclame aqui)
4. Dificuldade de ranqueamento por tipo: review simples / comparativo / pilar
5. Oportunidades de featured snippet e PAA (People Also Ask)
6. Tipo de conteúdo que domina a SERP (reviews, listas, comparativos, vídeos)
7. KWs de intenção comercial com KD < 20 e vol > 200/mês`
    },
    {
      id: 'gaps', label: 'Gaps & Oportunidades', icon: '03',
      system: 'Você é um estrategista de conteúdo especializado em identificar oportunidades inexploradas na SERP brasileira.',
      user: `NICHO: "${niche}"

ENTREGUE:
1. Top 8 gaps de conteúdo (temas com volume e zero conteúdo de qualidade)
2. Ângulos únicos que NENHUM site está usando
3. Perguntas frequentes sem resposta satisfatória na SERP
4. Micro nichos dentro do nicho principal (com potencial de dominância)
5. Cluster completo sugerido: 1 pilar + 6 satélites (títulos + KW foco de cada)
6. Estimativa de tráfego captável em 6 meses executando o cluster
7. Concorrência: quem domina cada gap e como superar`
    },
    {
      id: 'bench', label: 'Benchmark Competitivo', icon: '04',
      system: 'Você é um especialista em benchmarking de sites review digitais, metodologia SimilarWeb + SEMrush + Ahrefs.',
      user: `NICHO: "${niche}"

Para os 3-5 principais sites review hipotéticos deste nicho, analise:

| Site | DA est. | Tráfego/mês | Monetização | Pontos fortes | Fraquezas |
|------|---------|-------------|-------------|---------------|-----------|

Para cada player:
- Arquitetura de conteúdo e clusters identificados
- Estratégia de CTAs e densidade de afiliados
- Qualidade e profundidade dos reviews (1-10)
- Velocidade de publicação estimada

GAPS EXPLORÁVEIS:
- Top 5 vulnerabilidades dos líderes
- Estratégia de diferenciação para superar cada um
- Checklist de 10 estratégias replicáveis imediatamente`
    },
    {
      id: 'strategy', label: 'Estratégia & Monetização', icon: '05',
      system: 'Você é um estrategista de conteúdo e monetização digital para sites review, especializado no mercado brasileiro.',
      user: `NICHO: "${niche}" | OBJETIVO: ${goal || 'site review lucrativo'}

ENTREGUE:
1. Top 5 programas de afiliados no Brasil (comissões reais, EPC, cookie duration)
2. Comissão afiliados estimada por categoria (% e R$ por venda)
3. RPM estimado para display ads neste nicho
4. Arquitetura do site: categorias, pilares, clusters sugeridos
5. Calendário editorial — primeiros 90 dias (títulos + KW + tipo de artigo)
6. Modelos de monetização diversificada: afiliados + ads + leads + digital
7. Investimento necessário: tempo (h/semana) e dinheiro (R$/mês)
8. KPIs a monitorar mensalmente (tráfego, RPM, conversão, receita)
9. Meta de faturamento: R$/mês em 3, 6 e 12 meses (conservadora e otimista)`
    },
    {
      id: 'report', label: 'Relatório Executivo Final', icon: '06',
      system: 'Você é um analista executivo sênior que consolida pesquisas complexas em relatórios de inteligência acionáveis e altamente estruturados.',
      user: `NICHO: "${niche}"

Compile o RELATÓRIO EXECUTIVO FINAL com base em toda a análise:

# INTELIGÊNCIA DE MERCADO — ${niche.toUpperCase()}

## ◆ RESUMO EXECUTIVO
3 parágrafos diretos. O que é o nicho, por que agora, qual a oportunidade.

## ◆ SCORECARD DO NICHO
| Dimensão | Score | Status |
|----------|-------|--------|
| Volume de busca | /10 | |
| Dificuldade SERP | /10 | |
| Ticket médio | /10 | |
| Comissão afiliados | /10 | |
| Nível de concorrência | /10 | |
| Score de oportunidade | /10 | |
| Sazonalidade | /10 | |
| Tendência 2026 | /10 | |
| **SCORE GERAL** | **/10** | |

## ◆ TOP 10 KWs PRIORITÁRIAS
Tabela com KW / Volume / KD / Intenção / Prioridade

## ◆ CLUSTER RECOMENDADO
Pilar + 6 satélites com títulos completos e KW foco

## ◆ PROJEÇÃO DE RECEITA
| Prazo | Conservadora | Otimista |
|-------|-------------|---------|
| 3 meses | R$ | R$ |
| 6 meses | R$ | R$ |
| 12 meses | R$ | R$ |

## ◆ TOP 5 AÇÕES IMEDIATAS
Ordenadas por impacto. Cada ação com prazo e responsável.

## ◆ VEREDICTO FINAL
🟢 ENTRAR AGORA / 🟡 ESPERAR / 🔴 EVITAR — com justificativa clara.`
    },
  ]
}

// ── Prompts dos modos especiais ───────────────────────────────────
function getNichoPrompt(categoria: string) {
  return {
    system: 'Você é um especialista em análise de micro nichos para sites review brasileiros. Dados concretos, estimativas realistas, focado em Hotmart, Monetizze, Amazon BR, Mercado Livre.',
    user: `CATEGORIA: "${categoria || 'produtos físicos'}"

ENTREGUE OS 15 MELHORES MICRO NICHOS RANKEADOS:

| # | Micro Nicho | Score | Volume busca/mês | Dificuldade SERP | Ticket médio | Comissão afiliados | Concorrência | Score oportunidade | Sazonalidade | Tendência 2026 | Programa BR |
|---|------------|-------|-----------------|-----------------|-------------|-------------------|-------------|-------------------|-------------|----------------|------------|

## TOP 3 DETALHADOS

Para cada um dos 3 melhores:
**Nome do Nicho — Score: X/10**
- Volume de busca: X buscas/mês
- Dificuldade SERP: X/10
- Ticket médio: R$X
- Comissão afiliados: X% (~R$X por venda)
- Concorrência: BAIXA / MÉDIA / ALTA
- Score de oportunidade: X/10
- Sazonalidade: [descrição dos picos]
- Tendência 2026: CRESCENDO / ESTÁVEL / CAINDO
- Programa afiliado principal: [nome + link aproximado]
- Cluster sugerido: Pilar + 3 satélites (títulos completos)
- Meta R$/mês em 12 meses: R$X (conservadora) a R$X (otimista)

## INSIGHTS DE MERCADO
Tendências emergentes, nichos saturados a evitar, janelas de oportunidade únicas.

## PRÓXIMOS 30 DIAS
Roteiro para iniciar no nicho #1 agora.`
  }
}

function getCouncilPrompt(mode: string, input: string) {
  const system = `Você é um conselho de guerra de 7 das maiores mentes do SEO de afiliados do mundo.

🔬 MATT DIGGITY — LeadSpring Grading. Tudo testado. EEAT inegociável. Cluster semântico pilar + satélites.
🔎 SPENCER HAWS — Long Tail Pro. KWs 100-500/mês. Dominar micro antes de escalar. Evitar YMYL.
🧱 AUTHORITY HACKER — Authority sites. 50+ nichos filtrados. Wikipedia do nicho + affiliate links.
🐶 DOUG CUNNINGTON — KGR = allintitle/volume < 0.25. Dados reais. Fracassos incluídos.
🏗️ INCOME SCHOOL — Projeto 24. Paixão + demanda. 100 artigos sem burn out.
🎙️ MILES BECKLER — Volume + consistência. 1.000 posts honestos > 10 perfeitos.
💻 SHOEMONEY — Monetização diversificada. Nunca dependa de uma fonte.

REGRAS: cada mente fala com sua VOZ e metodologia. Dados concretos. Mercado BRASILEIRO. Scores em R$.`

  const prompts: Record<string, string> = {
    evaluate: `NICHO SUBMETIDO AO CONSELHO: "${input}"

Cada mente avalia:

## 🔬 MATT DIGGITY
Score LeadSpring (0-10): monetização | KD | volume | link building | múltiplo de saída
Cluster review possível? EEAT viável?
**Veredicto: PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡**

## 🔎 SPENCER HAWS
3 long tails (100-1.000/mês, intenção comercial)
Risco de update Google?
**Veredicto: PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡**

## 🧱 AUTHORITY HACKER
Programas afiliados BR + comissões | Meta R$/mês em 12 meses
**Veredicto: PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡**

## 🐶 DOUG CUNNINGTON
3 KWs com KGR < 0.25 | Rankear em < 30 dias?
**Veredicto: PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡**

## 🏗️ INCOME SCHOOL
50+ artigos possíveis? Aguenta 24 meses?
**Veredicto: PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡**

## 🎯 PLACAR FINAL
Score: X/10 | Nível: 🔴 EVITAR / 🟡 POSSÍVEL / 🟢 ENTRAR / 🚀 OPORTUNIDADE RARA

## ⚡ PLANO DE ATAQUE
Domínio sugerido | 3 primeiros artigos | Afiliado principal | Meta R$/mês em 6 meses`,

    hunt: `MISSÃO: caçar 12 micro nichos vencedores em "${input || 'todos os setores'}" para o Brasil.

Filtros: Diggity (comissão > 5%, KD < 30) + Spencer (long tails 100-800/mês) + AH (programa BR) + Cunnington (KGR < 0.25) + Income School (50+ artigos possíveis)

| # | Micro Nicho | Score | KW principal | Vol. | KD | Comissão | Programa BR | Vantagem |
|---|------------|-------|-------------|------|-----|---------|-------------|---------|

## 🚀 TOP 3 DETALHADOS
Para cada: avaliação das 5 mentes + cluster completo (pilar + 6 satélites) + meta R$/mês`,

    chat: `O usuário perguntou ao conselho: "${input}"
Cada mente relevante responde com sua voz, metodologia e dados concretos. Focado no mercado brasileiro.`,
  }

  return { system, user: prompts[mode] || prompts.chat }
}

function getBenchmarkPrompt(url: string, niche: string, tipo: string) {
  const domain = url.replace(/https?:\/\//, '').split('/')[0]
  return {
    system: 'Você é um analista de inteligência competitiva, metodologia SimilarWeb + SEMrush + Ahrefs. Estimativas realistas e claras.',
    user: `SITE: ${domain} | NICHO: ${niche || 'infira pela URL'} | ANÁLISE: ${tipo}

## 🎯 SCORECARD EXECUTIVO
| Dimensão | Score | Status |
|----------|-------|--------|
| Tráfego & Audiência | /10 | |
| Autoridade SEO | /10 | |
| Qualidade de Conteúdo | /10 | |
| Estratégia de KWs | /10 | |
| Perfil de Backlinks | /10 | |
| Monetização | /10 | |
| UX & Escaneabilidade | /10 | |
| **SCORE GERAL** | **/10** | |

## 📊 TRÁFEGO (SimilarWeb)
Visitas/mês | Páginas/visita | Bounce rate | % Orgânico | % Mobile | Tendência 12 meses

## 🔑 SEO (SEMrush/Ahrefs)
Domain Authority | KWs rankeadas | Top 10 KWs prováveis com volume e posição estimados | Referring domains

## 📝 ESTRATÉGIA DE CONTEÚDO
Arquitetura editorial | Clusters identificados | Frequência de publicação | Qualidade (1-10)

## 💰 MONETIZAÇÃO
Modelos de receita | Densidade de CTAs | Estimativa de RPM | Oportunidades não exploradas

## ⚡ TOP 5 GAPS PARA SUPERAR
KW gaps | Gaps técnicos | Gaps de monetização | Gaps de UX

## 📋 PLANO DE AÇÃO
30 dias | 60 dias | 90 dias para ultrapassar este concorrente

## 🏆 VEREDICTO
Dificuldade: BAIXA / MÉDIA / ALTA | Tempo para superar: X meses`
  }
}

// ── Componente principal ──────────────────────────────────────────
export default function AgentsPage() {
  const [mode, setMode]             = useState<Mode>('pipeline')
  const [niche, setNiche]           = useState('')
  const [goal, setGoal]             = useState('')
  const [categoria, setCategoria]   = useState('')
  const [councilMode, setCouncilMode] = useState<'evaluate'|'hunt'|'chat'>('evaluate')
  const [councilInput, setCouncilInput] = useState('')
  const [benchUrl, setBenchUrl]     = useState('')
  const [benchNiche, setBenchNiche] = useState('')
  const [benchTipo, setBenchTipo]   = useState('Análise completa estilo SimilarWeb + SEMrush + Ahrefs')

  const [steps, setSteps]           = useState<Step[]>([])
  const [running, setRunning]       = useState(false)
  const [output, setOutput]         = useState('')
  const [stepOutputs, setStepOutputs] = useState<Record<string, string>>({})
  const [expandedStep, setExpandedStep] = useState<string|null>(null)

  function updateStep(id: string, patch: Partial<Step>) {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  async function callAgent(system: string, user: string): Promise<string> {
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system, user }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data.result
  }

  async function run() {
    setRunning(true)
    setOutput('')
    setStepOutputs({})
    setExpandedStep(null)

    try {
      if (mode === 'pipeline') {
        const agentDefs = buildPipelineSteps(niche, goal)
        const initSteps: Step[] = agentDefs.map(a => ({ id: a.id, label: a.label, icon: a.icon, status: 'waiting' }))
        setSteps(initSteps)
        const outputs: Record<string, string> = {}
        for (const agent of agentDefs) {
          updateStep(agent.id, { status: 'running' })
          const result = await callAgent(agent.system, agent.user)
          outputs[agent.id] = result
          setStepOutputs(p => ({ ...p, [agent.id]: result }))
          updateStep(agent.id, { status: 'done', output: result })
          if (agent.id === 'report') setOutput(result)
        }
      } else if (mode === 'nicho') {
        setSteps([{ id: 'nicho', label: 'Analisando micro nichos...', icon: '◉', status: 'running' }])
        const { system, user } = getNichoPrompt(categoria)
        const result = await callAgent(system, user)
        setOutput(result)
        setSteps([{ id: 'nicho', label: 'Análise de nichos concluída', icon: '◉', status: 'done' }])
      } else if (mode === 'council') {
        setSteps([{ id: 'council', label: 'The Council deliberando...', icon: '⬟', status: 'running' }])
        const { system, user } = getCouncilPrompt(councilMode, councilInput)
        const result = await callAgent(system, user)
        setOutput(result)
        setSteps([{ id: 'council', label: 'Veredicto do Conselho entregue', icon: '⬟', status: 'done' }])
      } else if (mode === 'benchmark') {
        setSteps([{ id: 'bench', label: `Analisando ${benchUrl}...`, icon: '▣', status: 'running' }])
        const { system, user } = getBenchmarkPrompt(benchUrl, benchNiche, benchTipo)
        const result = await callAgent(system, user)
        setOutput(result)
        setSteps([{ id: 'bench', label: 'Benchmark concluído', icon: '▣', status: 'done' }])
      }
    } catch (e: any) {
      setSteps(p => p.map(s => s.status === 'running' ? { ...s, status: 'error', output: e.message } : s))
      setOutput(`❌ Erro: ${e.message}`)
    }
    setRunning(false)
  }

  const canRun = !running && (
    (mode === 'pipeline' && niche.trim()) ||
    (mode === 'nicho' && categoria.trim()) ||
    (mode === 'council' && councilInput.trim()) ||
    (mode === 'benchmark' && benchUrl.trim())
  )

  const S = {
    waiting: '#44454A',
    running: '#9BA3AF',
    done:    '#6B7280',
    error:   '#EF4444',
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#111214', position:'relative', overflow:'hidden' }}>
      <Sidebar />

      {/* Fundo com partículas */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <Particles />
        {/* Vinheta */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      <main style={{ marginLeft:240, flex:1, display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', position:'relative', zIndex:1 }}>

        {/* ── Topbar ─────────────────────────────────── */}
        <div style={{ padding:'20px 32px 16px', borderBottom:'1px solid #1C1D20', background:'rgba(15,16,18,0.92)', backdropFilter:'blur(12px)', flexShrink:0 }}>
          <div style={{ fontSize:10, fontFamily:'var(--font-mono)', letterSpacing:'4px', color:'#4B5563', marginBottom:6, textTransform:'uppercase' }}>
            ◈ SISTEMA DE AGENTES IA
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:26, letterSpacing:3, color:'#D1D5DB', lineHeight:1 }}>
            AGENTES <span style={{ color:'#F9FAFB' }}>ALVISSAREIROS</span>
          </div>
          <div style={{ fontSize:12, color:'#4B5563', marginTop:4, fontFamily:'var(--font-mono)' }}>
            pipeline completo · análise de nicho · the council · benchmark pro
          </div>
        </div>

        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

          {/* ── Painel esquerdo ─────────────────────── */}
          <div style={{ width:280, flexShrink:0, overflowY:'auto', padding:16, borderRight:'1px solid #1C1D20', background:'rgba(13,14,16,0.85)', display:'flex', flexDirection:'column', gap:12 }}>

            {/* Seletor de modo */}
            <div>
              <div style={{ fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:'3px', color:'#374151', marginBottom:8, textTransform:'uppercase' }}>MODO</div>
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                {MODES.map(m => (
                  <button key={m.id} onClick={() => setMode(m.id)}
                    style={{
                      textAlign:'left', padding:'10px 12px', borderRadius:6, border:`1px solid ${mode===m.id?'#374151':'#1C1D20'}`,
                      background: mode===m.id ? 'rgba(55,65,81,0.3)' : 'rgba(17,18,20,0.5)',
                      cursor:'pointer', transition:'all .15s', display:'flex', alignItems:'flex-start', gap:10,
                    }}>
                    <span style={{ color: mode===m.id?'#9CA3AF':'#374151', fontSize:14, flexShrink:0, marginTop:1 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, color: mode===m.id?'#E5E7EB':'#6B7280', letterSpacing:'0.5px' }}>{m.label}</div>
                      <div style={{ fontSize:10, color:'#374151', marginTop:2, lineHeight:1.4 }}>{m.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height:1, background:'#1C1D20' }} />

            {/* Inputs por modo */}
            {mode === 'pipeline' && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <InputField label="NICHO *" placeholder="Ex: fritadeiras air fryer" value={niche} onChange={setNiche} />
                <div>
                  <div style={{ fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:'2px', color:'#374151', marginBottom:6, textTransform:'uppercase' }}>OBJETIVO</div>
                  <select value={goal} onChange={e=>setGoal(e.target.value)} style={{ width:'100%', background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:6, padding:'9px 12px', fontSize:12, color: goal?'#9CA3AF':'#374151', outline:'none', fontFamily:'var(--font-mono)' }}>
                    <option value="">Selecione...</option>
                    <option value="montar site review do zero neste nicho">Montar site review do zero</option>
                    <option value="avaliar se vale a pena entrar neste nicho">Avaliar potencial do nicho</option>
                    <option value="escalar conteúdo num site review existente">Escalar site existente</option>
                    <option value="identificar oportunidades de afiliados">Encontrar oportunidades de afiliados</option>
                  </select>
                </div>
              </div>
            )}

            {mode === 'nicho' && (
              <InputField label="CATEGORIA *" placeholder="Ex: produtos fitness, eletrônicos" value={categoria} onChange={setCategoria} />
            )}

            {mode === 'council' && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div>
                  <div style={{ fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:'2px', color:'#374151', marginBottom:6, textTransform:'uppercase' }}>MODO DO CONSELHO</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                    {([['evaluate','⚖️ Avaliar Nicho'],['hunt','🎯 Caçar Micro Nichos'],['chat','💬 Consulta Livre']] as const).map(([v,l])=>(
                      <button key={v} onClick={()=>setCouncilMode(v as any)}
                        style={{ textAlign:'left', padding:'8px 10px', borderRadius:5, border:`1px solid ${councilMode===v?'#374151':'#1C1D20'}`, background:councilMode===v?'rgba(55,65,81,0.25)':'transparent', fontSize:11, color:councilMode===v?'#D1D5DB':'#6B7280', cursor:'pointer' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <InputField
                  label={councilMode==='hunt'?"CATEGORIA (opcional)":"NICHO / PERGUNTA *"}
                  placeholder={councilMode==='chat'?"Digite sua pergunta...":"Ex: smart ring, air fryer"}
                  value={councilInput} onChange={setCouncilInput} multiline />
              </div>
            )}

            {mode === 'benchmark' && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <InputField label="URL DO CONCORRENTE *" placeholder="https://site-concorrente.com" value={benchUrl} onChange={setBenchUrl} mono />
                <InputField label="NICHO (opcional)" placeholder="Ex: fritadeiras air fryer" value={benchNiche} onChange={setBenchNiche} />
              </div>
            )}

            {/* Botão */}
            <button onClick={run} disabled={!canRun}
              style={{
                padding:'13px', borderRadius:6, border:'1px solid',
                borderColor: canRun ? '#374151' : '#1C1D20',
                background: canRun ? 'rgba(55,65,81,0.4)' : 'transparent',
                fontFamily:'var(--font-display)', fontSize:16, letterSpacing:3,
                color: canRun ? '#E5E7EB' : '#374151',
                cursor: canRun ? 'pointer' : 'not-allowed',
                transition:'all .2s', marginTop:4,
              }}>
              {running ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:12, fontFamily:'var(--font-mono)', letterSpacing:2 }}>
                  <span style={{ width:12, height:12, borderRadius:'50%', border:'1.5px solid #6B7280', borderTopColor:'#D1D5DB', animation:'spin 0.8s linear infinite', display:'inline-block' }} />
                  PROCESSANDO
                </span>
              ) : `◈ EXECUTAR`}
            </button>

            {/* Pipeline info */}
            {mode === 'pipeline' && (
              <div style={{ background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:6, padding:'12px 14px' }}>
                <div style={{ fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:'3px', color:'#374151', marginBottom:8, textTransform:'uppercase' }}>PIPELINE</div>
                {['Pesquisa de mercado','Análise SERP','Gaps & Oportunidades','Benchmark','Estratégia & Monetização','Relatório Executivo'].map((a,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'3px 0' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#374151', width:16 }}>0{i+1}</span>
                    <span style={{ fontSize:11, color:'#4B5563' }}>{a}</span>
                  </div>
                ))}
                <div style={{ fontSize:9, color:'#374151', marginTop:8, fontFamily:'var(--font-mono)' }}>⏱ ~4–6 min</div>
              </div>
            )}
          </div>

          {/* ── Painel direito — output ─────────────── */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

            {/* Steps do pipeline */}
            {steps.length > 0 && (
              <div style={{ padding:'12px 20px', borderBottom:'1px solid #1C1D20', background:'rgba(13,14,16,0.7)', flexShrink:0 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {steps.map(s => (
                    <div key={s.id}
                      onClick={()=>s.output && setExpandedStep(expandedStep===s.id?null:s.id)}
                      style={{
                        display:'flex', alignItems:'center', gap:6, padding:'5px 10px',
                        borderRadius:4, border:`1px solid ${S[s.status]}30`,
                        background:`${S[s.status]}08`,
                        cursor: s.output ? 'pointer' : 'default',
                        transition:'all .15s',
                      }}>
                      {s.status === 'running' && <span style={{ width:6, height:6, borderRadius:'50%', background:'#9CA3AF', animation:'pulse 1s infinite', display:'inline-block' }} />}
                      {s.status === 'done'    && <span style={{ fontSize:10, color:'#6B7280' }}>✓</span>}
                      {s.status === 'error'   && <span style={{ fontSize:10, color:'#EF4444' }}>✗</span>}
                      {s.status === 'waiting' && <span style={{ width:5, height:5, borderRadius:'50%', background:'#374151', display:'inline-block' }} />}
                      <span style={{ fontSize:10, color:S[s.status], fontFamily:'var(--font-mono)' }}>{s.icon}</span>
                      <span style={{ fontSize:11, color: s.status==='done'?'#6B7280':S[s.status] }}>{s.label}</span>
                    </div>
                  ))}
                </div>
                {/* Step expandido */}
                {expandedStep && stepOutputs[expandedStep] && (
                  <div style={{ marginTop:10, padding:12, background:'#0D0E10', borderRadius:6, border:'1px solid #1C1D20', maxHeight:200, overflowY:'auto' }}>
                    <pre style={{ fontSize:11, color:'#6B7280', whiteSpace:'pre-wrap', lineHeight:1.6, fontFamily:'var(--font-mono)' }}>
                      {stepOutputs[expandedStep]}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Output principal */}
            <div style={{ flex:1, overflowY:'auto', padding:'24px 32px' }}>
              {!output && !running && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.15 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:80, color:'#9CA3AF', letterSpacing:8 }}>◈</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#6B7280', letterSpacing:4, marginTop:16 }}>
                    CONFIGURE E EXECUTE
                  </div>
                </div>
              )}

              {running && !output && (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60%', gap:20 }}>
                  <div style={{ position:'relative', width:60, height:60 }}>
                    <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid #1C1D20', borderTopColor:'#6B7280', animation:'spin 1.2s linear infinite' }} />
                    <div style={{ position:'absolute', inset:10, borderRadius:'50%', border:'1px solid #111', borderTopColor:'#4B5563', animation:'spin 0.8s linear infinite reverse' }} />
                  </div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#4B5563', letterSpacing:3 }}>AGENTES PROCESSANDO</div>
                </div>
              )}

              {output && (
                <div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:'#6B7280' }} />
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#6B7280', letterSpacing:2 }}>OUTPUT GERADO</span>
                    </div>
                    <div style={{ display:'flex', gap:6 }}>
                      <ActionBtn label="COPIAR" onClick={()=>navigator.clipboard.writeText(output)} />
                      <ActionBtn label="↓ .MD" onClick={()=>{
                        const b = new Blob([output],{type:'text/markdown'})
                        const a = document.createElement('a'); a.href = URL.createObjectURL(b)
                        a.download = `agentes-output.md`; a.click()
                      }} />
                    </div>
                  </div>
                  <div className="prose-review" style={{ whiteSpace:'pre-wrap', fontSize:13, lineHeight:1.85, color:'#9CA3AF', maxWidth:820, fontFamily:'var(--font-body)' }}>
                    {output}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </div>
  )
}

// ── Helpers de UI ─────────────────────────────────────────────────
function InputField({ label, placeholder, value, onChange, mono, multiline }: {
  label: string; placeholder: string; value: string; onChange: (v:string)=>void; mono?: boolean; multiline?: boolean
}) {
  const base: React.CSSProperties = {
    width:'100%', background:'#0D0E10', border:'1px solid #1C1D20', borderRadius:6,
    padding:'9px 12px', fontSize:12, color:'#9CA3AF', outline:'none',
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
    resize: 'none' as const,
  }
  return (
    <div>
      <div style={{ fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:'2px', color:'#374151', marginBottom:6, textTransform:'uppercase' }}>{label}</div>
      {multiline
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3}
            style={base} onFocus={e=>(e.target.style.borderColor='#374151')} onBlur={e=>(e.target.style.borderColor='#1C1D20')} />
        : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
            style={base} onFocus={e=>(e.target.style.borderColor='#374151')} onBlur={e=>(e.target.style.borderColor='#1C1D20')} />
      }
    </div>
  )
}

function ActionBtn({ label, onClick }: { label: string; onClick: ()=>void }) {
  return (
    <button onClick={onClick} style={{
      padding:'5px 12px', borderRadius:4, border:'1px solid #1C1D20',
      background:'transparent', fontSize:10, fontFamily:'var(--font-mono)',
      letterSpacing:'1px', color:'#4B5563', cursor:'pointer',
      transition:'all .15s',
    }}
    onMouseEnter={e=>(e.currentTarget.style.color='#9CA3AF')}
    onMouseLeave={e=>(e.currentTarget.style.color='#4B5563')}>
      {label}
    </button>
  )
}
