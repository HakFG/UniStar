"use client";

/**
 * Captura erros que acontecem dentro do RootLayout.
 * Precisa incluir <html> e <body> porque o layout não roda nesse caso.
 * Usa estilos inline porque o Tailwind pode não estar carregado.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          background: "#0b0d17",
          color: "#f1f0f5",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            ✕
          </div>

          <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem" }}>
            Algo deu muito errado
          </h1>
          <p
            style={{
              opacity: 0.7,
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            Precisamos recarregar a página pra continuar.
          </p>

          <button
            onClick={reset}
            style={{
              background: "#5FD4D0",
              color: "#0b0d17",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: "9999px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}