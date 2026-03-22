import { NextRequest, NextResponse } from 'next/server'
import { callGroq } from '@/lib/groq'

export const runtime = 'nodejs'
export const maxDuration = 60

const BENCHMARK_SYSTEM = `Você é um analista sênior de inteligência competitiva digital, especializado em sites review brasileiros.

Você domina as metodologias e métricas de:
• SimilarWeb: estimativa de tráfego, fontes de visitas, engajamento, distribuição geográfica, canais de aquisição
• SEMrush: Domain Authority, KWs orgânicas rankeadas, gaps de palavras-chave, backlink profile, análise de posições
• Ahrefs: Domain Rating, referring domains, anchor text profile, conteúdo mais linkado, oportunidades de link building
• Moz: Page Authority, spam score, link profile quality

METODOLOGIA:
1. Estimar métricas com base nos padrões do nicho e tipo de site
2. Identificar estratégias de conteúdo, SEO e monetização
3. Mapear pontos fortes, vulnerabilidades e gaps exploráveis
4. Gerar scorecard objetivo e plano de ação acionável

Formato: estruturado, com tabelas e scores numéricos claros. Sempre entregue dados estimados quando não há acesso direto — deixe claro que são estimativas baseadas em padrões do mercado.`

export async function POST(req: NextRequest) {
  try {
    const { url, niche, category } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 })

    const domain = url.replace(/https?:\/\//, '').split('/')[0]
    const nicheCtx = niche ? `Nicho: ${niche}` : 'Nicho: infira pela URL'

    const prompts: Record<string, string> = {
      traffic: `Analise o perfil de TRÁFEGO E AUDIÊNCIA do site: ${domain}
${nicheCtx}

Estilo SimilarWeb — entregue:

## 📊 Visão Geral de Tráfego
| Métrica | Estimativa | Benchmark do nicho |
|---------|-----------|-------------------|
| Visitas mensais | | |
| Páginas por visita | | |
| Duração média da sessão | | |
| Taxa de rejeição (bounce rate) | | |
| Usuários únicos/mês | | |

## 🌍 Distribuição Geográfica
Top 3 países com % estimado de tráfego

## 📱 Dispositivos
Desktop vs Mobile vs Tablet (% estimado)

## 🔀 Canais de Aquisição
| Canal | % Estimado | Análise |
|-------|-----------|---------| 
| Orgânico (SEO) | | |
| Direto | | |
| Redes sociais | | |
| Referral | | |
| Email | | |
| Pago | | |

## 📈 Tendência de Tráfego
Crescimento estimado nos últimos 12 meses

## 🎯 Score de Audiência: X/10`,

      seo: `Analise o perfil de SEO e PALAVRAS-CHAVE do site: ${domain}
${nicheCtx}

Estilo SEMrush + Ahrefs — entregue:

## 🔑 Métricas de Autoridade
| Métrica | Estimativa | O que significa |
|---------|-----------|----------------|
| Domain Authority (0-100) | | |
| Domain Rating Ahrefs (0-100) | | |
| Trust Flow estimado | | |
| Spam Score | | |
| Idade estimada do domínio | | |

## 📋 KWs Orgânicas Estimadas
| Volume de KWs | Estimativa |
|--------------|-----------|
| Total de KWs rankeadas | |
| Top 3 (posições 1-3) | |
| Top 10 (posições 4-10) | |
| Top 30 (posições 11-30) | |

## 🏆 Top 10 Palavras-chave Prováveis
Para o nicho ${niche || 'identificado'}, liste as 10 KWs mais prováveis com volume estimado e posição

## 🔗 Perfil de Backlinks
| Métrica | Estimativa |
|---------|-----------| 
| Referring domains | |
| Total de backlinks | |
| Links dofollow % | |
| Qualidade geral (1-10) | |

## ⚡ KW Gaps (oportunidades não exploradas)
5 palavras-chave que o concorrente provavelmente NÃO ranqueia e você pode explorar

## 🎯 Score de SEO: X/10`,

      content: `Analise a ESTRATÉGIA DE CONTEÚDO do site: ${domain}
${nicheCtx}

## 📝 Arquitetura Editorial
- Estrutura de categorias prováveis
- Modelo de cluster semântico usado
- Relação pilar/satélite identificada
- Profundidade média dos artigos estimada

## 📅 Frequência e Volume
| Métrica | Estimativa |
|---------|-----------| 
| Artigos publicados/mês | |
| Total de conteúdo indexado | |
| Atualização de conteúdo antigo | |

## ✍️ Análise de Qualidade (scores 1-10)
- Profundidade técnica | Humanização do copy | SEO on-page | Escaneabilidade mobile | FAQ estruturado

## 💡 Gaps de Conteúdo Identificados
5 oportunidades que o concorrente NÃO explora bem

## 🔄 O que replicar + onde superar
## 🎯 Score de Conteúdo: X/10`,

      monetization: `Analise a ESTRATÉGIA DE MONETIZAÇÃO do site: ${domain}
${nicheCtx}

## 💰 Modelos de Receita Identificados
Para cada modelo, estime % da receita: Afiliados | Display ads | Conteúdo patrocinado | Produtos próprios | Email | Outros

## 🎯 Estratégia de CTA
- Densidade, posicionamento, tipos e qualidade dos CTAs

## 🛍️ Produtos Afiliados Prováveis
Top 5 categorias de produtos que provavelmente promove

## 💡 Oportunidades Não Exploradas
3 modelos que o concorrente provavelmente não usa

## 🎯 Score de Monetização: X/10`,

      full: `Faça uma ANÁLISE COMPETITIVA COMPLETA do site: ${domain}
${nicheCtx}

Esta análise é inspirada nas metodologias de SimilarWeb, SEMrush, Ahrefs e Moz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 SCORECARD EXECUTIVO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| Dimensão | Score (0-10) | Status |
|----------|-------------|--------|
| Tráfego & Audiência | | |
| Autoridade SEO | | |
| Qualidade de Conteúdo | | |
| Estratégia de KWs | | |
| Perfil de Backlinks | | |
| Monetização | | |
| UX & Escaneabilidade | | |
| **SCORE GERAL** | | |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 TRÁFEGO (estilo SimilarWeb)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visitas mensais | Páginas/visita | Tempo no site | Bounce rate | % orgânico | % mobile

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔑 SEO & AUTORIDADE (estilo SEMrush/Ahrefs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Domain Authority | KWs rankeadas | KWs top 10 | Referring domains | Backlinks totais
Top 8 KWs prováveis com volume e posição estimados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 ESTRATÉGIA DE CONTEÚDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Arquitetura editorial, clusters, profundidade, frequência, pontos fortes e fracos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 💰 MONETIZAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Modelos de receita, CTAs, estimativa de RPM, oportunidades não exploradas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ GAPS & OPORTUNIDADES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top 5 oportunidades para superar este concorrente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📋 PLANO DE AÇÃO (30/60/90 dias)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
30 dias | 60 dias | 90 dias

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 VEREDICTO FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dificuldade para superar: BAIXA / MÉDIA / ALTA
Tempo estimado para ultrapassar: X meses
Principal vantagem competitiva disponível:`
    }

    const result = await callGroq(
      [{ role: 'system' as const, content: BENCHMARK_SYSTEM }, { role: 'user' as const, content: prompts[category] || prompts.full }],
      { temperature: 0.6, max_tokens: 5000 }
    )

    return NextResponse.json({ result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
