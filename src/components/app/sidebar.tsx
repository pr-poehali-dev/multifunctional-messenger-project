import Icon from "@/components/ui/icon";
import { GlassButton } from "@/components/ui/glass-button";
import { NAV_ITEMS, Section } from "@/components/app/data";

interface SidebarProps {
  active: Section;
  sidebarOpen: boolean;
  onNavigate: (s: Section) => void;
  onToggle: () => void;
}

export function AppSidebar({ active, sidebarOpen, onNavigate, onToggle }: SidebarProps) {
  return (
    <div className="absolute right-0 top-0 h-full z-30 flex flex-row-reverse pointer-events-none">

      {/* Overlay backdrop when expanded */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[-1] pointer-events-auto"
          onClick={onToggle}
          style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
        />
      )}

      {/* The sidebar panel itself */}
      <div className="pointer-events-auto flex flex-row-reverse h-full"
        style={{ filter: "drop-shadow(-4px 0 24px rgba(0,0,0,0.5))" }}>

        {/* ── Collapsed icons strip (always visible, width 56px) ── */}
        <div className="flex flex-col items-center pt-4 pb-4 gap-2 h-full"
          style={{
            width: 56,
            background: "rgba(12,13,22,0.75)",
            backdropFilter: "blur(40px)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.05), -4px 0 20px rgba(0,0,0,0.4)",
          }}>

          {/* Toggle — glowing, prominent */}
          <button
            onClick={onToggle}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0 mb-1"
            style={{
              background: sidebarOpen
                ? "linear-gradient(145deg,rgba(168,85,247,0.4),rgba(168,85,247,0.2))"
                : "linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.06))",
              border: `1.5px solid ${sidebarOpen ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.14)"}`,
              boxShadow: sidebarOpen
                ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(168,85,247,0.5)"
                : "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.35)",
            }}>
            <Icon
              name={sidebarOpen ? "PanelRightClose" : "PanelRightOpen"}
              size={18}
              style={{ color: sidebarOpen ? "#D8B4FE" : "rgba(255,255,255,0.65)" }}
            />
          </button>

          {/* + new chat */}
          <GlassButton onClick={() => onNavigate("chats")} title="Новый чат"
            className="w-10 h-10 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-light text-purple-300 leading-none select-none">+</span>
          </GlassButton>

          {/* Ч */}
          <GlassButton onClick={() => onNavigate("chats")} title="Чаты"
            className="w-10 h-10 rounded-2xl flex items-center justify-center">
            <span className="text-sm font-bold leading-none select-none" style={{ color: "#A855F7", fontFamily: "Golos Text" }}>Ч</span>
          </GlassButton>

          {/* AI Алиса */}
          <GlassButton title="Алиса"
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative">
            <span className="text-base leading-none select-none">🤖</span>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6)", boxShadow: "0 0 5px #06B6D4", border: "1px solid #0A0B12" }} />
          </GlassButton>

          {/* Divider */}
          <div className="w-6 h-px my-1 flex-shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />

          {/* Nav icons */}
          {NAV_ITEMS.map(item => {
            const isA = active === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)} title={item.label}
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0"
                style={{
                  background: isA
                    ? `linear-gradient(145deg,${item.color}40,${item.color}20)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isA ? item.color + "55" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isA
                    ? `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 14px ${item.color}44`
                    : "inset 0 1px 0 rgba(255,255,255,0.07)",
                }}>
                <Icon name={item.icon} size={16} style={{ color: isA ? item.color : "rgba(255,255,255,0.38)" }} />
              </button>
            );
          })}
        </div>

        {/* ── Expanded labels panel (overlay, 168px) ── */}
        <div className="h-full overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            width: sidebarOpen ? 168 : 0,
            background: "rgba(10,11,20,0.72)",
            backdropFilter: "blur(48px)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            boxShadow: sidebarOpen ? "inset 1px 0 0 rgba(255,255,255,0.05)" : "none",
          }}>
          <div className={`flex flex-col h-full w-[168px] transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

            {/* User */}
            <div className="p-4 pb-3 border-b border-white/5">
              <button onClick={() => onNavigate("profile")} className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", boxShadow: "0 0 10px rgba(168,85,247,0.35)" }}>ВЫ</div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs font-semibold truncate">Ваш аккаунт</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ boxShadow: "0 0 4px #10B981" }} />В сети
                  </p>
                </div>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.map(item => {
                const isA = active === item.id;
                return (
                  <button key={item.id} onClick={() => onNavigate(item.id)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all duration-200 group relative"
                    style={{
                      background: isA ? "rgba(255,255,255,0.07)" : "transparent",
                      border: `1px solid ${isA ? "rgba(255,255,255,0.1)" : "transparent"}`,
                      boxShadow: isA ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                    }}>
                    {isA && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" style={{ background: item.color }} />
                    )}
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isA ? item.color + "33" : item.color + "18" }}>
                      <Icon name={item.icon} size={14} style={{ color: item.color }} />
                    </div>
                    <span className={`text-sm font-semibold truncate transition-colors ${isA ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

          </div>
        </div>

      </div>
    </div>
  );
}
