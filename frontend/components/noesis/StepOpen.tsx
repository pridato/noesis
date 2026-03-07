"use client"

import { useRef, useEffect } from "react"

const MAX_CHARS = 420

interface StepOpenProps {
  value: string
  onChange: (v: string) => void
}

export function StepOpen({ value, onChange }: StepOpenProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const remaining = MAX_CHARS - value.length
  const isNearLimit = remaining <= 60
  const isAtLimit = remaining <= 0

  return (
    <div className="step-enter flex flex-col gap-12">
      {/* Step label */}
      <p
        className="font-mono text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--gold)", opacity: 0.7 }}
      >
        III — Introspección
      </p>

      {/* Question */}
      <div>
        <p
          className="font-mono text-xs tracking-[0.15em] uppercase mb-6"
          style={{ color: "var(--cream-dim)" }}
        >
          Pregunta abierta
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
          ¿Qué parte de ti mismo aún no has sido capaz de{" "}
          <em>mirar directamente?</em>
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "var(--divider)" }} />

      {/* Textarea with ghost border */}
      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="open-answer"
          className="font-mono text-xs tracking-[0.15em] uppercase"
          style={{ color: "var(--cream-dim)" }}
        >
          Tu respuesta
        </label>

        <div
          className="relative border p-0 transition-colors duration-300"
          style={{ borderColor: "var(--border)" }}
        >
          <textarea
            ref={textareaRef}
            id="open-answer"
            className="w-full bg-transparent text-base leading-relaxed p-5 pb-8 min-h-[160px] outline-none resize-none"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "1.05rem",
              color: "var(--cream)",
              caretColor: "var(--gold)",
              letterSpacing: "0.005em",
            }}
            placeholder="Escribe sin censura. Solo tú leerás esto."
            value={value}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                onChange(e.target.value)
              }
            }}
            rows={5}
            maxLength={MAX_CHARS}
            aria-label="Tu respuesta a la pregunta abierta"
          />

          {/* Character counter */}
          <span
            className="absolute bottom-3 right-4 font-mono text-xs tabular-nums"
            style={{
              color: isAtLimit
                ? "#c06060"
                : isNearLimit
                  ? "var(--gold)"
                  : "var(--cream-dim)",
              opacity: isNearLimit ? 1 : 0.55,
              transition: "color 0.3s ease, opacity 0.3s ease",
            }}
            aria-live="polite"
            aria-label={`${remaining} caracteres restantes`}
          >
            {remaining}
          </span>
        </div>

        {/* Subtle corner accent */}
        <div
          className="absolute top-6 left-0 w-4 h-4 border-t border-l pointer-events-none"
          style={{ borderColor: "var(--gold)", opacity: 0.3 }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-4 h-4 border-b border-r pointer-events-none"
          style={{ borderColor: "var(--gold)", opacity: 0.3 }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
