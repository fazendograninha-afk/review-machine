'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const from = params.get('from') || '/'

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 500)
    return () => clearInterval(t)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Senha incorreta')
        setLoading(false)
        return
      }

      router.push(from)
      router.refresh()
    } catch {
      setError('Erro de conexão')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#080810' }}>

      {/* Background effects */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(30,30,48,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,30,48,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: '#7C6FFF' }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: '#00F5A0' }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-black mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #7C6FFF, #00F5A0)', boxShadow: '0 0 40px rgba(124,111,255,0.3)' }}>
            M
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Review Machine</h1>
          <p className="text-xs font-mono tracking-widest" style={{ color: '#3A3A55' }}>
            BY MAICKNUCLEAR{'.'.repeat(dots)}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}
          className="rounded-2xl p-6"
          style={{ background: '#0E0E1A', border: '1px solid #1E1E30' }}>

          <div className="mb-5">
            <label className="block text-[10px] font-mono tracking-widest mb-2" style={{ color: '#3A3A55' }}>
              SENHA DE ACESSO
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••••••"
              autoFocus
              className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-[#2A2A40] focus:outline-none transition-all"
              style={{
                background: '#080810',
                border: `1px solid ${error ? '#FF4D8D' : password ? '#7C6FFF40' : '#1E1E30'}`,
                fontFamily: 'monospace',
                letterSpacing: password ? '0.3em' : 'normal',
              }}
            />
            {error && (
              <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: '#FF4D8D' }}>
                <span>✗</span> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all"
            style={{
              background: loading || !password
                ? '#1E1E30'
                : 'linear-gradient(135deg, #7C6FFF, #00F5A0)',
              color: loading || !password ? '#3A3A55' : '#000',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
            }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                Verificando...
              </span>
            ) : '→ Entrar'}
          </button>
        </form>

        <p className="text-center text-[10px] mt-4" style={{ color: '#2A2A40' }}>
          Acesso restrito · Review Machine v2.0
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
