interface RunButtonProps {
  onClick: () => void
  loading: boolean
  disabled?: boolean
  label: string
  loadingLabel?: string
  color?: string
}

export default function RunButton({ onClick, loading, disabled, label, loadingLabel, color = '#00F5A0' }: RunButtonProps) {
  const isDisabled = loading || disabled
  return (
    <button onClick={onClick} disabled={isDisabled}
      className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all"
      style={{
        background: isDisabled ? '#1E1E30' : `linear-gradient(135deg, ${color}, #7C6FFF)`,
        color: isDisabled ? '#3A3A55' : '#000',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
          {loadingLabel || 'Processando...'}
        </span>
      ) : label}
    </button>
  )
}
