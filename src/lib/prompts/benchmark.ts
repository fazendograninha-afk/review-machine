export const BENCHMARK_SYSTEM = `Você é um analista sênior de inteligência competitiva digital, especializado em sites review brasileiros.

Você domina as metodologias de:
• SimilarWeb: tráfego estimado, fontes de visitas, engajamento, distribuição geográfica, canais de aquisição
• SEMrush: Domain Authority, KWs orgânicas rankeadas, KW gaps, backlink profile, tendências
• Ahrefs: Domain Rating, referring domains, anchor text profile, conteúdo mais linkado
• Moz: Page Authority, spam score, link profile quality

Sempre entregue dados estimados quando não há acesso direto — deixe claro que são estimativas baseadas em padrões do mercado.`

export const BENCHMARK_PROMPTS: Record<string, (domain: string, niche: string) => string> = {
  traffic: (d, n) => `Analise TRÁFEGO E AUDIÊNCIA do site: ${d} | Nicho: ${n || 'infira pela URL'}

Estilo SimilarWeb:

## 📊 Visão Geral de Tráfego
| Métrica | Estimativa | Benchmark do nicho |
Visitas mensais | Páginas/visita | Duração média | Bounce rate | Usuários únicos/mês

## 🌍 Distribuição geográfica | 📱 Dispositivos | 🔀 Canais de Aquisição (%)
Orgânico | Direto | Social | Referral | Email | Pago

## 📈 Tendência 12 meses | 🎯 Score de Audiência: X/10`,

  seo: (d, n) => `Analise SEO e PALAVRAS-CHAVE do site: ${d} | Nicho: ${n || 'infira'}

Estilo SEMrush + Ahrefs:

## 🔑 Métricas de Autoridade
DA (0-100) | DR Ahrefs | Trust Flow | Spam Score | Idade do domínio

## 📋 KWs Orgânicas Estimadas
Total rankeadas | Top 3 | Top 10 | Top 30

## 🏆 Top 10 KWs prováveis
Com volume estimado e posição

## 🔗 Perfil de Backlinks
Referring domains | Total backlinks | % dofollow | Qualidade (1-10)

## ⚡ KW Gaps — 5 oportunidades que o concorrente NÃO ranqueia

## 🎯 Score SEO: X/10`,

  content: (d, n) => `Analise ESTRATÉGIA DE CONTEÚDO do site: ${d} | Nicho: ${n || 'infira'}

## 📝 Arquitetura Editorial
Clusters identificados | Modelo pilar/satélite | Profundidade média | Frequência estimada

## ✍️ Qualidade (scores 1-10)
Profundidade técnica | Humanização do copy | SEO on-page | Escaneabilidade mobile | FAQ e conteúdo estruturado

## 🎯 Estratégia de intenção de busca
Informacional vs Comercial vs Transacional

## 💡 5 Gaps de conteúdo | 🔄 O que replicar + onde superar

## 🎯 Score de Conteúdo: X/10`,

  monetization: (d, n) => `Analise MONETIZAÇÃO do site: ${d} | Nicho: ${n || 'infira'}

## 💰 Modelos de Receita (% estimado + efetividade)
Afiliados | Display ads | Patrocinado | Produtos próprios | Email | Outros

## 🎯 Estratégia de CTA
Densidade por artigo | Posicionamento | Tipos usados | Qualidade do copy (1-10)

## 🛍️ Top 5 categorias de produtos promovidos
## 📧 Estratégia de email/retenção
## 💡 3 modelos de monetização não explorados

## 🎯 Score de Monetização: X/10`,

  full: (d, n) => `ANÁLISE COMPETITIVA COMPLETA do site: ${d} | Nicho: ${n || 'infira'}
Metodologias: SimilarWeb, SEMrush, Ahrefs, Moz.

━━ 🎯 SCORECARD EXECUTIVO
| Dimensão | Score (0-10) | Status |
Tráfego & Audiência | Autoridade SEO | Qualidade Conteúdo | Estratégia KWs | Backlinks | Monetização | UX | **SCORE GERAL**

━━ 📊 TRÁFEGO (SimilarWeb)
Visitas mensais | Páginas/visita | Tempo no site | Bounce rate | % orgânico | % mobile

━━ 🔑 SEO (SEMrush/Ahrefs)
DA | KWs total | KWs top 10 | Referring domains | Top 8 KWs com volume e posição

━━ 📝 ESTRATÉGIA DE CONTEÚDO
Arquitetura | Clusters | Frequência | Pontos fortes | Pontos fracos exploráveis

━━ 💰 MONETIZAÇÃO
Modelos | CTAs | Estimativa RPM e receita mensal | Oportunidades não exploradas

━━ ⚡ TOP 5 GAPS & OPORTUNIDADES
1. KW gap | 2. SEO técnico | 3. Monetização | 4. UX | 5. Autoridade

━━ 📋 PLANO DE AÇÃO (30/60/90 dias)
30 dias: 3 ações imediatas | 60 dias: 3 ações médio prazo | 90 dias: 3 ações para consolidar

━━ 🏆 VEREDICTO FINAL
Dificuldade para superar: BAIXA/MÉDIA/ALTA | Tempo estimado: X meses | Principal vantagem disponível:`,
}
