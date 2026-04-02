import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "calls" | "dating" | "services" | "contacts" | "profile" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: string; color: string }[] = [
  { id: "chats", label: "Чаты", icon: "MessageCircle", color: "#A855F7" },
  { id: "calls", label: "Звонки", icon: "Phone", color: "#06B6D4" },
  { id: "dating", label: "Знакомства", icon: "Heart", color: "#F43F5E" },
  { id: "services", label: "Услуги", icon: "Briefcase", color: "#10B981" },
  { id: "contacts", label: "Контакты", icon: "Users", color: "#3B82F6" },
  { id: "profile", label: "Профиль", icon: "User", color: "#D946EF" },
  { id: "settings", label: "Настройки", icon: "Settings", color: "#64748B" },
];

const mockChats = [
  { id: 1, name: "Алексей Громов", msg: "Отправлю файлы сегодня вечером 👍", time: "14:32", unread: 3, online: true, avatar: "АГ", color: "#7C3AED", group: false, blog: false, video: false },
  { id: 2, name: "Маркетинг команда", msg: "Юля: обновила презентацию!", time: "13:15", unread: 12, online: false, avatar: "МК", color: "#06B6D4", group: true, blog: false, video: false },
  { id: 3, name: "Соня Белова", msg: "Увидимся завтра?", time: "11:48", unread: 0, online: true, avatar: "СБ", color: "#EC4899", group: false, blog: false, video: false },
  { id: 4, name: "Dev team", msg: "Деплой прошёл успешно 🚀", time: "10:22", unread: 5, online: false, avatar: "DT", color: "#10B981", group: true, blog: false, video: false },
  { id: 5, name: "Михаил Орлов", msg: "Спасибо за помощь!", time: "Вчера", unread: 0, online: false, avatar: "МО", color: "#F97316", group: false, blog: false, video: false },
  { id: 6, name: "Анна Козлова", msg: "Когда будет готово?", time: "Вчера", unread: 1, online: true, avatar: "АК", color: "#3B82F6", group: false, blog: false, video: false },
  { id: 7, name: "Технологии | Блог", msg: "Новый пост: AI и будущее", time: "Вчера", unread: 0, online: false, avatar: "ТБ", color: "#8B5CF6", group: false, blog: true, video: false },
  { id: 8, name: "Путешествия 🌍", msg: "Видео: Бали 2024", time: "2 дня", unread: 2, online: false, avatar: "ПТ", color: "#0EA5E9", group: false, blog: false, video: true },
];

const mockStoriesChats = [
  { id: 1, name: "Соня", avatar: "СБ", color: "#EC4899", viewed: false },
  { id: 2, name: "Алексей", avatar: "АГ", color: "#7C3AED", viewed: false },
  { id: 3, name: "Анна", avatar: "АК", color: "#3B82F6", viewed: true },
  { id: 4, name: "Михаил", avatar: "МО", color: "#F97316", viewed: true },
  { id: 5, name: "Дмитрий", avatar: "ДФ", color: "#10B981", viewed: true },
];

const mockContacts = [
  { id: 1, name: "Алексей Громов", status: "В сети", avatar: "АГ", color: "#7C3AED", online: true },
  { id: 2, name: "Соня Белова", status: "В сети", avatar: "СБ", color: "#EC4899", online: true },
  { id: 3, name: "Анна Козлова", status: "В сети", avatar: "АК", color: "#3B82F6", online: true },
  { id: 4, name: "Михаил Орлов", status: "Был(а) час назад", avatar: "МО", color: "#F97316", online: false },
  { id: 5, name: "Дмитрий Фёдоров", status: "Был(а) вчера", avatar: "ДФ", color: "#10B981", online: false },
  { id: 6, name: "Элина Захарова", status: "Был(а) 3 дня назад", avatar: "ЭЗ", color: "#D946EF", online: false },
];

const mockCalls = [
  { id: 1, name: "Соня Белова", type: "video", direction: "incoming", time: "Сегодня, 14:10", duration: "12 мин", avatar: "СБ", color: "#EC4899" },
  { id: 2, name: "Алексей Громов", type: "audio", direction: "outgoing", time: "Сегодня, 11:30", duration: "5 мин", avatar: "АГ", color: "#7C3AED" },
  { id: 3, name: "Михаил Орлов", type: "video", direction: "missed", time: "Вчера, 19:45", duration: "—", avatar: "МО", color: "#F97316" },
  { id: 4, name: "Анна Козлова", type: "audio", direction: "incoming", time: "Вчера, 15:20", duration: "23 мин", avatar: "АК", color: "#3B82F6" },
];

