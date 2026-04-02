import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section =
  | "chats"
  | "calls"
  | "statuses"
  | "video"
  | "dating"
  | "services"
  | "contacts"
  | "profile";

const NAV_ITEMS: { id: Section; label: string; icon: string; color: string }[] = [
  { id: "chats", label: "Чаты", icon: "MessageCircle", color: "#A855F7" },
  { id: "calls", label: "Звонки", icon: "Phone", color: "#06B6D4" },
  { id: "statuses", label: "Статусы", icon: "Zap", color: "#F97316" },
  { id: "video", label: "Видео", icon: "Play", color: "#EC4899" },
  { id: "dating", label: "Знакомства", icon: "Heart", color: "#F43F5E" },
  { id: "services", label: "Услуги", icon: "Briefcase", color: "#10B981" },
  { id: "contacts", label: "Контакты", icon: "Users", color: "#3B82F6" },
  { id: "profile", label: "Профиль", icon: "User", color: "#D946EF" },
];

const mockChats = [
  { id: 1, name: "Алексей Громов", msg: "Отправлю файлы сегодня вечером 👍", time: "14:32", unread: 3, online: true, avatar: "АГ", color: "#7C3AED" },
  { id: 2, name: "Маркетинг команда", msg: "Юля: обновила презентацию!", time: "13:15", unread: 12, online: false, avatar: "МК", color: "#06B6D4", group: true },
  { id: 3, name: "Соня Белова", msg: "Увидимся завтра?", time: "11:48", unread: 0, online: true, avatar: "СБ", color: "#EC4899" },
  { id: 4, name: "Dev team", msg: "Деплой прошёл успешно 🚀", time: "10:22", unread: 5, online: false, avatar: "DT", color: "#10B981", group: true },
  { id: 5, name: "Михаил Орлов", msg: "Спасибо за помощь!", time: "Вчера", unread: 0, online: false, avatar: "МО", color: "#F97316" },
  { id: 6, name: "Анна Козлова", msg: "Когда будет готово?", time: "Вчера", unread: 1, online: true, avatar: "АК", color: "#3B82F6" },
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
  { id: 5, name: "Dev team", type: "video", direction: "outgoing", time: "2 дня назад", duration: "47 мин", avatar: "DT", color: "#10B981" },
];

const mockStatuses = [
  { id: 1, name: "Соня Белова", avatar: "СБ", color: "#EC4899", viewed: false, time: "5 мин назад", emoji: "☀️" },
  { id: 2, name: "Алексей Громов", avatar: "АГ", color: "#7C3AED", viewed: false, time: "12 мин назад", emoji: "🚀" },
  { id: 3, name: "Анна Козлова", avatar: "АК", color: "#3B82F6", viewed: true, time: "1 час назад", emoji: "🎨" },
  { id: 4, name: "Михаил Орлов", avatar: "МО", color: "#F97316", viewed: true, time: "2 часа назад", emoji: "💪" },
  { id: 5, name: "Дмитрий Фёдоров", avatar: "ДФ", color: "#10B981", viewed: true, time: "3 часа назад", emoji: "🎵" },
];

const mockVideos = [
  { id: 1, author: "Соня Белова", avatar: "СБ", color: "#EC4899", title: "Мой новый арт-проект 🎨", likes: "2.4K", comments: "187", bg: "from-pink-900 to-purple-900", emoji: "🎨" },
  { id: 2, author: "Алексей Громов", avatar: "АГ", color: "#7C3AED", title: "Тренировка утром 💪", likes: "1.1K", comments: "94", bg: "from-violet-900 to-blue-900", emoji: "💪" },
  { id: 3, author: "Анна Козлова", avatar: "АК", color: "#3B82F6", title: "Путешествие в горы ⛰️", likes: "5.7K", comments: "312", bg: "from-blue-900 to-cyan-900", emoji: "⛰️" },
];

const mockDating = [
  { id: 1, name: "Виктория, 26", city: "Москва", about: "Люблю путешествия, кофе и котов 🐱", tags: ["Путешествия", "Фото", "Музыка"], avatar: "В", color: "#EC4899", match: 94 },
  { id: 2, name: "Кирилл, 29", city: "СПб", about: "Разработчик, играю в группе 🎸", tags: ["Музыка", "IT", "Спорт"], avatar: "К", color: "#7C3AED", match: 87 },
  { id: 3, name: "Дарья, 24", city: "Казань", about: "Дизайнер интерьеров, веган 🌿", tags: ["Дизайн", "Еда", "Йога"], avatar: "Д", color: "#10B981", match: 79 },
];

