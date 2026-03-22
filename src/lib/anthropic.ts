// ─── Anthropic Client — Central ───────────────────────────────────

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-5'

export interface AnthropicMessage {
  role: 'user' | 'assistant'
  content: string
}

interface CallOptions {
  temperature?: number
  max_tokens?: number
}

// ── Chamada simples (retorna string completa) ─────────────────────
export async function callClaude(
  messages: AnthropicMessage[],
  system: string,
  options: CallOptions = {}
): Promise<string> {
  const { temperature = 0.7, max_tokens = 6000 } = options

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens,
      system,
      messages,
      ...(temperature !== undefined && { temperature }),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text || ''
}

// ── Streaming (retorna ReadableStream compatível com SSE) ─────────
export async function streamClaude(
  messages: AnthropicMessage[],
  system: string,
  options: CallOptions = {}
): Promise<ReadableStream> {
  const { temperature = 0.7, max_tokens = 8000 } = options
  const encoder = new TextEncoder()

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'messages-2023-12-15',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens,
      stream: true,
      system,
      messages,
      ...(temperature !== undefined && { temperature }),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${err}`)
  }

  // Converte SSE da Anthropic → SSE no formato que o frontend espera
  return new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (!data || data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const text = parsed?.delta?.text || ''
              if (text) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
                  )
                )
              }
            } catch {}
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        // silently close
      }
      controller.close()
    },
  })
}