const mockServices = [
  { id: 1, title: "Дизайн логотипа", author: "Анна К.", price: "от 3 000 ₽", category: "Дизайн", avatar: "АК", color: "#EC4899", rating: 4.9, reviews: 127, emoji: "🎨" },
  { id: 2, title: "Разработка сайта", author: "Дмитрий Ф.", price: "от 15 000 ₽", category: "IT", avatar: "ДФ", color: "#7C3AED", rating: 5.0, reviews: 89, emoji: "💻" },
  { id: 3, title: "Фотосессия в студии", author: "Соня Б.", price: "от 8 000 ₽", category: "Фото", avatar: "СБ", color: "#3B82F6", rating: 4.8, reviews: 203, emoji: "📸" },
  { id: 4, title: "Копирайтинг", author: "Маша Л.", price: "от 1 500 ₽", category: "Текст", avatar: "МЛ", color: "#F97316", rating: 4.7, reviews: 56, emoji: "✍️" },
];

const mockDating = [
  { id: 1, name: "Виктория, 26", city: "Москва", about: "Люблю путешествия, кофе и котов 🐱", tags: ["Путешествия", "Фото", "Музыка"], avatar: "В", color: "#EC4899", match: 94 },
  { id: 2, name: "Кирилл, 29", city: "СПб", about: "Разработчик, играю в группе 🎸", tags: ["Музыка", "IT", "Спорт"], avatar: "К", color: "#7C3AED", match: 87 },
];

const mockProfilePhotos = [
  { id: 1, emoji: "🌅", bg: "from-orange-800 to-pink-900", likes: 24, comments: [{ user: "Соня", text: "Красиво! 😍" }, { user: "Алексей", text: "Огонь фото 🔥" }], reactions: ["❤️", "🔥", "😍"] },
  { id: 2, emoji: "🏔️", bg: "from-blue-900 to-slate-800", likes: 41, comments: [{ user: "Анна", text: "Где это?" }], reactions: ["😮", "❤️"] },
  { id: 3, emoji: "🎉", bg: "from-purple-900 to-pink-800", likes: 67, comments: [{ user: "Михаил", text: "Праздник!" }], reactions: ["🎉", "❤️", "😍", "🔥"] },
  { id: 4, emoji: "☕", bg: "from-amber-900 to-orange-800", likes: 18, comments: [], reactions: ["☕", "❤️"] },
];

const mockProfileActual = [
  { id: 1, emoji: "✈️", bg: "from-sky-800 to-blue-900", label: "Поездка в Питер" },
  { id: 2, emoji: "📚", bg: "from-amber-800 to-orange-900", label: "Читаю сейчас" },
  { id: 3, emoji: "🍕", bg: "from-red-800 to-rose-900", label: "Любимое место" },
];

// ── glassmorphic iphone-style button ─────────────────────────
const glassBtn = `
  relative overflow-hidden
  backdrop-blur-2xl
  border border-white/10
  transition-all duration-200
  hover:border-white/20
  active:scale-95
`;

// subtle inner-glow shine like iOS
function GlassButton({ children, onClick, className = "", title = "" }: { children: React.ReactNode; onClick?: () => void; className?: string; title?: string }) {
  return (
    <button onClick={onClick} title={title}
      className={`${glassBtn} ${className}`}
      style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.07) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.3)" }}>
      {/* shine overlay */}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }} />
      {children}
    </button>
  );
}

// ── Avatar ────────────────────────────────────────────────────
function Ava({ text, color, size = 40, online }: { text: string; color: string; size?: number; online?: boolean }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div className="flex items-center justify-center rounded-full text-white font-bold"
        style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
        {text}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 rounded-full border-2 border-[#0A0B12]"
          style={{ width: size * 0.28, height: size * 0.28, background: "#10B981" }} />
      )}
    </div>
  );
}

