export type Section = "chats" | "calls" | "dating" | "services" | "contacts" | "profile" | "settings";

// Порядок: Чаты → Услуги → Знакомства → Звонки → Контакты → Настройки (Профиль убран — через аватарку)
export const NAV_ITEMS: { id: Section; label: string; icon: string; color: string }[] = [
  { id: "chats",    label: "Чаты",       icon: "MessageCircle", color: "#A855F7" },
  { id: "services", label: "Услуги",     icon: "Briefcase",     color: "#10B981" },
  { id: "dating",   label: "Знакомства", icon: "Heart",         color: "#F43F5E" },
  { id: "calls",    label: "Звонки",     icon: "Phone",         color: "#06B6D4" },
  { id: "contacts", label: "Контакты",   icon: "Users",         color: "#3B82F6" },
  { id: "settings", label: "Настройки",  icon: "Settings",      color: "#64748B" },
];

export const mockChats = [
  { id: 1, name: "Алексей Громов",    msg: "Отправлю файлы сегодня вечером 👍", time: "14:32", unread: 3,  online: true,  avatar: "АГ", color: "#7C3AED", group: false, blog: false, video: false },
  { id: 2, name: "Маркетинг команда", msg: "Юля: обновила презентацию!",        time: "13:15", unread: 12, online: false, avatar: "МК", color: "#06B6D4", group: true,  blog: false, video: false },
  { id: 3, name: "Соня Белова",       msg: "Увидимся завтра?",                  time: "11:48", unread: 0,  online: true,  avatar: "СБ", color: "#EC4899", group: false, blog: false, video: false },
  { id: 4, name: "Dev team",          msg: "Деплой прошёл успешно 🚀",          time: "10:22", unread: 5,  online: false, avatar: "DT", color: "#10B981", group: true,  blog: false, video: false },
  { id: 5, name: "Михаил Орлов",      msg: "Спасибо за помощь!",                time: "Вчера", unread: 0,  online: false, avatar: "МО", color: "#F97316", group: false, blog: false, video: false },
  { id: 6, name: "Анна Козлова",      msg: "Когда будет готово?",               time: "Вчера", unread: 1,  online: true,  avatar: "АК", color: "#3B82F6", group: false, blog: false, video: false },
  { id: 7, name: "Технологии | Блог", msg: "Новый пост: AI и будущее",          time: "Вчера", unread: 0,  online: false, avatar: "ТБ", color: "#8B5CF6", group: false, blog: true,  video: false },
  { id: 8, name: "Путешествия 🌍",    msg: "Видео: Бали 2024",                  time: "2 дня", unread: 2,  online: false, avatar: "ПТ", color: "#0EA5E9", group: false, blog: false, video: true  },
];

export const mockStoriesChats = [
  { id: 1, name: "Соня",    avatar: "СБ", color: "#EC4899", viewed: false },
  { id: 2, name: "Алексей", avatar: "АГ", color: "#7C3AED", viewed: false },
  { id: 3, name: "Анна",    avatar: "АК", color: "#3B82F6", viewed: true  },
  { id: 4, name: "Михаил",  avatar: "МО", color: "#F97316", viewed: true  },
  { id: 5, name: "Дмитрий", avatar: "ДФ", color: "#10B981", viewed: true  },
];

export const mockContacts = [
  { id: 1, name: "Алексей Громов",   status: "В сети",             avatar: "АГ", color: "#7C3AED", online: true  },
  { id: 2, name: "Соня Белова",      status: "В сети",             avatar: "СБ", color: "#EC4899", online: true  },
  { id: 3, name: "Анна Козлова",     status: "В сети",             avatar: "АК", color: "#3B82F6", online: true  },
  { id: 4, name: "Михаил Орлов",     status: "Был(а) час назад",   avatar: "МО", color: "#F97316", online: false },
  { id: 5, name: "Дмитрий Фёдоров",  status: "Был(а) вчера",      avatar: "ДФ", color: "#10B981", online: false },
  { id: 6, name: "Элина Захарова",   status: "Был(а) 3 дня назад", avatar: "ЭЗ", color: "#D946EF", online: false },
];

export const mockCalls = [
  { id: 1, name: "Соня Белова",    type: "video", direction: "incoming", time: "Сегодня, 14:10", duration: "12 мин", avatar: "СБ", color: "#EC4899" },
  { id: 2, name: "Алексей Громов", type: "audio", direction: "outgoing", time: "Сегодня, 11:30", duration: "5 мин",  avatar: "АГ", color: "#7C3AED" },
  { id: 3, name: "Михаил Орлов",   type: "video", direction: "missed",   time: "Вчера, 19:45",   duration: "—",      avatar: "МО", color: "#F97316" },
  { id: 4, name: "Анна Козлова",   type: "audio", direction: "incoming", time: "Вчера, 15:20",   duration: "23 мин", avatar: "АК", color: "#3B82F6" },
];

export const mockServices = [
  { id: 1, title: "Дизайн логотипа",     author: "Анна К.",    price: "от 3 000 ₽",  category: "Дизайн", avatar: "АК", color: "#EC4899", rating: 4.9, reviews: 127, emoji: "🎨" },
  { id: 2, title: "Разработка сайта",    author: "Дмитрий Ф.", price: "от 15 000 ₽", category: "IT",     avatar: "ДФ", color: "#7C3AED", rating: 5.0, reviews: 89,  emoji: "💻" },
  { id: 3, title: "Фотосессия в студии", author: "Соня Б.",    price: "от 8 000 ₽",  category: "Фото",   avatar: "СБ", color: "#3B82F6", rating: 4.8, reviews: 203, emoji: "📸" },
  { id: 4, title: "Копирайтинг",         author: "Маша Л.",    price: "от 1 500 ₽",  category: "Текст",  avatar: "МЛ", color: "#F97316", rating: 4.7, reviews: 56,  emoji: "✍️" },
];

export const mockDating = [
  { id: 1, name: "Виктория, 26", city: "Москва", about: "Люблю путешествия, кофе и котов 🐱", tags: ["Путешествия","Фото","Музыка"], avatar: "В", color: "#EC4899", match: 94 },
  { id: 2, name: "Кирилл, 29",   city: "СПб",   about: "Разработчик, играю в группе 🎸",     tags: ["Музыка","IT","Спорт"],        avatar: "К", color: "#7C3AED", match: 87 },
];

export const mockProfilePhotos = [
  { id: 1, emoji: "🌅", bg: "from-orange-800 to-pink-900",  likes: 24, comments: [{ user: "Соня", text: "Красиво! 😍" }, { user: "Алексей", text: "Огонь 🔥" }], reactions: ["❤️","🔥","😍"] },
  { id: 2, emoji: "🏔️", bg: "from-blue-900 to-slate-800",   likes: 41, comments: [{ user: "Анна", text: "Где это?" }],                                            reactions: ["😮","❤️"] },
  { id: 3, emoji: "🎉", bg: "from-purple-900 to-pink-800",  likes: 67, comments: [{ user: "Михаил", text: "Праздник!" }],                                          reactions: ["🎉","❤️","😍","🔥"] },
  { id: 4, emoji: "☕", bg: "from-amber-900 to-orange-800", likes: 18, comments: [],                                                                                reactions: ["☕","❤️"] },
];

export const mockProfileActual = [
  { id: 1, emoji: "✈️", bg: "from-sky-800 to-blue-900",     label: "Поездка в Питер" },
  { id: 2, emoji: "📚", bg: "from-amber-800 to-orange-900", label: "Читаю сейчас"    },
  { id: 3, emoji: "🍕", bg: "from-red-800 to-rose-900",     label: "Любимое место"   },
];
