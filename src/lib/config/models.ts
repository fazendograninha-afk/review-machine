// ─── Groq Models Config ────────────────────────────────────────────
// Troque aqui para mudar o modelo em todo o SaaS de uma vez

export const GROQ_MODELS = {
  fast:    'llama-3.1-8b-instant',       // Rápido, respostas curtas
  default: 'llama-3.3-70b-versatile',    // Padrão — melhor custo/benefício
  long:    'llama-3.3-70b-versatile',    // Artigos longos (mesma config, mais tokens)
} as const

export type ModelKey = keyof typeof GROQ_MODELS

// Token limits por caso de uso
export const TOKEN_LIMITS = {
  short:    2000,   // Análise rápida
  medium:   4000,   // Nicho, benchmark
  long:     6000,   // Artigos satélite, agents
  max:      8000,   // Pilar (por parte)
} as const

// Temperature por caso de uso
export const TEMPERATURES = {
  analytical: 0.3,  // Análises, scores, dados
  balanced:   0.65, // Benchmarking, nichos
  creative:   0.72, // Review articles, copy
} as const