// ── Chats ─────────────────────────────────────────────────────
function ChatsSection() {
  const [enabled, setEnabled] = useState({ personal: true, groups: true, blogs: true, video: true });
  const [search, setSearch] = useState("");

  const toggle = (key: keyof typeof enabled) =>
    setEnabled(p => ({ ...p, [key]: !p[key] }));

  const filtered = mockChats.filter(c => {
    const q = c.name.toLowerCase().includes(search.toLowerCase());
    if (!q) return false;
    if (!c.group && !c.blog && !c.video) return enabled.personal;
    if (c.group) return enabled.groups;
    if (c.blog) return enabled.blogs;
    if (c.video) return enabled.video;
    return true;
  });

  const pills: { key: keyof typeof enabled; label: string; color: string }[] = [
    { key: "personal", label: "Личные", color: "#A855F7" },
    { key: "groups", label: "Группы", color: "#06B6D4" },
    { key: "blogs", label: "Блоги", color: "#8B5CF6" },
    { key: "video", label: "Видео", color: "#EC4899" },
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
              <div className={`p-[2px] rounded-full`}
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
              background: enabled[p.key]
                ? `linear-gradient(145deg, ${p.color}33, ${p.color}18)`
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${enabled[p.key] ? p.color + "55" : "rgba(255,255,255,0.08)"}`,
              boxShadow: enabled[p.key]
                ? `inset 0 1px 0 rgba(255,255,255,0.15), 0 0 12px ${p.color}33`
                : "inset 0 1px 0 rgba(255,255,255,0.06)",
              color: enabled[p.key] ? p.color : "rgba(255,255,255,0.35)",
            }}>
            {/* LED dot */}
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
              style={{
                background: enabled[p.key] ? p.color : "rgba(255,255,255,0.2)",
                boxShadow: enabled[p.key] ? `0 0 6px ${p.color}, 0 0 12px ${p.color}88` : "none",
              }} />
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
            <Icon name="MessageCircleOff" size={28} />
            <span>Нет чатов</span>
          </div>
        )}
        {filtered.map(chat => (
          <div key={chat.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}>
            <Ava text={chat.avatar} color={chat.color} size={48} online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  {chat.name}
                  {chat.group && <Icon name="Users" size={11} className="text-muted-foreground" />}
                  {chat.blog && <Icon name="BookOpen" size={11} className="text-purple-400" />}
                  {chat.video && <Icon name="Play" size={11} className="text-pink-400" />}
                </span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate pr-2">{chat.msg}</p>
                {chat.unread > 0 && (
                  <span className="text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)" }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search bottom */}
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
function CallsSection() {
  const dirIcon = (d: string) => {
    if (d === "incoming") return <Icon name="PhoneIncoming" size={14} className="text-emerald-400" />;
    if (d === "outgoing") return <Icon name="PhoneOutgoing" size={14} className="text-cyan-400" />;
    return <Icon name="PhoneMissed" size={14} className="text-rose-400" />;
  };
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#06B6D4,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Звонки</h2>
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
          <div key={call.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <Ava text={call.avatar} color={call.color} size={44} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">{dirIcon(call.direction)}<span className="font-semibold text-sm">{call.name}</span></div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name={call.type === "video" ? "Video" : "Phone"} size={11} />
                <span>{call.time}</span>{call.duration !== "—" && <span>· {call.duration}</span>}
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

// ── Dating ────────────────────────────────────────────────────
function DatingSection() {
  const [idx, setIdx] = useState(0);
  const card = mockDating[idx % mockDating.length];
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#F43F5E,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Знакомства</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        <div className="w-full max-w-sm rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 30px ${card.color}33` }}>
          <div className="h-52 flex items-center justify-center relative"
            style={{ background: `radial-gradient(circle at 50% 50%, ${card.color}44, ${card.color}11)` }}>
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
              {card.tags.map(t => <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: card.color + "22", color: card.color }}>{t}</span>)}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <GlassButton onClick={() => setIdx(i => i + 1)} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ borderColor: "rgba(244,63,94,0.4)" } as React.CSSProperties}>
            <Icon name="X" size={22} className="text-rose-400" />
          </GlassButton>
          <GlassButton className="w-14 h-14 rounded-full flex items-center justify-center" style={{ borderColor: "rgba(234,179,8,0.4)" } as React.CSSProperties}>
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

// ── Services ──────────────────────────────────────────────────
function ServicesSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#10B981,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Услуги</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {mockServices.map(s => (
          <div key={s.id} className="rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: s.color + "22" }}>{s.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div><p className="font-semibold text-sm">{s.title}</p><p className="text-xs text-muted-foreground mt-0.5">{s.author}</p></div>
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

