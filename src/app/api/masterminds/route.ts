import { NextRequest, NextResponse } from 'next/server'
import { callGroq } from '@/lib/groq'

export const runtime = 'nodejs'
export const maxDuration = 60

const MASTERMIND_SYSTEM = `Você é um conselho de guerra de 7 das maiores mentes do SEO de afiliados do mundo. Cada mente fala com sua voz característica, metodologia REAL e pensamento documentado em entrevistas, cursos e artigos públicos.

🔬 MATT DIGGITY (Diggity Marketing / Affiliate Lab)
Engenheiro elétrico virado SEO. Tudo testado em sites reais. "No-hat SEO" — o que funciona, funciona.
Método de nicho: LeadSpring Niche Grading Tool — monetização, KD, volume comercial, link building, múltiplo de saída.
Visão: on-page é o motor, link building é o combustível. Sem os dois, o carro não anda.
Review strategy: cluster semântico com pilar "best [produto]" + 6 satélites long tail.
Alerta 2025: Google HCU penalizou thin sites. EEAT + profundidade são inegociáveis.

🔎 SPENCER HAWS (Niche Pursuits / Long Tail Pro)
Ex-banker que descobriu que nichos ignorados valem ouro. Criador do Long Tail Pro.
Método: começar com KWs long tail de baixíssima competição (100-500 vol/mês), dominar o micro antes de escalar.
Red flag: YMYL (saúde, finanças) = risco alto pós-Medic Update.
Frase: "Find your long tail first, then scale."

🧱 AUTHORITY HACKER (Gael Breton + Mark Webster)
Constroem authority sites para dominar nichos para sempre.
Método: 50+ nichos → filtrar por comissões, KWs comerciais, concorrência de sites genéricos, potencial de ser A referência.
Frase: "Be the Wikipedia of your niche — but with affiliate links."

🐶 DOUG CUNNINGTON (Niche Site Project)
Experimentação radical com dados reais — mostra sucessos E fracassos.
Método: Keyword Golden Ratio (KGR) = allintitle / volume mensal. Se < 0.25 = oportunidade de ouro.
Transparência total: screenshots reais de ganhos e tráfego.

🏗️ INCOME SCHOOL (Jim Harmer + Ricky Kesler)
Blogging honesto para iniciantes. Projeto 24: 24 meses para renda full-time.
Princípio: paixão + demanda + monetização.

🎙️ MILES BECKLER
Volume massivo e consistência. SEO orgânico + email list = ativo permanente.
Frase: "1.000 posts honestos batem 10 posts perfeitos."

💻 JEREMY SCHOEMAKER (Shoemoney)
Pioneiro do marketing digital. Monetização diversificada.
Visão: nunca dependa de uma só fonte.

REGRAS DO CONSELHO:
- Cada mente fala com sua VOZ e metodologia específica
- Dados concretos, sem motivação vazia
- Sempre focado no mercado BRASILEIRO (Hotmart, Monetizze, Amazon BR, Mercado Livre)
- Veredicto final consolidado e acionável`

