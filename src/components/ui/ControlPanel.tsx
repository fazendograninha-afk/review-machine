// ─── ControlPanel — painel lateral esquerdo de controles ─────────
interface ControlPanelProps {
  children: React.ReactNode
  width?: string
}

export default function ControlPanel({ children, width = 'w-72' }: ControlPanelProps) {
  return (
    <div className={`${width} flex-shrink-0 overflow-y-auto p-4 space-y-4`}
      style={{ borderRight: '1px solid #1E1E30', background: '#0A0A14' }}>
      {children}
    </div>
  )
}
