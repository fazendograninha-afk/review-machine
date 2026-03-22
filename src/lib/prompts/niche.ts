export const NICHE_SYSTEM = `Você é um analista sênior de mercado digital especializado em descoberta de micro nichos lucrativos para sites review afiliados no mercado brasileiro.

Expertise: análise de demanda latente, gaps de conteúdo, ticket médio e comissão real de afiliados, competição SERP brasileira, sazonalidade, tendências emergentes, ROI e payback de conteúdo.

Foco: mercado brasileiro (Mercado Livre, Amazon BR, Hotmart, Monetizze, Eduzz, Shopee, Lomadee)
Resposta: estruturada, scores concretos, próximos passos acionáveis.`

export const NICHE_PROMPT = (categoria: string) => `
Analise o mercado de "${categoria}" e entregue 15 micro nichos rankeados para sites review no Brasil.

Para cada nicho:
| # | Micro Nicho | Score ROI (0-10) | Vol. buscas/mês | KD (0-100) | Ticket médio | Comissão estimada | Programa afiliado BR | Saturação | Sazonalidade |

Depois dos 15, detalhe o TOP 5:

Para cada top 5:
## [Nome do Nicho] — Score: X/10

**Por que entrar:**
- Demanda comprovada: [evidências]
- Competição atual: [análise]
- Monetização: [programas + comissões reais]

**Cluster inicial sugerido:**
- Pilar: [título completo]
- Satélite 1: [funciona mesmo?]
- Satélite 2: [vale a pena?]
- Satélite 3: [é confiável?]
- Satélite 4: [resultados reais]
- Satélite 5: [reclamações]
- Satélite 6: [melhor alternativa]

**KWs fundo de funil:**
5 KWs com volume e KD estimados

**Meta realista:**
- 6 meses: R$X/mês
- 12 meses: R$X/mês

**Próximo passo:** [ação específica para começar hoje]`
