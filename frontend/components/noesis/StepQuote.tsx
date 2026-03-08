"use client"

import { useRef, useEffect } from "react"
import type { Prompt } from "@/types/prompt"

interface StepQuoteProps {
  prompt: Prompt | null
  value: string
  onChange: (v: string) => void
}

export function StepQuote({ prompt, value, onChange }: StepQuoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <div className="step-enter flex flex-col gap-12">
      {/* Step label */}
      <p
        className="font-mono text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--gold)", opacity: 0.7 }}
      >
        I — Contemplación
      </p>

      {/* Quote block */}
      <div className="relative">
        {/* Oversized opening mark */}
        <span
          className="absolute font-sans select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(7rem, 14vw, 11rem)",
            lineHeight: 1,
            color: "var(--gold)",
            opacity: 0.12,
            top: "-2.5rem",
            left: "-1.5rem",
          }}
          aria-hidden="true"
        >
          "
        </span>

        <blockquote
          className="relative z-10"
          style={{ fontFamily: "var(--font-dm-serif), serif" }}
        >
          <p
            className="text-balance leading-snug"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(1.8rem, 4.5vw, 2.35rem)",
              color: "var(--cream)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            {prompt?.cita ?? ""}
          </p>

          {/* Closing mark */}
          <span
            className="inline-block font-sans select-none"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(4rem, 8vw, 6.5rem)",
              lineHeight: 1,
              color: "var(--gold)",
              opacity: 0.12,
              transform: "translateY(0.3em)",
              marginLeft: "0.15em",
            }}
            aria-hidden="true"
          >
            "
          </span>
        </blockquote>

        {/* Attribution */}
        <footer className="mt-8 flex items-center gap-4">
          <div
            className="h-px flex-shrink-0 w-8"
            style={{ background: "var(--divider)" }}
          />
          <div>
            <p
              className="font-mono text-xs tracking-[0.18em]"
              style={{
                color: "var(--gold)",
                opacity: 0.8,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              {prompt?.autor ?? ""}
            </p>
            <p
              className="font-mono text-xs mt-1 tracking-[0.12em]"
              style={{ color: "var(--cream-dim)", textTransform: "uppercase" }}
            >
              {prompt?.corriente ?? ""}
            </p>
          </div>
        </footer>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "var(--divider)" }} />

      {/* Reflection textarea */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="reflection"
          className="font-mono text-xs tracking-[0.15em] uppercase"
          style={{ color: "var(--cream-dim)" }}
        >
          Tu reflexión
        </label>
        <textarea
          ref={textareaRef}
          id="reflection"
          className="ghost-textarea w-full text-base leading-relaxed py-3 min-h-[80px] font-mono"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "1.05rem",
          }}
          placeholder="¿Qué te genera esto?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          aria-label="Escribe tu reflexión sobre la cita"
        />
      </div>
    </div>
  )
}
