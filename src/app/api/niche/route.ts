import { NextRequest, NextResponse } from 'next/server'
import { callGroq } from '@/lib/groq'

export const runtime = 'nodejs'
export const maxDuration = 60

const NICHE_SYSTEM = `Você é um especialista em análise de micro nichos para sites review brasileiros. Analisa oportunidades de mercado com foco em SEO de afiliados, monetização e potencial de tráfego orgânico. Usa dados concretos, estimativas realistas e estratégias comprovadas para o mercado brasileiro (Hotmart, Monetizze, Amazon BR, Mercado Livre).`

export async function POST(req: NextRequest) {
  try {
    const { category, budget, timeframe } = await req.json()

    const prompt = `Analise e descubra micro nichos lucrativos para sites review:

Categoria: ${category || 'geral'}
Orçamento: ${budget || 'até R$500/mês'}
Prazo de retorno: ${timeframe || '3-6 meses'}

ENTREGUE:

## 1. RANKING DOS 15 MELHORES MICRO NICHOS
Para cada nicho:
- Nome | Segmento pai | Volume estimado (buscas/mês) | Dificuldade (1-10) | Ticket médio | Comissão % | Faturamento potencial/mês | Plataforma afiliado | 3 KWs pilares | Score (1-100)

## 2. TOP 3 NICHOS DETALHADOS
Para cada um: concorrência, estratégia de entrada, produtos mais buscados, sazonalidade, tipo de conteúdo que converte, modelo de site recomendado

## 3. INSIGHTS DE MERCADO
Tendências emergentes, nichos saturados a evitar, oportunidades únicas

## 4. PRÓXIMOS PASSOS
Roteiro de 30 dias para iniciar no nicho #1`

    const result = await callGroq(
      [{ role: 'system' as const, content: NICHE_SYSTEM }, { role: 'user' as const, content: prompt }],
      { temperature: 0.6, max_tokens: 5000 }
    )

    return NextResponse.json({ result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
