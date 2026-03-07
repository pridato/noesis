"use client"

import { useState, useCallback } from "react"
import { ProgressBar } from "./ProgressBar"
import { StepQuote } from "./StepQuote"
import { StepDilemma } from "./StepDilemma"
import { StepOpen } from "./StepOpen"
import { StepResult } from "./StepResult"
import { AnalysisOverlay } from "./AnalysisOverlay"

const TOTAL_STEPS = 4

type DilemmaChoice = "si" | "no" | null

interface QuizState {
  step: number
  reflection: string
  dilemma: DilemmaChoice
  openAnswer: string
  showAnalysis: boolean
}

interface NoesisQuizProps {
  userName?: string
}

export function NoesisQuiz({ userName }: NoesisQuizProps = {}) {
  const [state, setState] = useState<QuizState>({
    step: 1,
    reflection: "",
    dilemma: null,
    openAnswer: "",
    showAnalysis: false,
  })

  const [stepKey, setStepKey] = useState(0)

  const goTo = useCallback((nextStep: number) => {
    setState((s) => ({ ...s, step: nextStep }))
    setStepKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const canAdvance = () => {
    if (state.step === 1) return state.reflection.trim().length > 0
    if (state.step === 2) return state.dilemma !== null
    if (state.step === 3) return state.openAnswer.trim().length > 0
    return true
  }

  if (state.showAnalysis) {
    return (
      <main className="relative z-10 min-h-screen">
        <div
          className="mx-auto px-6 py-16"
          style={{ maxWidth: "680px" }}
        >
          <AnalysisOverlay
            dilemmaChoice={state.dilemma}
            onReset={() => {
              setState({
                step: 1,
                reflection: "",
                dilemma: null,
                openAnswer: "",
                showAnalysis: false,
              })
              setStepKey((k) => k + 1)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="relative z-10 min-h-screen">
      <ProgressBar step={state.step} total={TOTAL_STEPS} />

      <div
        className="mx-auto px-6 py-24"
        style={{ maxWidth: "680px" }}
      >
        {/* Wordmark */}
        <header className="mb-20 flex items-center justify-between">
          <div>
            <h1
              className="font-mono text-sm tracking-[0.35em] uppercase"
              style={{ color: "var(--gold)", letterSpacing: "0.35em" }}
            >
              NOESIS
            </h1>
          <p
            className="font-mono text-xs mt-1 tracking-[0.08em]"
            style={{ color: "var(--cream-dim)", opacity: 0.45 }}
          >
            {userName ? `${userName}` : "Autoconocimiento filosófico"}
          </p>
          </div>

          {/* Step counter */}
          <p
            className="font-mono text-xs tabular-nums"
            style={{ color: "var(--cream-dim)", opacity: 0.45 }}
          >
            {String(state.step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
          </p>
        </header>

        {/* Step content with re-mount key for animation */}
        <div key={stepKey}>
          {state.step === 1 && (
            <StepQuote
              value={state.reflection}
              onChange={(v) => setState((s) => ({ ...s, reflection: v }))}
            />
          )}
          {state.step === 2 && (
            <StepDilemma
              selected={state.dilemma}
              onSelect={(v) => setState((s) => ({ ...s, dilemma: v }))}
            />
          )}
          {state.step === 3 && (
            <StepOpen
              value={state.openAnswer}
              onChange={(v) => setState((s) => ({ ...s, openAnswer: v }))}
            />
          )}
          {state.step === 4 && (
            <StepResult
              onReveal={() => setState((s) => ({ ...s, showAnalysis: true }))}
            />
          )}
        </div>

        {/* Navigation — shown on steps 1–3 */}
        {state.step < 4 && (
          <div className="mt-16 flex items-center justify-between">
            {/* Back */}
            {state.step > 1 ? (
              <button
                onClick={() => goTo(state.step - 1)}
                className="font-mono text-xs tracking-[0.12em] uppercase transition-opacity duration-200"
                style={{
                  color: "var(--cream-dim)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: 0.5,
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = "0.5")}
                aria-label="Paso anterior"
              >
                ← Anterior
              </button>
            ) : (
              <span />
            )}

            {/* Next */}
            <button
              onClick={() => canAdvance() && goTo(state.step + 1)}
              disabled={!canAdvance()}
              className="underline-expand font-mono text-xs tracking-[0.18em] uppercase"
              style={{
                color: canAdvance() ? "var(--gold)" : "var(--cream-dim)",
                opacity: canAdvance() ? 1 : 0.3,
                background: "none",
                border: "none",
                cursor: canAdvance() ? "pointer" : "default",
                transition: "opacity 0.35s ease, color 0.35s ease",
              }}
              aria-label="Siguiente paso"
              aria-disabled={!canAdvance()}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Thin bottom rule */}
        <div
          className="mt-20 h-px w-full"
          style={{ background: "var(--divider)" }}
        />

        {/* Footer */}
        <footer className="mt-6 flex justify-between items-center">
          <p
            className="font-mono text-xs"
            style={{ color: "var(--cream-dim)", opacity: 0.3, letterSpacing: "0.08em" }}
          >
            NOESIS / {new Date().getFullYear()}
          </p>
          <p
            className="font-mono text-xs"
            style={{ color: "var(--cream-dim)", opacity: 0.3, letterSpacing: "0.06em" }}
          >
            Gnôthi seautón
          </p>
        </footer>
      </div>
    </main>
  )
}
