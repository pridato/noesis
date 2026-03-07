"use client"

interface AnalysisOverlayProps {
  dilemmaChoice: "si" | "no" | null
  onReset: () => void
}

const PROFILES = {
  si: {
    archetype: "El Buscador",
    trait: "Epistémica — Tipo I",
    description:
      "Tu disposición a enfrentar la verdad dolorosa revela una arquitectura mental orientada al conocimiento sobre el consuelo. Valoras la claridad por encima de la tranquilidad, y percibes la ignorancia no como refugio sino como traición a ti mismo.",
    thinker: "Sócrates",
    school: "Dialéctica Socrática",
    quote: "Una vida no examinada no merece ser vivida.",
    tension:
      "El peligro: confundir el conocimiento con la sabiduría, y la dureza con la profundidad.",
  },
  no: {
    archetype: "El Custodio",
    trait: "Pragmática — Tipo II",
    description:
      "Tu elección sugiere una inteligencia orientada a la preservación del equilibrio. No niegas la verdad — la administras. Reconoces que el ser humano no siempre está preparado para lo que descubre, y que ciertas ilusiones sostienen lo que ninguna verdad podría.",
    thinker: "William James",
    school: "Pragmatismo Americano",
    quote: "La verdad es lo que nos conviene creer.",
    tension:
      "El peligro: que la comodidad se convierta en su propio tipo de oscuridad.",
  },
}

export function AnalysisOverlay({ dilemmaChoice, onReset }: AnalysisOverlayProps) {
  const profile = dilemmaChoice ? PROFILES[dilemmaChoice] : PROFILES.si

  return (
    <div
      className="step-enter min-h-screen flex flex-col justify-center py-24"
      style={{ position: "relative" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-16">
        {/* Label */}
        <p
          className="font-mono text-xs tracking-[0.22em] uppercase"
          style={{ color: "var(--gold)", opacity: 0.7 }}
        >
          Tu análisis — NOESIS
        </p>

        {/* Archetype */}
        <div className="flex flex-col gap-3">
          <p
            className="font-mono text-xs tracking-[0.18em] uppercase"
            style={{ color: "var(--cream-dim)" }}
          >
            Arquetipo detectado
          </p>
          <h1
            className="text-balance"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(2.4rem, 6vw, 3.5rem)",
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            {profile.archetype}
          </h1>
          <p
            className="font-mono text-xs tracking-[0.15em] uppercase"
            style={{ color: "var(--gold)", opacity: 0.65 }}
          >
            {profile.trait}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "var(--divider)" }} />

        {/* Description */}
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
            color: "var(--cream)",
            opacity: 0.85,
            lineHeight: 1.65,
          }}
        >
          {profile.description}
        </p>

        {/* Thinker reference */}
        <div
          className="border p-6 flex flex-col gap-4"
          style={{
            borderColor: "var(--divider)",
            background: "var(--surface)",
          }}
        >
          <p
            className="font-mono text-xs tracking-[0.15em] uppercase"
            style={{ color: "var(--cream-dim)" }}
          >
            Resonancia filosófica
          </p>
          <blockquote>
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "clamp(1rem, 2.3vw, 1.15rem)",
                color: "var(--cream)",
                lineHeight: 1.5,
              }}
            >
              "{profile.quote}"
            </p>
          </blockquote>
          <footer className="flex items-center gap-3">
            <div className="h-px w-5" style={{ background: "var(--gold)", opacity: 0.4 }} />
            <div>
              <span
                className="font-mono text-xs tracking-[0.15em] uppercase"
                style={{ color: "var(--gold)", opacity: 0.8 }}
              >
                {profile.thinker}
              </span>
              <span
                className="font-mono text-xs ml-3 tracking-[0.1em]"
                style={{ color: "var(--cream-dim)" }}
              >
                — {profile.school}
              </span>
            </div>
          </footer>
        </div>

        {/* Tension note */}
        <div className="flex gap-4 items-start">
          <div
            className="w-px self-stretch flex-shrink-0"
            style={{ background: "var(--gold)", opacity: 0.3, minHeight: "2rem" }}
          />
          <p
            className="font-mono text-xs leading-relaxed"
            style={{ color: "var(--cream-dim)", letterSpacing: "0.05em" }}
          >
            {profile.tension}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "var(--divider)" }} />

        {/* Reset */}
        <div className="flex justify-between items-center">
          <p
            className="font-mono text-xs tracking-[0.1em]"
            style={{ color: "var(--cream-dim)", opacity: 0.45 }}
          >
            NOESIS / {new Date().getFullYear()}
          </p>
          <button
            onClick={onReset}
            className="underline-expand font-mono text-xs tracking-[0.15em] uppercase"
            style={{
              color: "var(--cream-dim)",
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.6,
            }}
          >
            Reiniciar ←
          </button>
        </div>
      </div>
    </div>
  )
}
