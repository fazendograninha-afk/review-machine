// ─── Site Review Milionário — Prompt Maximizado v3 ────────────────

export const REVIEW_SYSTEM = `Você é um estrategista de SEO avançado, arquiteto de autoridade digital e copywriter investigativo especializado em sites review dominantes em português brasileiro.

DOMÍNIOS:
• Engenharia de SERP profunda — análise real de intent + SERP gap
• SEO semântico + Entity optimization — cluster de entidades + termos relacionados
• Psicologia de decisão fundo de funil — captura de quem já está decidindo comprar
• Arquitetura pilar + satélites — hub central + 6 satélites interligados
• Copy investigativa humana — tom cético, lúcido, sem euforia
• Escaneabilidade mobile-first — parágrafos curtos, tabelas, subtítulos
• Intenção comercial avançada — keywords: vale a pena / é golpe / reclame aqui

IDENTIDADE DE ESCRITA:
Você escreve como alguém que: Testou. Comparou. Desconfiou. Leu avaliações. Quase desistiu. Comprou. Usou. Voltou para relatar.

TOM: Adulto. Lúcido. Racional. Levemente cético. Zero euforia. Zero linguagem de marketing.

FRASES OBRIGATÓRIAS (inserir naturalmente ao longo do texto):
- "Aqui é onde a diferença começa a aparecer."
- "Nem sempre o mais caro é o melhor."
- "Depende muito do seu perfil."
- "Eu tambem fiquei na duvida no comeco."
- "Na pratica, é isso que realmente importa."

REGRAS ABSOLUTAS:
✗ Nunca parecer patrocinado
✗ Nunca prometer milagres
✗ Nunca exagerar prós nem minimizar contras
✗ Nunca usar tom de marketing
✗ Nunca mencionar IA — texto deve soar como experiência humana real
✗ Nunca citar concorrentes externos pelo nome
✓ Inserir 1-2 erros leves de digitação naturais (humaniza o texto)
✓ Seção Reclame Aqui SEMPRE presente — é o maior diferencial da concorrência
✓ Para quem NÃO serve: sempre presente, sem suavizar
✓ KW principal: exatamente 22 ocorrências no artigo pilar, distribuição natural
✓ Mínimo 30 termos semânticos relacionados

META: Leitor pensa "Eu não preciso pesquisar mais nada." Google pensa "Esse domínio domina o assunto."`

// ─── Artigo Pilar — 5 partes (~7.000–8.500 palavras total) ───────

