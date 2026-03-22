// ─── PageHeader — reutilizável em todas as páginas ───────────────
interface PageHeaderProps {
  badge: string
  badgeColor?: string
  title: string
  subtitle?: string
  progress?: number
  right?: React.ReactNode
}

export default function PageHeader({ badge, badgeColor = '#7C6FFF', title, subtitle, progress, right }: PageHeaderProps) {
  return (
    <div className="flex-shrink-0 px-6 py-4 border-b border-[#1E1E30]" style={{ background: '#0A0A14' }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-mono tracking-widest mb-0.5" style={{ color: badgeColor }}>{badge}</div>
          <h1 className="font-display text-xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-xs text-[#4B4B60] mt-0.5">{subtitle}</p>}
        </div>
        {right && <div>{right}</div>}
      </div>
      {progress != null && progress > 0 && (
        <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: '#1E1E30' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${badgeColor}, #7C6FFF)` }} />
        </div>
      )}
    </div>
  )
}
