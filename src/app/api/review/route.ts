import { NextRequest, NextResponse } from 'next/server'
import { REVIEW_SYSTEM, REVIEW_PARTS, SATELLITE_PROMPT, COMPARATIVE_PROMPT, CLUSTER_PROMPT, SEO_PACK_PROMPT } from '@/lib/prompts/review'
import { callGroqSimple as callGroq, streamGroqSimple as streamGroq } from '@/lib/groq'

export const runtime = 'nodejs'
export const maxDuration = 120

// ── Artigo Pilar — 5 partes sequenciais ──────────────────────────
async function generatePilar(produto: string, link: string): Promise<ReadableStream> {
  const encoder = new TextEncoder()
  const parts = REVIEW_PARTS(produto, link)

  return new ReadableStream({
    async start(controller) {
      function emit(text: string) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`)
        )
      }
      try {
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i]
          emit(`\n\n> ⏳ *${part.label}...*\n\n`)
          const stream = await streamGroq(part.prompt, REVIEW_SYSTEM, { temperature: 0.72, max_tokens: 8192 })
          const reader = stream.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
          if (i < parts.length - 1) emit('\n\n---\n\n')
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err: any) {
        emit(`\n\n❌ Erro: ${err.message}`)
      }
      controller.close()
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { productName, productLink, comparativeLinks, type, satelliteIndex } = await req.json()
    if (!productName && !productLink)
      return NextResponse.json({ error: 'Informe nome ou link do produto' }, { status: 400 })

    const produto = productName || 'produto'
    const link = productLink || ''
    const encoder = new TextEncoder()

    if (type === 'pilar') {
      const stream = await generatePilar(produto, link)
      return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } })
    }

    if (type === 'seo') {
      const result = await callGroq(SEO_PACK_PROMPT(produto, link), REVIEW_SYSTEM, { temperature: 0.5, max_tokens: 4096 })
      try {
        const parsed = JSON.parse(result.replace(/```json|```/g, '').trim())
        return NextResponse.json({ seoData: parsed })
      } catch {
        return NextResponse.json({ seoData: null, raw: result })
      }
    }

    let prompt = ''
    if (type === 'satellite')   prompt = SATELLITE_PROMPT(produto, link, satelliteIndex ?? 0)
    else if (type === 'comparativo') {
      const links = comparativeLinks ? comparativeLinks.split('\n').filter(Boolean) : [link]
      prompt = COMPARATIVE_PROMPT(produto, links)
    }
    else if (type === 'cluster') prompt = CLUSTER_PROMPT(produto, link)
    else return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })

    const stream = await streamGroq(prompt, REVIEW_SYSTEM, { temperature: 0.72, max_tokens: 8192 })
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
