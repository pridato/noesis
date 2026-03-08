"use client"

import { useState, useRef, useEffect } from "react"

interface NoesisAuthProps {
  onEnter: (name: string) => void
}

export function NoesisAuth({ onEnter }: NoesisAuthProps) {
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Slight delay so the entrance animation plays cleanly
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || submitting) return
    setSubmitting(true)
    // Let the fade-out animation complete before notifying parent
    setTimeout(() => onEnter(trimmed), 640)
  }

  return (
    <div
      className="auth-shell"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        className={submitting ? "auth-form-exit" : mounted ? "step-enter" : ""}
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          opacity: mounted ? undefined : 0,
        }}
      >
        {/* ── Wordmark ── */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
              letterSpacing: "0.28em",
              color: "var(--gold)",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
            aria-label="NOESIS"
          >
            NOESIS
          </div>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: "var(--cream-dim)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Examina lo que crees. Descubre por qué.
          </p>
        </header>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Name input — bottom-border only */}
          <div style={{ marginBottom: "1.25rem" }}>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="off"
              autoFocus
              maxLength={60}
              aria-label="Tu nombre"
              className="auth-input"
              style={{
                display: "block",
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--divider)",
                color: "var(--cream)",
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: "1rem",
                letterSpacing: "0.04em",
                padding: "0.5rem 0 0.75rem",
                outline: "none",
                caretColor: "var(--gold)",
                transition: "border-color 0.35s ease",
                borderRadius: 0,
              }}
            />
          </div>

          {/* Helper text */}
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              color: "#6b6557",
              marginBottom: "3rem",
              lineHeight: 1.6,
            }}
          >
            Sin contraseña. Sin datos personales.
          </p>

          {/* CTA button — full-width, outlined gold, no fill */}
          <button
            type="submit"
            disabled={!name.trim() || submitting}
            className="auth-cta"
            style={{
              display: "block",
              width: "100%",
              background: "transparent",
              border: "1px solid var(--divider)",
              color: name.trim() ? "var(--cream)" : "var(--cream-dim)",
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              padding: "1rem 0",
              cursor: name.trim() ? "pointer" : "default",
              textAlign: "center",
              transition: "border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              {submitting ? "..." : "ENTRAR →"}
            </span>
          </button>
        </form>

        {/* ── Footer note ── */}
        <footer
          style={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.05em",
              color: "#3a3830",
              lineHeight: 1.6,
            }}
          >
            Tu nombre es tu única identidad aquí.
          </p>
        </footer>
      </div>

      <style>{`
        .auth-input::placeholder {
          color: rgba(232, 224, 208, 0.3);
          font-style: italic;
        }
        .auth-input:focus {
          border-bottom-color: rgba(201, 169, 110, 0.65) !important;
        }

        .auth-cta:not(:disabled):hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          box-shadow: 0 0 24px var(--gold-glow), inset 0 0 16px rgba(201, 169, 110, 0.04);
        }
        .auth-cta:not(:disabled)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .auth-cta:not(:disabled):hover::after {
          width: 100%;
        }

        @keyframes authExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-14px); }
        }
        .auth-form-exit {
          animation: authExit 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  )
}
