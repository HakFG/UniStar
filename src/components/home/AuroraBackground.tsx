export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="aurora-blob-1 absolute w-[60vw] h-[60vw] rounded-full opacity-40"
        style={{
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, #5B2A86 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="aurora-blob-2 absolute w-[55vw] h-[55vw] rounded-full opacity-40"
        style={{
          top: "20%",
          right: "-15%",
          background: "radial-gradient(circle, #1B4B5A 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="aurora-blob-3 absolute w-[50vw] h-[50vw] rounded-full opacity-30"
        style={{
          bottom: "-15%",
          left: "20%",
          background: "radial-gradient(circle, #B23A6E 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute inset-0 bg-base/60" />
    </div>
  );
}