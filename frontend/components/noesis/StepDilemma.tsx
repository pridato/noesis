"use client"

interface StepDilemmaProps {
  selected: "si" | "no" | null
  onSelect: (v: "si" | "no") => void
}

export function StepDilemma({ selected, onSelect }: StepDilemmaProps) {
  return (
    <div className="step-enter flex flex-col gap-12">
      {/* Step label */}
      <p
        className="font-mono text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--gold)", opacity: 0.7 }}
      >
        II — El Dilema
      </p>

      {/* Question */}
      <div>
        <p
          className="font-mono text-xs tracking-[0.15em] uppercase mb-6"
          style={{ color: "var(--cream-dim)" }}
        >
          Considera lo siguiente
        </p>
        <h2
          className="text-balance leading-snug"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(1.5rem, 3.8vw, 2rem)",
            color: "var(--cream)",
            lineHeight: 1.4,
          }}
        >
          ¿Preferiría conocer una verdad dolorosa{" "}
          <em>antes que vivir en una ilusión reconfortante?</em>
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "var(--divider)" }} />

      {/* Choice cards */}
      <div className="grid grid-cols-2 gap-5" role="group" aria-label="Elige tu respuesta">
        {(["si", "no"] as const).map((option) => {
          const isSelected = selected === option
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`dilemma-card flex flex-col items-start justify-between p-8 min-h-[160px] border ${
                isSelected ? "selected" : ""
              }`}
              style={{
                background: isSelected ? "var(--gold-dim)" : "var(--surface)",
                borderColor: isSelected ? "var(--gold)" : "var(--border)",
                cursor: "pointer",
              }}
              aria-pressed={isSelected}
            >
              <span
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--cream-dim)" }}
              >
                {option === "si" ? "Afirmo" : "Niego"}
              </span>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-dm-serif), serif",
                    fontSize: "clamp(2.8rem, 7vw, 3.8rem)",
                    color: isSelected ? "var(--gold)" : "var(--cream)",
                    lineHeight: 1,
                    display: "block",
                    transition: "color 0.3s ease",
                  }}
                >
                  {option === "si" ? "Sí" : "No"}
                </span>

                {isSelected && (
                  <span
                    className="block mt-3 font-mono text-xs tracking-[0.12em] uppercase"
                    style={{ color: "var(--gold)", opacity: 0.75 }}
                  >
                    ↗ Seleccionado
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Context note */}
      <p
        className="font-mono text-xs leading-relaxed"
        style={{ color: "var(--cream-dim)", letterSpacing: "0.04em" }}
      >
        No hay respuesta correcta. Solo hay la tuya.
      </p>
    </div>
  )
}
