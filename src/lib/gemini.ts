// ─── Gemini Flash 2.0 Client — Central ───────────────────────────

const GEMINI_MODEL = 'gemini-2.0-flash'

interface CallOptions {
  temperature?: number
  max_tokens?: number
}

// Monta a URL com a chave
function getUrl(streaming = false) {
  const key = process.env.GEMINI_API_KEY || ''
  const method = streaming ? 'streamGenerateContent' : 'generateContent'
  const sse = streaming ? '&alt=sse' : ''
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:${method}?key=${key}${sse}`
}

// Monta o body — system embutido no texto do user para evitar bugs de schema
function buildBody(userPrompt: string, system: string, options: CallOptions): string {
  const fullPrompt = `${system}\n\n---\n\n${userPrompt}`
  return JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: fullPrompt }],
      },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.max_tokens ?? 8192,
    },
  })
}

// ── Chamada simples (retorna string) ──────────────────────────────
export async function callGemini(
  userPrompt: string,
  system: string,
  options: CallOptions = {}
): Promise<string> {
  const res = await fetch(getUrl(false), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: buildBody(userPrompt, system, options),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// ── Streaming (SSE → formato compatível com frontend) ─────────────
export async function streamGemini(
  userPrompt: string,
  system: string,
  options: CallOptions = {}
): Promise<ReadableStream> {
  const encoder = new TextEncoder()

  const res = await fetch(getUrl(true), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: buildBody(userPrompt, system, options),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API ${res.status}: ${err}`)
  }

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
            const raw = line.slice(6).trim()
            if (!raw) continue
            try {
              const parsed = JSON.parse(raw)
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || ''
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
      } catch {}
      controller.close()
    },
  })
}