// ── Contacts ──────────────────────────────────────────────────
function ContactsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#3B82F6,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Контакты</h2>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Поиск контактов..." className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        <div className="px-2 py-1"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">В сети</span></div>
        {mockContacts.filter(c => c.online).map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <Ava text={c.avatar} color={c.color} size={44} online />
            <div className="flex-1"><p className="font-semibold text-sm">{c.name}</p><p className="text-xs text-emerald-400">{c.status}</p></div>
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
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer opacity-50 transition-all hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <Ava text={c.avatar} color={c.color} size={44} />
            <div className="flex-1"><p className="font-semibold text-sm">{c.name}</p><p className="text-xs text-muted-foreground">{c.status}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────
function ProfileSection() {
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [photoReactions, setPhotoReactions] = useState<Record<number, string[]>>({});
  const addReaction = (photoId: number, emoji: string) => {
    setPhotoReactions(prev => {
      const ex = prev[photoId] || [];
      return { ...prev, [photoId]: ex.includes(emoji) ? ex.filter(e => e !== emoji) : [...ex, emoji] };
    });
  };
  const reactionOptions = ["❤️", "🔥", "😍", "😮", "👏", "🎉"];

  return (
    <div className="flex flex-col h-full overflow-y-auto animate-fade-in">
      <div className="p-4 pb-0">
        <div className="rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden mb-3"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, #A855F7, transparent 70%)" }} />
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
            {[["248", "Контакты"], ["12", "Группы"], ["5", "Услуги"]].map(([n, l]) => (
              <div key={l} className="text-center"><p className="font-bold text-base">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>
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
          {["☀️", "🚀", "🎨", "💪", "🎵"].map((emoji, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className="p-[2px] rounded-full" style={{ background: "linear-gradient(135deg,#F59E0B,#EC4899,#A855F7)" }}>
                <div className="bg-[#0A0B12] p-[2px] rounded-full">
                  <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)" }}>{emoji}</div>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">{i + 1}ч</span>
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
                      <input placeholder="Комментарий..." className="flex-1 rounded-xl px-3 py-1.5 text-xs placeholder:text-muted-foreground outline-none"
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

// ── Settings ──────────────────────────────────────────────────
function SettingsSection() {
  const settings = [
    { icon: "Shield", label: "Конфиденциальность", desc: "Сквозное шифрование включено", color: "#10B981" },
    { icon: "Bell", label: "Уведомления", desc: "Настройка звуков и вибрации", color: "#F97316" },
    { icon: "Palette", label: "Оформление", desc: "Тема, цвета, шрифты", color: "#8B5CF6" },
    { icon: "Lock", label: "Безопасность", desc: "Пароль, биометрия", color: "#EC4899" },
    { icon: "HardDrive", label: "Данные и хранилище", desc: "Управление медиа и кэшем", color: "#3B82F6" },
    { icon: "HelpCircle", label: "Помощь и поддержка", desc: "FAQ и связь с командой", color: "#06B6D4" },
  ];
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-3">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#64748B,#94A3B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Настройки</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {settings.map(s => (
          <div key={s.icon} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "22" }}>
              <Icon name={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <div className="flex-1"><p className="text-sm font-semibold">{s.label}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────
export default function Index() {
  const [active, setActive] = useState<Section>("chats");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeNav = NAV_ITEMS.find(n => n.id === active)!;

  const renderSection = () => {
    switch (active) {
      case "chats": return <ChatsSection />;
      case "calls": return <CallsSection />;
      case "dating": return <DatingSection />;
      case "services": return <ServicesSection />;
      case "contacts": return <ContactsSection />;
      case "profile": return <ProfileSection />;
      case "settings": return <SettingsSection />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#0A0B12" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-8 animate-pulse-slow" style={{ background: "#7C3AED" }} />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-[0.05] animate-pulse-slow" style={{ background: "#06B6D4", animationDelay: "1.5s" }} />
      </div>

      {/* ── Main content (LEFT) ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 min-w-0">
        {/* Header — no toggle button here */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0"
          style={{ background: "rgba(10,11,18,0.7)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: activeNav.color + "22" }}>
              <Icon name={activeNav.icon} size={16} style={{ color: activeNav.color }} />
            </div>
            <h1 className="font-bold text-base" style={{ fontFamily: "Golos Text" }}>{activeNav.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <GlassButton className="w-9 h-9 rounded-xl flex items-center justify-center">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </GlassButton>
            <GlassButton className="w-9 h-9 rounded-xl flex items-center justify-center">
              <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
            </GlassButton>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {renderSection()}
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-white/5 flex-shrink-0"
          style={{ background: "rgba(10,11,18,0.8)", backdropFilter: "blur(20px)" }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${isActive ? "opacity-100" : "opacity-35"}`}>
                <Icon name={item.icon} size={14} style={{ color: isActive ? item.color : undefined }} />
                <span className="text-[8px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside className="relative z-20 flex flex-row-reverse h-full flex-shrink-0">
        {/* Collapsed strip — always visible */}
        <div className="flex flex-col items-center pt-4 pb-4 gap-3 h-full flex-shrink-0"
          style={{
            width: 56,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(32px)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.05)",
          }}>

          {/* Toggle — prominent, glowing */}
          <button onClick={() => setSidebarOpen(v => !v)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0"
            style={{
              background: sidebarOpen
                ? "linear-gradient(145deg,rgba(168,85,247,0.35),rgba(168,85,247,0.15))"
                : "linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))",
              border: `1px solid ${sidebarOpen ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.12)"}`,
              boxShadow: sidebarOpen
                ? "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 16px rgba(168,85,247,0.4)"
                : "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 12px rgba(0,0,0,0.3)",
            }}>
            <Icon name={sidebarOpen ? "PanelRightClose" : "PanelRightOpen"} size={18}
              style={{ color: sidebarOpen ? "#C084FC" : "rgba(255,255,255,0.6)" }} />
          </button>

          {/* + New chat */}
          <GlassButton onClick={() => setActive("chats")} title="Новый чат"
            className="w-10 h-10 rounded-2xl flex items-center justify-center">
            <span className="text-lg font-light text-purple-300 leading-none">+</span>
          </GlassButton>

          {/* Ч — Chats */}
          <GlassButton onClick={() => setActive("chats")} title="Чаты"
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ fontFamily: "Golos Text" } as React.CSSProperties}>
            <span className="text-sm font-bold" style={{ color: "#A855F7" }}>Ч</span>
          </GlassButton>

          {/* Alice AI */}
          <GlassButton title="Алиса"
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative overflow-visible">
            <span className="text-base leading-none">🤖</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0A0B12]"
              style={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6)", boxShadow: "0 0 6px #06B6D4" }} />
          </GlassButton>

          {/* Divider */}
          <div className="w-6 h-px my-1 flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }} />

          {/* Nav icons */}
          <div className="flex flex-col gap-2 flex-1">
            {NAV_ITEMS.map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => setActive(item.id)} title={item.label}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0"
                  style={{
                    background: isActive
                      ? `linear-gradient(145deg, ${item.color}33, ${item.color}18)`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? item.color + "44" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive
                      ? `inset 0 1px 0 rgba(255,255,255,0.18), 0 0 12px ${item.color}33`
                      : "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}>
                  <Icon name={item.icon} size={16} style={{ color: isActive ? item.color : "rgba(255,255,255,0.4)" }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Expanded panel */}
        <div className={`h-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? "w-56" : "w-0"}`}
          style={{
            background: "rgba(12,13,22,0.65)",
            backdropFilter: "blur(40px)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.04)",
          }}>
          <div className={`flex flex-col h-full w-56 transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

            {/* User at top */}
            <div className="p-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", boxShadow: "0 0 10px rgba(168,85,247,0.35)" }}>ВЫ</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate">Ваш аккаунт</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ boxShadow: "0 0 5px #10B981" }} />
                    В сети
                  </p>
                </div>
              </div>
            </div>

            {/* Nav labels */}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.map(item => {
                const isActive = active === item.id;
                return (
                  <button key={item.id} onClick={() => setActive(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
                    style={{
                      background: isActive ? `rgba(255,255,255,0.06)` : "transparent",
                      border: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "transparent"}`,
                      boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                    }}>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full" style={{ background: item.color }} />}
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? item.color + "33" : item.color + "15" }}>
                      <Icon name={item.icon} size={14} style={{ color: item.color }} />
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}