const mockServices = [
  { id: 1, title: "Дизайн логотипа", author: "Анна К.", price: "от 3 000 ₽", category: "Дизайн", avatar: "АК", color: "#EC4899", rating: 4.9, reviews: 127, emoji: "🎨" },
  { id: 2, title: "Разработка сайта", author: "Дмитрий Ф.", price: "от 15 000 ₽", category: "IT", avatar: "ДФ", color: "#7C3AED", rating: 5.0, reviews: 89, emoji: "💻" },
  { id: 3, title: "Фотосессия в студии", author: "Соня Б.", price: "от 8 000 ₽", category: "Фото", avatar: "СБ", color: "#3B82F6", rating: 4.8, reviews: 203, emoji: "📸" },
  { id: 4, title: "Копирайтинг", author: "Маша Л.", price: "от 1 500 ₽", category: "Текст", avatar: "МЛ", color: "#F97316", rating: 4.7, reviews: 56, emoji: "✍️" },
  { id: 5, title: "SEO продвижение", author: "Игорь С.", price: "от 20 000 ₽", category: "Маркетинг", avatar: "ИС", color: "#10B981", rating: 4.6, reviews: 34, emoji: "📈" },
  { id: 6, title: "Видеомонтаж", author: "Коля В.", price: "от 5 000 ₽", category: "Видео", avatar: "КВ", color: "#D946EF", rating: 4.9, reviews: 71, emoji: "🎬" },
];

function Avatar({ text, color, size = 40, online }: { text: string; color: string; size?: number; online?: boolean }) {
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

function GradientButton({ children, className = "", onClick, small }: { children: React.ReactNode; className?: string; onClick?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`grad-primary text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 ${small ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"} ${className}`}
    >
      {children}
    </button>
  );
}

