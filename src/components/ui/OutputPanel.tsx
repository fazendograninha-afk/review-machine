// ─── OutputPanel — painel de saída reutilizável ──────────────────
'use client'
import { useState } from 'react'

interface OutputPanelProps {
  result: string
  loading: boolean
  loadingText?: string
  emptyIcon?: string
  emptyText?: string
  filename?: string
  label?: string
}

export default function OutputPanel({ result, loading, loadingText, emptyIcon = '◈', emptyText = 'Configure os parâmetros e execute', filename = 'output', label }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const download = () => {
    const b = new Blob([result], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(b)
    a.download = `${filename}-${Date.now()}.md`
    a.click()
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {result && (
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]" />
            {label && <span className="text-xs text-[#6B7280] font-mono truncate max-w-xs">{label}</span>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="px-3 py-1 rounded-lg text-xs transition-colors"
              style={{ background: '#1E1E30', color: copied ? '#00F5A0' : '#6B7280' }}>
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
            <button onClick={download} className="px-3 py-1 rounded-lg text-xs" style={{ background: '#1E1E30', color: '#6B7280' }}>
              ↓ .md
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6">
        {!result && !loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4 opacity-10">{emptyIcon}</div>
            <p className="text-sm text-[#2A2A40] max-w-xs">{emptyText}</p>
          </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-[#7C6FFF20] animate-spin" style={{ borderTopColor: '#7C6FFF' }} />
              <div className="absolute inset-3 rounded-full border-2 border-[#00F5A020] animate-spin" style={{ borderTopColor: '#00F5A0', animationDirection: 'reverse' }} />
            </div>
            <p className="text-sm text-[#4B4B60]">{loadingText || 'Processando...'}</p>
          </div>
        ) : (
          <pre className="prose-review whitespace-pre-wrap font-body text-sm leading-relaxed max-w-4xl">{result}</pre>
        )}
      </div>
    </div>
  )
}
