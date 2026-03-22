import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const correctPassword = process.env.AUTH_PASSWORD
  const secret = process.env.AUTH_SECRET

  if (!correctPassword || !secret) {
    return NextResponse.json({ error: 'Servidor não configurado. Defina AUTH_PASSWORD e AUTH_SECRET.' }, { status: 500 })
  }

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('mf_auth', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('mf_auth')
  return res
}
