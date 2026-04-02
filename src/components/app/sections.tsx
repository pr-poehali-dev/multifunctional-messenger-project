import { useState } from "react";
import Icon from "@/components/ui/icon";
import { GlassButton, Ava } from "@/components/ui/glass-button";
import {
  mockChats, mockStoriesChats, mockContacts, mockCalls,
  mockServices, mockDating, mockProfilePhotos, mockProfileActual,
} from "@/components/app/data";

// ── Chats ─────────────────────────────────────────────────────
export function ChatsSection() {
  const [enabled, setEnabled] = useState({ personal: true, groups: true, blogs: true, video: true });
  const [search, setSearch] = useState("");

  const toggle = (key: keyof typeof enabled) => setEnabled(p => ({ ...p, [key]: !p[key] }));

  const filtered = mockChats.filter(c => {
    const q = c.name.toLowerCase().includes(search.toLowerCase());
    if (!q) return false;
    if (!c.group && !c.blog && !c.video) return enabled.personal;
    if (c.group) return enabled.groups;
    if (c.blog)  return enabled.blogs;
    if (c.video) return enabled.video;
    return true;
  });

  const pills: { key: keyof typeof enabled; label: string; color: string }[] = [
    { key: "personal", label: "Личные", color: "#A855F7" },
    { key: "groups",   label: "Группы", color: "#06B6D4" },
    { key: "blogs",    label: "Блоги",  color: "#8B5CF6" },
    { key: "video",    label: "Видео",  color: "#EC4899" },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Stories */}
      <div className="px-3 pt-3 pb-1">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-dashed border-purple-500/50 hover:border-purple-400 transition-colors"
              style={{ background: "rgba(168,85,247,0.08)" }}>
              <Icon name="Plus" size={20} className="text-purple-400" />
            </div>
            <span className="text-[10px] text-muted-foreground">Моя</span>
          </div>
          {mockStoriesChats.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className="p-[2px] rounded-full"
                style={s.viewed
                  ? { border: "2px solid rgba(255,255,255,0.15)", borderRadius: "50%" }
                  : { background: "linear-gradient(135deg,#F59E0B,#EC4899,#A855F7)", padding: "2px" }}>
                <div className="bg-[#0A0B12] p-[2px] rounded-full">
                  <Ava text={s.avatar} color={s.color} size={46} />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground max-w-[52px] truncate text-center">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {pills.map(p => (
          <button key={p.key} onClick={() => toggle(p.key)}
            className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: enabled[p.key] ? `linear-gradient(145deg,${p.color}33,${p.color}18)` : "rgba(255,255,255,0.04)",
              border: `1px solid ${enabled[p.key] ? p.color + "55" : "rgba(255,255,255,0.08)"}`,
              boxShadow: enabled[p.key] ? `inset 0 1px 0 rgba(255,255,255,0.15),0 0 12px ${p.color}33` : "inset 0 1px 0 rgba(255,255,255,0.06)",
              color: enabled[p.key] ? p.color : "rgba(255,255,255,0.35)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
              style={{ background: enabled[p.key] ? p.color : "rgba(255,255,255,0.2)", boxShadow: enabled[p.key] ? `0 0 6px ${p.color},0 0 12px ${p.color}88` : "none" }} />
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
            <Icon name="MessageCircleOff" size={28} /><span>Нет чатов</span>
          </div>
        )}
        {filtered.map(chat => (
          <div key={chat.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}>
            {/* Avatar + unread badge */}
            <div className="relative flex-shrink-0">
              <Ava text={chat.avatar} color={chat.color} size={48} online={chat.online} />
              {chat.unread > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", boxShadow: "0 0 8px rgba(168,85,247,0.6)" }}>
                  {chat.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  {chat.name}
                  {chat.group && <Icon name="Users"    size={11} className="text-muted-foreground" />}
                  {chat.blog  && <Icon name="BookOpen" size={11} className="text-purple-400" />}
                  {chat.video && <Icon name="Play"     size={11} className="text-pink-400" />}
                </span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{chat.msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search — bottom */}
      <div className="px-3 pb-3 pt-1">
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск чатов..."
            className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-white/8 focus:border-purple-500/40 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }} />
        </div>
      </div>
    </div>
  );
}

// ── Calls ─────────────────────────────────────────────────────
export function CallsSection() {
  const dirIcon = (d: string) =>
    d === "incoming" ? <Icon name="PhoneIncoming" size={14} className="text-emerald-400" />
    : d === "outgoing" ? <Icon name="PhoneOutgoing" size={14} className="text-cyan-400" />
    : <Icon name="PhoneMissed" size={14} className="text-rose-400" />;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#06B6D4,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Звонки
        </h2>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[{ icon: "Phone", label: "Аудио", color: "#06B6D4" }, { icon: "Video", label: "Видео", color: "#8B5CF6" }].map(b => (
            <GlassButton key={b.label} className="rounded-xl p-3 flex items-center gap-2 w-full">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: b.color + "22" }}>
                <Icon name={b.icon} size={16} style={{ color: b.color }} />
              </div>
              <span className="text-sm font-medium">{b.label}</span>
            </GlassButton>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {mockCalls.map(call => (
          <div key={call.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <Ava text={call.avatar} color={call.color} size={44} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                {dirIcon(call.direction)}
                <span className="font-semibold text-sm">{call.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name={call.type === "video" ? "Video" : "Phone"} size={11} />
                <span>{call.time}</span>
                {call.duration !== "—" && <span>· {call.duration}</span>}
              </div>
            </div>
            <GlassButton className="w-9 h-9 rounded-full flex items-center justify-center">
              <Icon name={call.type === "video" ? "Video" : "Phone"} size={16} className="text-emerald-400" />
            </GlassButton>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────
export function ServicesSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#10B981,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Услуги
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {mockServices.map(s => (
          <div key={s.id}
            className="rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: s.color + "22" }}>{s.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.author}</p>
                </div>
                <span className="font-bold text-sm flex-shrink-0" style={{ color: s.color }}>{s.price}</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Icon name="Star" size={12} className="text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400">{s.rating}</span>
                <span className="text-xs text-muted-foreground">({s.reviews} отзывов)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dating ────────────────────────────────────────────────────
export function DatingSection() {
  const [idx, setIdx] = useState(0);
  const card = mockDating[idx % mockDating.length];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1"
          style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#F43F5E,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Знакомства
        </h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        <div className="w-full max-w-sm rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 30px ${card.color}33` }}>
          <div className="h-52 flex items-center justify-center relative"
            style={{ background: `radial-gradient(circle at 50% 50%,${card.color}44,${card.color}11)` }}>
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white" style={{ background: card.color }}>{card.avatar}</div>
            <div className="absolute top-3 right-3 px-3 py-1 text-sm font-bold text-white flex items-center gap-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <Icon name="Sparkles" size={13} className="text-yellow-400" />{card.match}%
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">{card.name}</h3>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><Icon name="MapPin" size={13} />{card.city}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{card.about}</p>
            <div className="flex flex-wrap gap-2">
              {card.tags.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: card.color + "22", color: card.color }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <GlassButton onClick={() => setIdx(i => i + 1)} className="w-14 h-14 rounded-full flex items-center justify-center">
            <Icon name="X" size={22} className="text-rose-400" />
          </GlassButton>
          <GlassButton className="w-14 h-14 rounded-full flex items-center justify-center">
            <Icon name="Star" size={22} className="text-yellow-400" />
          </GlassButton>
          <button onClick={() => setIdx(i => i + 1)}
            className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#F43F5E,#EC4899)", boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}>
            <Icon name="Heart" size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Contacts ──────────────────────────────────────────────────
export function ContactsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#3B82F6,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Контакты
        </h2>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Поиск контактов..."
            className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        <div className="px-2 py-1"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">В сети</span></div>
        {mockContacts.filter(c => c.online).map(c => (
          <div key={c.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <Ava text={c.avatar} color={c.color} size={44} online />
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-emerald-400">{c.status}</p>
            </div>
            <div className="flex gap-2">
              <GlassButton className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" size={14} className="text-violet-400" />
              </GlassButton>
              <GlassButton className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon name="Phone" size={14} className="text-cyan-400" />
              </GlassButton>
            </div>
          </div>
        ))}
        <div className="px-2 py-1 mt-2"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Недавно</span></div>
        {mockContacts.filter(c => !c.online).map(c => (
          <div key={c.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer opacity-50 transition-all hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <Ava text={c.avatar} color={c.color} size={44} />
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────
export function SettingsSection() {
  const items = [
    { icon: "Shield",     label: "Конфиденциальность", desc: "Сквозное шифрование",   color: "#10B981" },
    { icon: "Bell",       label: "Уведомления",        desc: "Звуки и вибрация",       color: "#F97316" },
    { icon: "Palette",    label: "Оформление",         desc: "Тема, цвета, шрифты",    color: "#8B5CF6" },
    { icon: "Lock",       label: "Безопасность",       desc: "Пароль, биометрия",      color: "#EC4899" },
    { icon: "HardDrive",  label: "Данные и хранилище", desc: "Медиа и кэш",            color: "#3B82F6" },
    { icon: "HelpCircle", label: "Помощь и поддержка", desc: "FAQ и связь с командой", color: "#06B6D4" },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-3">
        <h2 className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#64748B,#94A3B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Настройки
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {items.map(s => (
          <div key={s.icon}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "22" }}>
              <Icon name={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────
export function ProfileSection() {
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [photoReactions, setPhotoReactions] = useState<Record<number, string[]>>({});

  const addReaction = (id: number, emoji: string) => {
    setPhotoReactions(prev => {
      const ex = prev[id] || [];
      return { ...prev, [id]: ex.includes(emoji) ? ex.filter(e => e !== emoji) : [...ex, emoji] };
    });
  };

  const reactionOptions = ["❤️","🔥","😍","😮","👏","🎉"];

  return (
    <div className="flex flex-col h-full overflow-y-auto animate-fade-in">
      <div className="p-4 pb-0">
        <div className="rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden mb-3"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%,#A855F7,transparent 70%)" }} />
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899,#F97316)", boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}>ВЫ</div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0A0B12]" style={{ background: "#10B981" }}>
              <Icon name="Check" size={11} className="text-white" />
            </div>
          </div>
          <h3 className="text-lg font-bold">Ваш аккаунт</h3>
          <p className="text-sm text-muted-foreground mb-1">@username · Москва 🌆</p>
          <p className="text-xs text-muted-foreground mb-3">Разработчик и путешественник ✈️</p>
          <div className="flex gap-6 pt-3 border-t border-white/10 w-full justify-center">
            {[["248","Контакты"],["12","Группы"],["5","Услуги"]].map(([n,l]) => (
              <div key={l} className="text-center">
                <p className="font-bold text-base">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {[{ icon: "Edit3", label: "Редактировать" }, { icon: "Share2", label: "Поделиться" }].map(b => (
            <GlassButton key={b.label} className="flex-1 rounded-xl py-2 text-sm font-semibold flex items-center justify-center gap-2">
              <Icon name={b.icon} size={14} />{b.label}
            </GlassButton>
          ))}
        </div>
      </div>

      {/* Актуальное */}
      <div className="px-4 mb-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold uppercase tracking-wider">Актуальное</p>
          <button className="text-xs text-purple-400 flex items-center gap-1"><Icon name="Plus" size={12} />Добавить</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {mockProfileActual.map(a => (
            <div key={a.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${a.bg} flex items-center justify-center text-2xl border-2 border-white/10 hover:scale-105 transition-transform`}>{a.emoji}</div>
              <span className="text-[10px] text-muted-foreground text-center max-w-[60px] truncate">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Сторис */}
      <div className="px-4 mb-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold uppercase tracking-wider">Сторис</p>
          <button className="text-xs text-purple-400 flex items-center gap-1"><Icon name="Plus" size={12} />Добавить</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-purple-500/50 flex items-center justify-center" style={{ background: "rgba(168,85,247,0.08)" }}>
              <Icon name="Plus" size={18} className="text-purple-400" />
            </div>
            <span className="text-[10px] text-muted-foreground">Новая</span>
          </div>
          {["☀️","🚀","🎨","💪","🎵"].map((emoji, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className="p-[2px] rounded-full" style={{ background: "linear-gradient(135deg,#F59E0B,#EC4899,#A855F7)" }}>
                <div className="bg-[#0A0B12] p-[2px] rounded-full">
                  <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)" }}>{emoji}</div>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">{i+1}ч</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider">Фотографии</p>
          <button className="text-xs text-purple-400 flex items-center gap-1"><Icon name="Upload" size={12} />Загрузить</button>
        </div>
        <div className="space-y-4">
          {mockProfilePhotos.map(photo => (
            <div key={photo.id} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className={`bg-gradient-to-br ${photo.bg} h-56 flex items-center justify-center cursor-pointer`}>
                <span className="text-7xl animate-float">{photo.emoji}</span>
              </div>
              <div className="px-4 pt-3 pb-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-1">
                    {reactionOptions.map(emoji => (
                      <button key={emoji} onClick={() => addReaction(photo.id, emoji)}
                        className={`text-lg transition-all hover:scale-125 active:scale-110 ${(photoReactions[photo.id] || photo.reactions)?.includes(emoji) ? "opacity-100" : "opacity-25 hover:opacity-60"}`}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-xs flex items-center gap-1"><Icon name="Heart" size={13} className="text-rose-400" />{photo.likes}</span>
                    <button onClick={() => setOpenComments(openComments === photo.id ? null : photo.id)}
                      className="text-xs flex items-center gap-1 hover:text-foreground transition-colors">
                      <Icon name="MessageCircle" size={13} />{photo.comments.length}
                    </button>
                  </div>
                </div>
                {openComments === photo.id && (
                  <div className="border-t border-white/8 pt-2 space-y-2 animate-fade-in">
                    {photo.comments.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Будьте первым!</p>}
                    {photo.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#7C3AED" }}>{c.user[0]}</div>
                        <div className="rounded-xl px-3 py-1.5 flex-1" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs font-semibold text-purple-300">{c.user}</p>
                          <p className="text-xs">{c.text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input placeholder="Комментарий..."
                        className="flex-1 rounded-xl px-3 py-1.5 text-xs placeholder:text-muted-foreground outline-none"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                      <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
                        <Icon name="Send" size={13} className="text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