export function REVIEW_PARTS(produto: string, link: string) {
  const l = link || '[link do produto]'
  return [
    {
      label: 'Parte 1/5 — SEO técnico, Abertura estratégica, O que é',
      prompt: `PRODUTO: ${produto} | LINK: ${l}

Escreva a PARTE 1 do artigo pilar. Entre 1.400 e 1.600 palavras. NÃO encerre o artigo.

ENTREGUE PRIMEIRO (bloco separado antes do artigo):
🔹 SLUG: curto, estratégico, focado em decisão de compra
🔹 META DESCRIPTION: máx 155 chars — valida dúvida + indica análise real + alto CTR
🔹 3 OPÇÕES DE H1: gere 3 variações, indique qual tem maior CTR estimado
🔹 KW PRINCIPAL IDENTIFICADA

---

# [H1 principal escolhido]

## Abertura estratégica (280–350 palavras)
- Validar a dúvida do leitor já no 1º parágrafo — inserir "Eu tambem fiquei na duvida no comeco."
- KW principal nos primeiros 120 palavras
- Postura investigativa, nunca publicitária
- CTA leve após a intro: link ${l} com anchor natural

## O que é o ${produto} e como funciona (700–800 palavras)
- Explicação técnica e concreta — sem linguagem de manual
- Como funciona na prática real, não no papel
- Para que situações específicas foi desenvolvido
- Como se diferencia de produtos genéricos da categoria
- Dados técnicos relevantes com contexto de uso

KW principal: ~6x nesta parte. Tom investigativo e humano. Parágrafos curtos (mobile-first).`
    },
    {
      label: 'Parte 2/5 — Para quem é, Análise técnica profunda',
      prompt: `PRODUTO: ${produto} | LINK: ${l}

Escreva a PARTE 2 do artigo pilar. Entre 1.400 e 1.600 palavras. NÃO encerre o artigo.

## Para quem é — e para quem NÃO é (550–650 palavras)
- Perfil ideal do comprador com especificidade real
- 3–4 casos de uso ideais com contexto concreto
- Para quem NÃO faz sentido comprar — sem suavizar
- Custo da decisão errada: o que acontece quando se compra errado
- Perfis específicos quando relevante: idoso, diabético, apartamento pequeno, atleta etc.

## Análise profunda do produto (800–900 palavras)
- Construção e materiais com avaliação realista
- Funcionalidade real — não o que o fabricante promete, o que de fato entrega
- Pontos fortes específicos com exemplos concretos
- Limitações honestas — "Aqui é onde a diferença começa a aparecer."
- MÓDULO DURABILIDADE (produtos físicos de uso contínuo):
  * Percepções que só aparecem após dias/semanas de uso
  * Desgaste realista vs expectativa
- MÓDULO APP/INTERNET (quando conectividade impacta experiência):
  * Funciona sem app? Sem internet? O que se perde?

KW principal: ~6x nesta parte. 1 erro leve de digitação natural.`
    },
    {
      label: 'Parte 3/5 — Experiência prática real, Prós/Contras, Análise de Compra com Reclame Aqui',
      prompt: `PRODUTO: ${produto} | LINK: ${l}

Escreva a PARTE 3 do artigo pilar. Entre 1.400 e 1.600 palavras. NÃO encerre o artigo.

## Experiência prática detalhada (700–800 palavras)
- Uso real com detalhes sensoriais
- Pequenas frustrações honestas que criam credibilidade
- Erros comuns de uso
- Inserir OBRIGATORIAMENTE de forma natural:
  * "Nem sempre o mais caro é o melhor."
  * "Depende muito do seu perfil."
  * "Na pratica, é isso que realmente importa."
- 1 erro leve de digitação nesta seção

## Prós e Contras (tabela mobile-friendly)
| ✅ Prós | ❌ Contras |
|---------|----------|
Mínimo 7 prós e 6 contras REAIS — contras honestos, sem minimizar.

## Bloco de análise de compra (450–550 palavras)
- Faixa de preço médio atual
- Avaliações reais (nota e quantidade no marketplace)
- Garantia e política de devolução
- Segurança da plataforma de compra
- ⚠️ SEÇÃO RECLAME AQUI (OBRIGATÓRIA):
  * Principais reclamações por modelo/marca
  * Frequência e severidade das queixas
  * Se a empresa resolve ou ignora
  * Se são deal-breakers ou problemas pontuais

KW principal: ~6x nesta parte.`
    },
    {
      label: 'Parte 4/5 — Benefícios reais, Onde comprar, Dicas de uso',
      prompt: `PRODUTO: ${produto} | LINK: ${l}

Escreva a PARTE 4 do artigo pilar. Entre 1.300 e 1.500 palavras. NÃO encerre o artigo.

## Benefícios reais que impactam o dia a dia (500–600 palavras)
- Somente o que impacta na prática — nada que o fabricante já diz na embalagem
- 6–7 benefícios concretos com contexto real
- Benefícios que o leitor não perceberia sem usar
- Impacto antes vs depois

## Onde comprar com segurança (300–350 palavras)
- Plataformas confiáveis (ML, Amazon, site oficial)
- O que verificar: vendedor, avaliações, garantia
- Red flags de produtos falsificados
- CTA contextual: ${l} — anchor natural

## Dicas de uso e manutenção (450–500 palavras)
- 5–6 dicas práticas para aproveitar o máximo
- Erros comuns de quem começa a usar
- Como prolongar a vida útil
- MÓDULO MANUTENÇÃO (produtos técnicos/eletrônicos):
  * Ciclo de vida estimado
  * Custo total em 3 anos (produto + manutenção + energia)
  * Onde encontrar assistência técnica no Brasil

KW principal: ~5x nesta parte.`
    },
    {
      label: 'Parte 5/5 — FAQ SEO avançado (14+ perguntas), Linkagem interna, Conclusão racional',
      prompt: `PRODUTO: ${produto} | LINK: ${l}

Escreva a PARTE 5 FINAL do artigo pilar. Entre 1.400 e 1.600 palavras. CONCLUA completamente o artigo.

## Perguntas frequentes sobre ${produto}
MÍNIMO 14 perguntas long tail fundo de funil com respostas completas (4–6 linhas cada):
1. "${produto} vale a pena?"
2. "${produto} funciona mesmo?"
3. "${produto} é bom ou ruim?"
4. "${produto} é confiável?"
5. "${produto} é golpe?"
6. "${produto} no Reclame Aqui — tem problemas?"
7. "${produto} resultados reais — o que esperar?"
8. "Onde comprar ${produto} com segurança?"
9. "${produto} vs alternativa — qual escolher?"
10. "${produto} tem garantia? Por quanto tempo?"
11. "${produto} quanto tempo dura?"
12. "${produto} tem assistência técnica no Brasil?"
13. "Consigo devolver se não gostar?"
14. "${produto} compensa comprar em 2026?"

## Links relacionados
Inserir 2–3 referências naturais a artigos satélites:
- "Se quiser saber se ${produto} funciona mesmo, veja nosso teste completo →"
- "Antes de decidir, veja: ${produto} vale a pena em 2026? →"
- "Veja também as principais reclamações sobre ${produto} →"

## Conclusão racional — vale a pena comprar o ${produto}? (300–400 palavras)
- Síntese honesta — não forçar recomendação
- Deixar claro para quem recomenda e para quem não
- Leitor deve sair pensando: "Eu não preciso pesquisar mais nada."
- CTA final forte e natural: ${l}
- Nota de transparência + data de atualização

KW principal: ~5x nesta parte. Total do artigo: exatamente 22 ocorrências.`
    },
  ]
}

