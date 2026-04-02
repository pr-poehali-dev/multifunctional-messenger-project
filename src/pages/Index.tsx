import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, Section } from "@/components/app/data";
import { AppSidebar } from "@/components/app/sidebar";
import {
  ChatsSection,
  CallsSection,
  ServicesSection,
  DatingSection,
  ContactsSection,
  SettingsSection,
  ProfileSection,
} from "@/components/app/sections";

export default function Index() {
  const [active, setActive] = useState<Section>("chats");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeNav = NAV_ITEMS.find(n => n.id === active)!;

  const renderSection = () => {
    switch (active) {
      case "chats":    return <ChatsSection />;
      case "calls":    return <CallsSection />;
      case "dating":   return <DatingSection />;
      case "services": return <ServicesSection />;
      case "contacts": return <ContactsSection />;
      case "profile":  return <ProfileSection />;
      case "settings": return <SettingsSection />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#0A0B12" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-[0.07] animate-pulse-slow" style={{ background: "#7C3AED" }} />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-[0.05] animate-pulse-slow" style={{ background: "#06B6D4", animationDelay: "1.5s" }} />
      </div>

      {/* ── Main (full width, sidebar overlays on top) ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0"
          style={{ background: "rgba(10,11,18,0.8)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: activeNav.color + "22" }}>
              <Icon name={activeNav.icon} size={16} style={{ color: activeNav.color }} />
            </div>
            <h1 className="font-bold text-base" style={{ fontFamily: "Golos Text" }}>{activeNav.label}</h1>
          </div>
          {/* Avatar → Profile */}
          <button onClick={() => setActive("profile")}
            className="flex items-center gap-2 px-2 py-1 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", boxShadow: "0 0 8px rgba(168,85,247,0.4)" }}>ВЫ</div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-none mb-0.5">Ваш аккаунт</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ boxShadow: "0 0 4px #10B981" }} />В сети
              </p>
            </div>
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          {renderSection()}
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-white/5 flex-shrink-0"
          style={{ background: "rgba(10,11,18,0.9)", backdropFilter: "blur(20px)" }}>
          {NAV_ITEMS.map(item => {
            const isA = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${isA ? "opacity-100" : "opacity-35"}`}>
                <Icon name={item.icon} size={14} style={{ color: isA ? item.color : undefined }} />
                <span className="text-[8px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Right sidebar (overlay) ── */}
      <AppSidebar
        active={active}
        sidebarOpen={sidebarOpen}
        onNavigate={setActive}
        onToggle={() => setSidebarOpen(v => !v)}
      />
    </div>
  );
}
