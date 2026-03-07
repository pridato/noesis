"use client"

interface ProgressBarProps {
  step: number
  total: number
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100)

  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Paso ${step} de ${total}`}
    >
      {/* Track */}
      <div
        className="w-full h-px"
        style={{ background: "rgba(201,169,110,0.1)" }}
      />
      {/* Fill */}
      <div
        className="h-px transition-all duration-700 ease-in-out"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, rgba(201,169,110,0.3) 0%, var(--gold) 100%)",
          marginTop: "-1px",
          boxShadow: "0 0 12px rgba(201,169,110,0.6)",
        }}
      />
    </div>
  )
}