// ─── Satélites — 6 artigos do cluster ────────────────────────────

export const SAT_LABELS = [
  { title: (p: string) => `${p} funciona mesmo? Fizemos o teste real`, kw: (p: string) => `${p} funciona` },
  { title: (p: string) => `${p} vale a pena em 2026? Análise honesta de custo-benefício`, kw: (p: string) => `${p} vale a pena` },
  { title: (p: string) => `${p} é confiável ou é golpe? A investigação completa`, kw: (p: string) => `${p} confiável` },
  { title: (p: string) => `Resultados reais com ${p}: experiência prática de quem usou`, kw: (p: string) => `${p} resultados` },
  { title: (p: string) => `${p}: reclamações reais e o que ninguém te conta`, kw: (p: string) => `${p} reclamações` },
  { title: (p: string) => `Melhor alternativa ao ${p}: comparação honesta`, kw: (p: string) => `alternativa ${p}` },
]

const SAT_FOCOS = [
  `FOCO: Ceticismo — para quem duvida e quer prova real.
ESTRUTURA:
1. Intro: abordar o ceticismo diretamente
2. Metodologia do teste — detalhada e crível
3. O que funcionou bem vs o que não funcionou
4. Comparação: expectativa do fabricante vs realidade
5. Perfis com bons resultados vs maus resultados
6. FAQ cético (mínimo 7 perguntas)
7. Veredicto: funciona para quem? Não funciona para quem?
8. CTA + link obrigatório para o Artigo Pilar`,

  `FOCO: Custo-benefício — para quem está em cima do muro.
ESTRUTURA:
1. Intro: contexto de mercado em 2026
2. Análise do preço atual vs custo total em 3 anos
3. Para qual faixa de uso/renda faz sentido
4. Comparação com alternativas de menor e maior preço
5. Quando vale muito a pena / quando não vale nada
6. FAQ de custo-benefício (mínimo 7 perguntas)
7. Veredicto por perfil de comprador
8. CTA + link obrigatório para o Artigo Pilar`,

  `FOCO: Desconfiança — para quem tem medo de ser enganado.
ESTRUTURA:
1. Intro: por que as pessoas desconfiam
2. Análise da marca: histórico, reputação, presença no Brasil
3. Análise do Reclame Aqui: principais queixas e postura da empresa
4. Red flags identificados + explicação honesta
5. Sinais de produto legítimo
6. Política de devolução e garantia na prática
7. FAQ de confiabilidade (mínimo 7 perguntas)
8. Veredicto final transparente
9. CTA + link obrigatório para o Artigo Pilar`,

  `FOCO: Curiosidade prática — quer ver na prática antes de comprar.
ESTRUTURA:
1. Intro: "vou te contar o que realmente aconteceu"
2. Primeiras impressões (primeira semana)
3. Semana 1–2: adaptação e descobertas
4. Mês 1+: uso consolidado e percepções definitivas
5. Resultados mensuráveis quando aplicável
6. Dicas que ninguém te conta antes de comprar
7. FAQ de resultados práticos (mínimo 7 perguntas)
8. CTA + link obrigatório para o Artigo Pilar`,

  `FOCO: Pesquisa negativa — quem vai ao Reclame Aqui antes de comprar.
ESTRUTURA:
1. Intro: transparência como valor
2. Top 5–7 reclamações mais frequentes (Reclame Aqui + marketplaces)
3. Para cada reclamação: frequência, severidade, se empresa resolve
4. Problemas que aparecem só após meses de uso
5. Reclamações injustas vs reclamações legítimas
6. Como evitar os problemas mais comuns
7. FAQ sobre problemas (mínimo 7 perguntas)
8. Conclusão: compensa mesmo com esses problemas?
9. CTA + link obrigatório para o Artigo Pilar`,

  `FOCO: Comparação — para quem quer opções antes de decidir.
ESTRUTURA:
1. Intro: por que comparar faz sentido
2. Critérios de comparação usados
3. 3–4 alternativas reais com análise honesta
4. Tabela comparativa final (mobile-friendly)
5. Quando o produto original ganha, quando perde
6. Para qual perfil cada opção é a melhor escolha
7. FAQ de comparação (mínimo 7 perguntas)
8. Conclusão orientada por perfil
9. CTA + link obrigatório para o Artigo Pilar`,
]

