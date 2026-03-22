// ─── Groq Client — Central ────────────────────────────────────────
import { GROQ_MODELS, TOKEN_LIMITS, TEMPERATURES, ModelKey } from './config/models'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export interface GroqMessage { role: 'system' | 'user' | 'assistant'; content: string }
export interface GroqOptions {
  temperature?: number
  max_tokens?: number
  model?: ModelKey
}

function getApiKey() {
  const key = process.env.GROQ_API_KEY
  if (!key || key === 'gsk_sua_chave_aqui') throw new Error('Configure GROQ_API_KEY no .env.local')
  return key
}

function buildHeaders(key: string) {
  return { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }
}

// ─── Non-streaming call ────────────────────────────────────────────
export async function callGroq(
  messages: GroqMessage[],
  options: GroqOptions = {}
): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: buildHeaders(getApiKey()),
    body: JSON.stringify({
      model: GROQ_MODELS[options.model ?? 'default'],
      messages,
      temperature: options.temperature ?? TEMPERATURES.balanced,
      max_tokens: options.max_tokens ?? TOKEN_LIMITS.long,
      stream: false,
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.choices[0]?.message?.content ?? ''
}

// ─── Streaming call ───────────────────────────────────────────────
export async function streamGroq(
  messages: GroqMessage[],
  options: GroqOptions = {}
): Promise<ReadableStream> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: buildHeaders(getApiKey()),
    body: JSON.stringify({
      model: GROQ_MODELS[options.model ?? 'default'],
      messages,
      temperature: options.temperature ?? TEMPERATURES.creative,
      max_tokens: options.max_tokens ?? TOKEN_LIMITS.max,
      stream: true,
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)
  return res.body!
}

// ─── Multi-part sequential calls (para artigos 6k-8k palavras) ────
export async function callGroqMultipart(
  systemPrompt: string,
  parts: Array<{ label: string; prompt: string }>,
  options: GroqOptions = {}
): Promise<ReadableStream> {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      const emit = (text: string) =>
        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
        ))

      try {
        for (let i = 0; i < parts.length; i++) {
          emit(`\n\n> ⏳ *${parts[i].label}...*\n\n`)
          const result = await callGroq(
            [{ role: 'system', content: systemPrompt }, { role: 'user', content: parts[i].prompt }],
            { ...options, model: options.model ?? 'long', max_tokens: TOKEN_LIMITS.max }
          )
          emit(result)
          if (i < parts.length - 1) emit('\n\n---\n\n')
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err: any) {
        emit(`\n\n❌ Erro: ${err.message}`)
      }
      controller.close()
    }
  })
}

// ─── Compatibility helpers (Gemini-style API) ─────────────────────
export async function callGroqSimple(
  prompt: string,
  system: string,
  options: GroqOptions = {}
): Promise<string> {
  return callGroq(
    [{ role: 'system' as const, content: system }, { role: 'user' as const, content: prompt }],
    options
  )
}

export async function streamGroqSimple(
  prompt: string,
  system: string,
  options: GroqOptions = {}
): Promise<ReadableStream> {
  return streamGroq(
    [{ role: 'system' as const, content: system }, { role: 'user' as const, content: prompt }],
    options
  )
}
