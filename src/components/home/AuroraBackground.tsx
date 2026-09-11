export default function AuroraBackground() {
  return (
    <>
      {/* ── Grain / noise texture overlay ── */}
      <div className="grain-overlay" aria-hidden="true" />

      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* ── Camada 1: Blobs principais da aurora ── */}
        <div
          className="aurora-blob-1 absolute w-[65vw] h-[65vw] rounded-full opacity-45"
          style={{
            top: "-15%",
            left: "-12%",
            background: "radial-gradient(circle at 40% 40%, #5B2A86 0%, #3A1460 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="aurora-blob-2 absolute w-[58vw] h-[58vw] rounded-full opacity-40"
          style={{
            top: "15%",
            right: "-18%",
            background: "radial-gradient(circle at 60% 40%, #1B4B5A 0%, #0D2E38 40%, transparent 70%)",
            filter: "blur(85px)",
          }}
        />
        <div
          className="aurora-blob-3 absolute w-[52vw] h-[52vw] rounded-full opacity-30"
          style={{
            bottom: "-20%",
            left: "15%",
            background: "radial-gradient(circle at 50% 50%, #B23A6E 0%, #6E1E40 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* ── Camada 2: Blobs de profundidade ── */}
        <div
          className="aurora-blob-4 absolute w-[40vw] h-[40vw] rounded-full opacity-18"
          style={{
            top: "40%",
            left: "30%",
            background: "radial-gradient(circle, #5fd4d0 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="aurora-blob-5 absolute w-[35vw] h-[35vw] rounded-full opacity-12"
          style={{
            top: "-5%",
            right: "20%",
            background: "radial-gradient(circle, #B23A6E 0%, transparent 65%)",
            filter: "blur(110px)",
          }}
        />

        {/* ── Camada 3: Campo de estrelas (pontos fixos) ── */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Estrelas fixas com twinkle */}
          <circle cx="12%" cy="8%"  r="1.2" fill="#f1f0f5" style={{ animation: "star-twinkle 4.2s 0.3s ease-in-out infinite" }} />
          <circle cx="28%" cy="5%"  r="0.7" fill="#5fd4d0" style={{ animation: "star-twinkle 3.7s 1.1s ease-in-out infinite" }} />
          <circle cx="55%" cy="4%"  r="1.3" fill="#f1f0f5" style={{ animation: "star-twinkle 5.0s 0.7s ease-in-out infinite" }} />
          <circle cx="72%" cy="3%"  r="0.8" fill="#b23a6e" style={{ animation: "star-twinkle 4.5s 2.0s ease-in-out infinite" }} />
          <circle cx="85%" cy="9%"  r="1.0" fill="#f1f0f5" style={{ animation: "star-twinkle 3.9s 0.5s ease-in-out infinite" }} />
          <circle cx="93%" cy="18%" r="0.6" fill="#5fd4d0" style={{ animation: "star-twinkle 6.0s 1.8s ease-in-out infinite" }} />
          <circle cx="7%"  cy="22%" r="0.9" fill="#f1f0f5" style={{ animation: "star-twinkle 4.8s 0.9s ease-in-out infinite" }} />
          <circle cx="42%" cy="2%"  r="0.5" fill="#5fd4d0" style={{ animation: "star-twinkle 5.2s 2.4s ease-in-out infinite" }} />
          <circle cx="64%" cy="88%" r="1.2" fill="#b23a6e" style={{ animation: "star-twinkle 3.5s 0.2s ease-in-out infinite" }} />
          <circle cx="18%" cy="93%" r="0.8" fill="#f1f0f5" style={{ animation: "star-twinkle 4.1s 1.5s ease-in-out infinite" }} />
          <circle cx="78%" cy="76%" r="0.9" fill="#5fd4d0" style={{ animation: "star-twinkle 5.5s 3.0s ease-in-out infinite" }} />
          <circle cx="37%" cy="52%" r="0.4" fill="#f1f0f5" style={{ animation: "star-twinkle 3.3s 1.9s ease-in-out infinite" }} />
          <circle cx="88%" cy="62%" r="1.1" fill="#f1f0f5" style={{ animation: "star-twinkle 4.6s 0.6s ease-in-out infinite" }} />
          <circle cx="3%"  cy="72%" r="0.7" fill="#5fd4d0" style={{ animation: "star-twinkle 5.8s 1.3s ease-in-out infinite" }} />
          <circle cx="48%" cy="95%" r="0.6" fill="#f1f0f5" style={{ animation: "star-twinkle 4.0s 2.7s ease-in-out infinite" }} />
          <circle cx="62%" cy="42%" r="0.5" fill="#b23a6e" style={{ animation: "star-twinkle 6.2s 0.4s ease-in-out infinite" }} />
          <circle cx="20%" cy="48%" r="0.8" fill="#f1f0f5" style={{ animation: "star-twinkle 3.8s 1.6s ease-in-out infinite" }} />
          <circle cx="95%" cy="35%" r="1.0" fill="#5fd4d0" style={{ animation: "star-twinkle 4.4s 2.1s ease-in-out infinite" }} />

          {/* Partículas de luz flutuantes */}
          <circle cx="22%" cy="30%" r="2.4" fill="#5fd4d0" style={{ animation: "float-particle 6.0s 0.8s ease-in-out infinite" }} />
          <circle cx="70%" cy="25%" r="2.0" fill="#b23a6e" style={{ animation: "float-particle 7.5s 2.2s ease-in-out infinite" }} />
          <circle cx="48%" cy="70%" r="1.8" fill="#5B2A86" style={{ animation: "float-particle 5.5s 1.4s ease-in-out infinite" }} />

          {/* ── Shooting stars (estrelas que voam) ── */}
          {/* Shooting star 1 — canto sup esquerdo */}
          <line
            x1="5%" y1="15%"
            x2="5.5%" y2="15.3%"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              animation: "shooting-star 4s 1s ease-in infinite",
              filter: "blur(0.4px)",
            }}
          />
          {/* Shooting star 2 — meio superior */}
          <line
            x1="35%" y1="6%"
            x2="35.6%" y2="6.4%"
            stroke="#5fd4d0"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              animation: "shooting-star 3.5s 5.5s ease-in infinite",
              filter: "blur(0.3px)",
            }}
          />
          {/* Shooting star 3 — canto sup direito */}
          <line
            x1="70%" y1="3%"
            x2="70.8%" y2="3.5%"
            stroke="white"
            strokeWidth="0.9"
            strokeLinecap="round"
            style={{
              animation: "shooting-star 5s 11s ease-in infinite",
              filter: "blur(0.5px)",
            }}
          />
          {/* Shooting star 4 — esquerda alta */}
          <line
            x1="15%" y1="2%"
            x2="15.7%" y2="2.4%"
            stroke="#b23a6e"
            strokeWidth="0.8"
            strokeLinecap="round"
            style={{
              animation: "shooting-star 4.2s 8s ease-in infinite",
              filter: "blur(0.3px)",
            }}
          />
        </svg>

        {/* ── Vignette: escurece bordas ── */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,13,23,0.72) 100%)",
          }}
        />

        {/* ── Overlay base ── */}
        <div className="absolute inset-0 bg-base/50" />
      </div>
    </>
  );
}