export function SATELLITE_PROMPT(produto: string, link: string, idx: number): string {
  const sat = SAT_LABELS[idx % SAT_LABELS.length]
  const l = link || '[link afiliado]'
  return `PRODUTO: ${produto} | LINK: ${l}
ARTIGO SATÉLITE ${idx + 1}/6
TÍTULO: "${sat.title(produto)}"
KW PRINCIPAL: "${sat.kw(produto)}"

Escreva artigo satélite COMPLETO de 3.500 a 4.000 palavras.

🔹 SLUG estratégico | META DESCRIPTION (máx 155 chars, alto CTR) | H1

${SAT_FOCOS[idx % 6]}

REGRAS:
- Tom: investigativo, humano, levemente cético. Zero hype.
- 1 erro leve de digitação (humaniza)
- KW "${sat.kw(produto)}": 14–16x de forma natural
- 30+ termos semânticos distribuídos
- Linkar 2x para o artigo pilar naturalmente
- Parágrafos curtos (mobile-first)`
}

// ─── Comparativo ─────────────────────────────────────────────────

export function COMPARATIVE_PROMPT(produto: string, links: string[]): string {
  return `PRODUTOS: ${produto}
LINKS: ${links.join(' | ')}

ARTIGO COMPARATIVO COMPLETO de 5.000 a 6.000 palavras.

🔹 SLUG | META DESCRIPTION | H1 comparativo

ESTRUTURA:
1. Introdução — por que este comparativo importa (200 palavras)
2. Tabela resumo inicial com todos os produtos
3. Para cada produto — mini review (400–500 palavras): o que é, prós/contras, link com CTA
4. Comparativo técnico lado a lado (tabela grande)
5. Para quem é cada opção (por perfil)
6. Veredicto final: melhor geral / melhor custo-benefício / melhor premium
7. FAQ comparativo (8–10 perguntas)
8. Conclusão com CTAs para cada produto

Tom: consultor imparcial. 1 erro leve de digitação.`
}

