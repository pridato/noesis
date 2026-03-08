"use client"

interface StepResultProps {
  onReveal: () => void
}

export function StepResult({ onReveal }: StepResultProps) {
  return (
    <div className="step-enter flex flex-col gap-16 items-center text-center py-8">
      {/* Step label */}
      <p
        className="font-mono text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--gold)", opacity: 0.7 }}
      >
        IV — Síntesis
      </p>

      {/* Decorative glyph */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer ring */}
          <div
            className="absolute inset-0 border"
            style={{ borderColor: "var(--divider)" }}
          />
          {/* Inner dot */}
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--gold)" }}
          />
          {/* Corner ticks */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-2.5 h-2.5 ${pos}`}
              style={{ borderColor: "var(--gold)", opacity: 0.6 }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-balance"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            color: "var(--cream)",
            lineHeight: 1.3,
          }}
        >
          Has completado el recorrido.
        </h2>
        <p
          className="font-mono text-sm leading-relaxed max-w-sm mx-auto"
          style={{ color: "var(--cream-dim)", letterSpacing: "0.04em" }}
        >
          Tus respuestas revelan un patrón de pensamiento singular.
          El análisis está listo.
        </p>
      </div>

      {/* Thin gold divider */}
      <div
        className="w-16 h-px mx-auto"
        style={{ background: "var(--gold)", opacity: 0.35 }}
      />

      {/* CTA — text link */}
      <button
        onClick={onReveal}
        className="underline-expand font-mono text-sm tracking-[0.15em] uppercase group"
        style={{
          color: "var(--gold)",
          background: "none",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.15em",
        }}
        aria-label="Ver tu análisis filosófico"
      >
        Ver mi análisis →
      </button>

      {/* Fine print */}
      <p
        className="font-mono text-xs"
        style={{ color: "var(--cream-dim)", opacity: 0.4, letterSpacing: "0.06em" }}
      >
        Solo tú tienes acceso a este perfil.
      </p>
    </div>
  )
}
