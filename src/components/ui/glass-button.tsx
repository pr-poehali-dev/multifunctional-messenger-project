import React from "react";

// ── iOS-glass button ──────────────────────────────────────────
export function GlassButton({ children, onClick, className = "", title = "", style }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative overflow-hidden backdrop-blur-2xl border border-white/10 transition-all duration-200 hover:border-white/20 active:scale-95 ${className}`}
      style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 60%,rgba(255,255,255,0.07) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%)" }}
      />
      {children}
    </button>
  );
}

// ── Avatar ────────────────────────────────────────────────────
export function Ava({ text, color, size = 40, online }: {
  text: string;
  color: string;
  size?: number;
  online?: boolean;
}) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="flex items-center justify-center rounded-full text-white font-bold"
        style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
      >
        {text}
      </div>
      {online && (
        <div
          className="absolute bottom-0 right-0 rounded-full border-2 border-[#0A0B12]"
          style={{ width: size * 0.28, height: size * 0.28, background: "#10B981" }}
        />
      )}
    </div>
  );
}