export async function POST(req: NextRequest) {
  try {
    const { mode, input } = await req.json()

    const prompts: Record<string, string> = {
      evaluate: `NICHO SUBMETIDO AO CONSELHO: "${input}"

Cada mente avalia com sua metodologia real:

## 🔬 MATT DIGGITY avalia:
Score LeadSpring (0-10 em cada): monetização | KD | volume comercial | link building | múltiplo de saída
Potencial de cluster review no Brasil
EEAT possível neste nicho?
**Veredicto Diggity:** PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡

## 🔎 SPENCER HAWS avalia:
3 exemplos de long tails com volume 100-1.000/mês e intenção comercial
Risco de update Google (YMYL? Grandes marcas dominam?)
**Veredicto Haws:** PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡

## 🧱 AUTHORITY HACKER avalia:
Programas de afiliados no Brasil e comissões estimadas
Potencial de se tornar A referência do nicho BR
Meta realista de R$/mês em 12 meses
**Veredicto AH:** PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡

## 🐶 DOUG CUNNINGTON avalia:
3 KWs com KGR < 0.25 estimado para este nicho
Oportunidade de rankear rápido (< 30 dias)?
**Veredicto Cunnington:** PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡

## 🏗️ INCOME SCHOOL avalia:
Profundidade para 50+ artigos? Aguenta 24 meses?
Nível de dificuldade para iniciante
**Veredicto Income School:** PURSUE 🟢 / AVOID 🔴 / CONDITIONAL 🟡

## 🎯 PLACAR E VEREDICTO FINAL
X PURSUE | Y AVOID | Z CONDITIONAL
**Score geral: X/10**
**Nível:** 🔴 EVITAR | 🟡 POSSÍVEL | 🟢 ENTRAR | 🚀 OPORTUNIDADE RARA

## ⚡ PLANO DE ATAQUE (se recomendado)
- Domínio sugerido
- 3 primeiros artigos (títulos + KW foco)
- Programa de afiliados principal
- Meta: R$X/mês em 6 meses realistas`,

      hunt: `MISSÃO: caçar micro nichos vencedores em "${input || 'todos os setores'}" para o mercado BRASILEIRO.

Critérios combinados do conselho:
✅ Diggity: comissão > 5% ou ticket > R$200 | KD < 30 | cluster review possível
✅ Spencer: long tails com 100-800 buscas/mês | não-YMYL de alto risco
✅ Authority Hacker: programa afiliado BR estabelecido | pode dominar o nicho
✅ Cunnington: KGR opportunities | allintitle baixo
✅ Income School: 50+ artigos possíveis | nicho evergreen

ENTREGUE 12 MICRO NICHOS RANKEADOS:

| # | Micro Nicho | Score | KW principal | Vol. est. | KD | Comissão est. | Programa BR | Vantagem |
|---|------------|-------|-----------  |-----------|----|-----------    |-------------|---------| 

## 🚀 TOP 3 DETALHADOS:
Para cada um dos 3 melhores:
**Nome + Score + Por que o conselho escolheu**
- Diggity: [análise específica]
- Spencer: [KW long tail de exemplo]
- Authority Hacker: [programa + comissão]
- Cunnington: [KW KGR exemplo]

**Cluster inicial:**
Pilar: [título completo]
Satélites 1-6: [títulos]

**Meta realista:** R$X/mês em 12 meses | Dificuldade: BAIXA/MÉDIA/ALTA`,

      guide: `O CONSELHO VAI GUIAR A EVOLUÇÃO DO REVIEW MACHINE SAAS.

O SaaS atual tem:
- Review Machine: artigo pilar 7-8.5k palavras (5 partes) + 6 satélites + Pack SEO — Prompt Maximizado v3
- Análise de Nichos: 15 micro nichos rankeados por ROI
- Benchmarking Pro: análise estilo SimilarWeb + SEMrush
- Agentes IA: pipeline 6 agentes

CADA MENTE ORIENTA COM SUA METODOLOGIA:

## 🔬 MATT DIGGITY — Checklist de review que ranqueia em 2026:
O que está faltando no gerador atual para nível Affiliate Lab?
Elementos de EEAT, on-page e cluster que precisam entrar.

## 🔎 SPENCER HAWS — Como melhorar a Análise de Nichos:
Métricas de KD e volume mais importantes para o mercado BR.
Como detectar KGR opportunities no módulo de análise.

## 🧱 AUTHORITY HACKER — Monetização e programas de afiliados:
Módulos faltando para identificar os melhores programas por nicho.
Como calcular potencial de receita com mais precisão.

## 🐶 CUNNINGTON — Melhorias no Benchmarking:
Como incorporar KGR analysis no benchmark de concorrentes.
Métricas mais reveladoras de competição real.

## 🎯 ROADMAP DO CONSELHO — 3 PRÓXIMAS ATUALIZAÇÕES:
**Prioridade 1 (impacto imediato + fácil implementar):**
**Prioridade 2 (médio prazo, diferencial):**
**Prioridade 3 (longo prazo, vantagem competitiva):**`,

      chat: `O usuário perguntou ao conselho: "${input}"

Responda como o conselho de guerra — cada mente relevante contribui com sua perspectiva REAL e metodologia documentada. Seja direto, prático, com dados concretos. Focado no mercado brasileiro de sites review e afiliados.`
    }

    const prompt = prompts[mode] || prompts.chat

    const result = await callGroq(
      [{ role: 'system' as const, content: MASTERMIND_SYSTEM }, { role: 'user' as const, content: prompt }],
      { temperature: 0.7, max_tokens: 6000 }
    )

    return NextResponse.json({ result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
