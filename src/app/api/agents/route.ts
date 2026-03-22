import { NextRequest, NextResponse } from 'next/server'
import { callGroq } from '@/lib/groq'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { system, user } = await req.json()

    const result = await callGroq(
      [{ role: 'system' as const, content: system }, { role: 'user' as const, content: user }],
      { temperature: 0.6, max_tokens: 3000 }
    )

    return NextResponse.json({ result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