function ChatsSection() {
  const [search, setSearch] = useState("");
  const filtered = mockChats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold text-grad-primary mb-3" style={{ fontFamily: "Golos Text" }}>Чаты</h2>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск чатов..."
            className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-purple-500 border border-transparent transition-colors"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {filtered.map((chat) => (
          <div key={chat.id} className="flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01]">
            <Avatar text={chat.avatar} color={chat.color} size={48} online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  {chat.name}
                  {(chat as typeof mockChats[0] & { group?: boolean }).group && <Icon name="Users" size={12} className="text-muted-foreground" />}
                </span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate pr-2">{chat.msg}</p>
                {chat.unread > 0 && (
                  <span className="grad-primary text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 pt-2">
        <GradientButton className="w-full">
          <span className="flex items-center justify-center gap-2">
            <Icon name="Plus" size={18} />
            Новый чат
          </span>
        </GradientButton>
      </div>
    </div>
  );
}

function CallsSection() {
  const dirIcon = (d: string) => {
    if (d === "incoming") return <Icon name="PhoneIncoming" size={14} className="text-emerald-400" />;
    if (d === "outgoing") return <Icon name="PhoneOutgoing" size={14} className="text-cyan-400" />;
    return <Icon name="PhoneMissed" size={14} className="text-rose-400" />;
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#06B6D4,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Звонки</h2>
        <p className="text-sm text-muted-foreground mb-3">Голосовые и видеозвонки</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="glass rounded-xl p-3 flex items-center gap-2 hover:border-cyan-500/50 border border-transparent transition-all hover:scale-105">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Icon name="Phone" size={16} className="text-cyan-400" />
            </div>
            <span className="text-sm font-medium">Аудио</span>
          </button>
          <button className="glass rounded-xl p-3 flex items-center gap-2 hover:border-violet-500/50 border border-transparent transition-all hover:scale-105">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Icon name="Video" size={16} className="text-violet-400" />
            </div>
            <span className="text-sm font-medium">Видео</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 mt-2">
        {mockCalls.map((call) => (
          <div key={call.id} className="flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01]">
            <Avatar text={call.avatar} color={call.color} size={44} />
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
            <button className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/40 transition-colors">
              <Icon name={call.type === "video" ? "Video" : "Phone"} size={16} className="text-emerald-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusesSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-3">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Статусы</h2>
        <p className="text-sm text-muted-foreground mb-3">Исчезают через 24 часа</p>
        <button className="w-full glass rounded-xl p-4 flex items-center gap-3 border-2 border-dashed border-orange-500/30 hover:border-orange-500/60 transition-all hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }}>
            <Icon name="Plus" size={22} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Добавить статус</p>
            <p className="text-xs text-muted-foreground">Фото, видео или текст</p>
          </div>
        </button>
      </div>
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Непросмотренные</p>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {mockStatuses.map((s) => (
          <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01] ${s.viewed ? "opacity-60" : ""}`}>
            <div className="relative">
              <div className={`absolute inset-[-3px] rounded-full ${s.viewed ? "" : ""}`}
                style={s.viewed ? { border: "2px solid #333" } : { background: "linear-gradient(135deg,#F59E0B,#EF4444)", padding: 2, borderRadius: "50%" }}
              />
              <Avatar text={s.avatar} color={s.color} size={46} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.time}</p>
            </div>
            <span className="text-2xl">{s.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-3">
        <h2 className="text-2xl font-bold text-grad-primary mb-1" style={{ fontFamily: "Golos Text" }}>Видео</h2>
        <p className="text-sm text-muted-foreground">Короткие видео от сообщества</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3">
        {mockVideos.map((v) => (
          <div key={v.id} className="rounded-2xl overflow-hidden hover:scale-[1.01] transition-all cursor-pointer">
            <div className={`bg-gradient-to-br ${v.bg} h-52 flex items-center justify-center relative`}>
              <span className="text-7xl animate-float">{v.emoji}</span>
              <div className="absolute inset-0 bg-black/30" />
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform" style={{ boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}>
                  <Icon name="Play" size={24} className="text-white ml-1" />
                </div>
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Avatar text={v.avatar} color={v.color} size={32} />
                  <span className="text-white text-sm font-semibold drop-shadow-lg">{v.author}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <span className="flex items-center gap-1"><Icon name="Heart" size={14} />{v.likes}</span>
                  <span className="flex items-center gap-1"><Icon name="MessageCircle" size={14} />{v.comments}</span>
                </div>
              </div>
            </div>
            <div className="glass p-3">
              <p className="text-sm font-medium">{v.title}</p>
            </div>
          </div>
        ))}
        <button className="w-full glass rounded-xl p-4 border-2 border-dashed border-pink-500/30 hover:border-pink-500/60 transition-all flex items-center justify-center gap-2 text-pink-400 hover:scale-[1.01]">
          <Icon name="Upload" size={18} />
          <span className="font-semibold">Загрузить видео</span>
        </button>
      </div>
    </div>
  );
}

function DatingSection() {
  const [idx, setIdx] = useState(0);
  const card = mockDating[idx % mockDating.length];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#F43F5E,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Знакомства</h2>
        <p className="text-sm text-muted-foreground">Ваш профиль уже готов!</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        <div className="w-full max-w-sm rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 30px ${card.color}33` }}>
          <div className="h-52 flex items-center justify-center relative" style={{ background: `radial-gradient(circle at 50% 50%, ${card.color}44, ${card.color}11)` }}>
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl" style={{ background: card.color }}>
              {card.avatar}
            </div>
            <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-sm font-bold text-white flex items-center gap-1">
              <Icon name="Sparkles" size={13} className="text-yellow-400" />
              {card.match}%
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
                <span key={t} className="glass px-3 py-1 rounded-full text-xs font-medium" style={{ color: card.color }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIdx(i => i + 1)} className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-all border border-rose-500/40">
            <Icon name="X" size={22} className="text-rose-400" />
          </button>
          <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-all border border-yellow-500/40">
            <Icon name="Star" size={22} className="text-yellow-400" />
          </button>
          <button onClick={() => setIdx(i => i + 1)} className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all" style={{ background: "linear-gradient(135deg,#F43F5E,#EC4899)", boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}>
            <Icon name="Heart" size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const categories = ["Все", "Дизайн", "IT", "Фото", "Текст", "Маркетинг", "Видео"];
  const [cat, setCat] = useState("Все");
  const filtered = cat === "Все" ? mockServices : mockServices.filter(s => s.category === cat);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#10B981,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Услуги</h2>
        <p className="text-sm text-muted-foreground mb-3">Найдите специалиста прямо здесь</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${cat === c ? "text-white" : "glass text-muted-foreground hover:text-foreground"}`}
              style={cat === c ? { background: "linear-gradient(135deg,#10B981,#06B6D4)" } : {}}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2 mt-2">
        {filtered.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 hover:glass-strong cursor-pointer transition-all hover:scale-[1.01] flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: s.color + "22" }}>
              {s.emoji}
            </div>
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
      <div className="p-4 pt-2">
        <GradientButton className="w-full">
          <span className="flex items-center justify-center gap-2">
            <Icon name="Plus" size={18} />
            Разместить услугу
          </span>
        </GradientButton>
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 pb-2">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Golos Text", background: "linear-gradient(135deg,#3B82F6,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Контакты</h2>
        <p className="text-sm text-muted-foreground mb-3">{mockContacts.length} контактов</p>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Поиск контактов..." className="w-full glass rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-blue-500 transition-colors" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        <div className="px-2 py-1"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">В сети</span></div>
        {mockContacts.filter(c => c.online).map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01]">
            <Avatar text={c.avatar} color={c.color} size={44} online={c.online} />
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-emerald-400">{c.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center hover:bg-violet-500/40 transition-colors">
                <Icon name="MessageCircle" size={14} className="text-violet-400" />
              </button>
              <button className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center hover:bg-cyan-500/40 transition-colors">
                <Icon name="Phone" size={14} className="text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
        <div className="px-2 py-1 mt-2"><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Недавно в сети</span></div>
        {mockContacts.filter(c => !c.online).map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01] opacity-60">
            <Avatar text={c.avatar} color={c.color} size={44} />
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

function ProfileSection() {
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
        <h2 className="text-2xl font-bold text-grad-primary mb-4" style={{ fontFamily: "Golos Text" }}>Профиль</h2>
        <div className="glass-strong rounded-2xl p-5 flex flex-col items-center text-center mb-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, #A855F7, transparent 70%)" }} />
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899,#F97316)", boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}>
              ВЫ
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0A0B12]" style={{ background: "#10B981" }}>
              <Icon name="Check" size={11} className="text-white" />
            </div>
          </div>
          <h3 className="text-lg font-bold">Ваш аккаунт</h3>
          <p className="text-sm text-muted-foreground">@username</p>
          <div className="flex gap-6 mt-3 pt-3 border-t border-border w-full justify-center">
            {[["248", "Контактов"], ["12", "Групп"], ["5", "Услуг"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-bold text-lg">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
          <Icon name="Shield" size={14} className="text-emerald-400 flex-shrink-0" />
          <span className="text-xs text-emerald-400 font-medium">Сквозное шифрование активно для всех чатов</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {settings.map((s) => (
          <div key={s.icon} className="flex items-center gap-3 p-3 rounded-xl hover:glass cursor-pointer transition-all hover:scale-[1.01]">
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

export default function Index() {
  const [active, setActive] = useState<Section>("chats");
  const activeNav = NAV_ITEMS.find(n => n.id === active)!;

  const renderSection = () => {
    switch (active) {
      case "chats": return <ChatsSection />;
      case "calls": return <CallsSection />;
      case "statuses": return <StatusesSection />;
      case "video": return <VideoSection />;
      case "dating": return <DatingSection />;
      case "services": return <ServicesSection />;
      case "contacts": return <ContactsSection />;
      case "profile": return <ProfileSection />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#0A0B12" }}>
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{ background: "#7C3AED" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-8 animate-pulse-slow" style={{ background: "#06B6D4", animationDelay: "1.5s" }} />
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 flex-shrink-0 h-full border-r border-white/5 relative z-10">
        <div className="p-4 lg:p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", boxShadow: "0 0 16px rgba(168,85,247,0.4)" }}>
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <span className="hidden lg:block text-xl font-black text-grad-primary" style={{ fontFamily: "Golos Text" }}>Вспышка</span>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive ? "glass-strong" : "hover:glass"}`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: item.color }} />}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all" style={{ background: isActive ? item.color + "33" : item.color + "15" }}>
                  <Icon name={item.icon} size={18} style={{ color: item.color }} />
                </div>
                <span className={`hidden lg:block text-sm font-semibold transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>ВЫ</div>
            <div className="hidden lg:block min-w-0">
              <p className="text-xs font-semibold truncate">Ваш аккаунт</p>
              <p className="text-xs text-emerald-400">В сети</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 glass flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: activeNav.color + "22" }}>
              <Icon name={activeNav.icon} size={16} style={{ color: activeNav.color }} />
            </div>
            <h1 className="font-bold text-base" style={{ fontFamily: "Golos Text" }}>{activeNav.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:glass-strong transition-all">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:glass-strong transition-all">
              <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {renderSection()}
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex border-t border-white/5 glass flex-shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${isActive ? "opacity-100" : "opacity-40"}`}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ background: isActive ? item.color + "33" : "transparent" }}>
                  <Icon name={item.icon} size={16} style={{ color: isActive ? item.color : undefined }} />
                </div>
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}