// ─── Cluster semântico ────────────────────────────────────────────

export function CLUSTER_PROMPT(produto: string, link: string): string {
  return `PRODUTO: ${produto} | LINK: ${link}

PLANO COMPLETO DE CLUSTER SEMÂNTICO:

## 1. ARTIGO PILAR (hub central)
Título, slug, meta, KW principal + volume estimado, 8 H2s descritos, 25+ KWs semânticas

## 2. 6 ARTIGOS SATÉLITES
Para cada: número | título | slug | KW + intenção | meta description | foco temático | 5 H2s | anchor text para o pilar

## 3. ARQUITETURA DE LINKAGEM EM ESTRELA
Diagrama textual + todos os anchor texts (pilar ↔ satélites)

## 4. CRONOGRAMA EDITORIAL — 4 SEMANAS
| Semana | Post | Tipo | KW foco | Objetivo |
Semana 1: Pilar + Satélite 1
Semana 2: Satélites 2 + 3
Semana 3: Satélites 4 + 5
Semana 4: Satélite 6 + Atualização do Pilar

## 5. KPIs A MONITORAR (30/60/90 dias)

## 6. ESTRATÉGIA PÓS-CICLO (após 30 dias)
Atualização de avaliações, novos FAQs, changelog visível`
}

// ─── Pack SEO Técnico ─────────────────────────────────────────────

export function SEO_PACK_PROMPT(produto: string, link: string): string {
  return `PRODUTO: ${produto} | LINK: ${link}

Gere o PACK SEO TÉCNICO COMPLETO em formato JSON.
Retorne APENAS o JSON válido, sem markdown, sem texto adicional.

{
  "produto_nome": "nome identificado",
  "keyword_principal": "keyword principal",
  "slug": "slug-otimizado",
  "meta_description": "máx 155 chars, alto CTR",
  "h1_opcoes": ["opção 1", "opção 2", "opção 3"],
  "termos_semanticos": ["mínimo 30 termos como array"],
  "keywords_fundo_funil": ["${produto} vale a pena", "${produto} funciona mesmo", "${produto} é golpe", "${produto} reclame aqui", "melhor ${produto} 2026"],
  "imagens_sugeridas": [
    {"nome_arquivo": "nome-produto-keyword.webp", "alt_text": "descrição + keyword", "posicao": "onde inserir"}
  ],
  "cronograma": [
    {"semana": 1, "post": 1, "tipo": "Artigo Pilar", "objetivo": "Hub central — indexação prioritária"},
    {"semana": 1, "post": 2, "tipo": "Satélite 1", "objetivo": "Capturar céticos"},
    {"semana": 2, "post": 3, "tipo": "Satélite 2", "objetivo": "Capturar indecisos"},
    {"semana": 2, "post": 4, "tipo": "Satélite 3", "objetivo": "Capturar busca negativa"},
    {"semana": 3, "post": 5, "tipo": "Satélite 4", "objetivo": "Validação prática"},
    {"semana": 3, "post": 6, "tipo": "Satélite 5", "objetivo": "Dominar Reclame Aqui"},
    {"semana": 4, "post": 7, "tipo": "Satélite 6", "objetivo": "Capturar quem pesquisa opções"},
    {"semana": 4, "post": 8, "tipo": "Atualização Pilar", "objetivo": "FAQ expandido + escaneabilidade"}
  ],
  "linkagem_interna": "Arquitetura em estrela: pilar é hub central. Todos os satélites linkam para o pilar. Pilar linka para 2-3 satélites estratégicos."
}`
}
