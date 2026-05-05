"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

// ========================
// CONSTANTS
// ========================

// Land users straight into the registration tab + onboarding wizard.
const APP_URL = "https://connect.esepkz.com/app/?signup=true";
const ESEP_URL = "https://esepkz.com";
const TRIAL_DAYS = 7;
const PRICE_KZT = 25000;
const ESEP_VALUE_KZT = 14990; // Esep monthly price — бонус-стоимость
const SUPPORT_WA = "77075884651";

// ========================
// ANIMATION HELPERS
// ========================

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========================
// NAVBAR (mobile-friendly)
// ========================

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-green-500/30">C</div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">Connect</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">Возможности</a>
            <a href="#how" className="hover:text-slate-900 transition">Как работает</a>
            <a href="#pricing" className="hover:text-slate-900 transition">Цена</a>
            <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm font-semibold hover:from-green-400 hover:to-green-500 transition-all shadow-md shadow-green-500/25">
              Начать бесплатно
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700"
              aria-label="menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                { href: "#features", label: "Возможности" },
                { href: "#how", label: "Как работает" },
                { href: "#pricing", label: "Цена" },
                { href: "#faq", label: "FAQ" },
              ].map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50">
                  {l.label}
                </a>
              ))}
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-center">
                Начать бесплатно
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ========================
// FLOATING MESSAGES — клиенты "пишут" со всех сторон вокруг hero
// Effect: bubbles fade in, drift up, fade out — looks like incoming chats live
// ========================

interface FloatingMsg {
  text: string;
  who: string;
  who_color: string;
  // % positions (responsive friendly)
  top: string;
  side: "left" | "right";
  offset: string;
  delay: number;
  duration: number;
}

// Bubbles only at top + bottom — far from the centered title.
// Each one fades in, drifts up, fades out — gives a "live messages" feel.
const FLOATING_MESSAGES: FloatingMsg[] = [
  // Top corners
  { text: "Запишите на завтра 🙂",                       who: "Айгуль", who_color: "from-pink-400 to-rose-400",      top: "12%", side: "left",  offset: "1.5%",  delay: 0,    duration: 9 },
  { text: "Сколько стоит маникюр?",                      who: "Болат",  who_color: "from-blue-400 to-indigo-400",    top: "10%", side: "right", offset: "1.5%",  delay: 1.5,  duration: 9 },
  { text: "Можно фото букета? 🌸",                       who: "Алия",   who_color: "from-amber-400 to-orange-400",   top: "26%", side: "left",  offset: "0.5%",  delay: 3,    duration: 9 },
  { text: "Когда акция на ресницы?",                     who: "Жанар",  who_color: "from-emerald-400 to-teal-400",   top: "24%", side: "right", offset: "0.5%",  delay: 4.5,  duration: 9 },

  // Bottom corners
  { text: "Принимаете заказ на ДР?",                     who: "Дина",   who_color: "from-purple-400 to-fuchsia-400", top: "75%", side: "left",  offset: "1%",    delay: 6,    duration: 9 },
  { text: "Спасибо! Заказ оформила ✅",                   who: "Адиль",  who_color: "from-cyan-400 to-sky-400",       top: "78%", side: "right", offset: "1%",    delay: 7.5,  duration: 9 },
];

function FloatingMessageBubble({ msg }: { msg: FloatingMsg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{
        opacity: [0, 0.95, 0.95, 0],
        y: [30, 0, -10, -40],
        scale: [0.85, 1, 1, 0.92],
      }}
      transition={{
        duration: msg.duration,
        delay: msg.delay,
        repeat: Infinity,
        repeatDelay: 8,
        times: [0, 0.15, 0.85, 1],
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top: msg.top,
        [msg.side]: msg.offset,
      }}
      className="hidden lg:flex items-start gap-2 w-[230px] z-0 pointer-events-none"
    >
      {msg.side === "left" && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${msg.who_color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
          {msg.who[0]}
        </div>
      )}
      <div
        className={`bg-white rounded-2xl ${msg.side === "left" ? "rounded-tl-sm" : "rounded-tr-sm"} px-3.5 py-2.5 shadow-lg shadow-slate-300/40 border border-slate-100`}
      >
        <div className="text-[10px] font-bold text-slate-400 mb-0.5">{msg.who}</div>
        <div className="text-xs sm:text-sm text-slate-700 leading-snug">{msg.text}</div>
      </div>
      {msg.side === "right" && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${msg.who_color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
          {msg.who[0]}
        </div>
      )}
    </motion.div>
  );
}

function FloatingMessages() {
  return (
    <>
      {FLOATING_MESSAGES.map((m, i) => (
        <FloatingMessageBubble key={i} msg={m} />
      ))}
    </>
  );
}

// Center "command center" pulse — visualises bot answering all incoming chats
function CenterPulse() {
  return (
    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-400/40"
          initial={{ width: 80, height: 80, opacity: 0 }}
          animate={{
            width: [80, 480],
            height: [80, 480],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ========================
// HERO
// ========================

function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden isolate">
      {/* Decorative dot grid — kept on its OWN absolute layer so its
          mask-image (which fades the bottom to transparent) doesn't
          accidentally fade the title and buttons too. */}
      <div className="absolute inset-0 bg-grid pointer-events-none -z-10" aria-hidden="true" />

      {/* Floating chat bubbles in the corners. */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none">
        <FloatingMessages />
      </div>

      {/* Centered hero copy — sits on top, fully opaque */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-500/30 bg-white/70 backdrop-blur-sm text-green-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            WhatsApp CRM для бизнеса Казахстана
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5 sm:mb-7 text-slate-900">
            Продавайте в<br className="sm:hidden" /> <span className="text-gradient">WhatsApp</span>
            <br /> на автопилоте
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Каталог, заказы, рассылки и AI-бот в одном дашборде.<br className="hidden sm:block" />
            Защита от банов. Подключение за <strong className="text-slate-900">2 минуты</strong>.
          </p>
        </FadeIn>

        {/* CTAs — NO FadeIn wrapper. Static, fully opaque, on top of everything. */}
        <div className="relative z-20 mt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 sm:px-9 py-4 sm:py-5 rounded-2xl bg-green-600 text-white font-bold text-base sm:text-lg hover:bg-green-500 hover:-translate-y-0.5 transition-colors transition-transform text-center shadow-md"
          >
            Начать бесплатно — {TRIAL_DAYS} дней
          </a>
          <a
            href="#demo"
            className="px-7 sm:px-9 py-4 sm:py-5 rounded-2xl border-2 border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-100 hover:border-slate-400 transition-colors text-center shadow-sm"
          >
            Посмотреть демо ↓
          </a>
        </div>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 sm:mt-9 text-xs sm:text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="text-green-600 text-base">✓</span> Без карты
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-600 text-base">✓</span> Установка бесплатно
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-600 text-base">✓</span> Поддержка 24/7
            </span>
          </div>
        </FadeIn>

        {/* Esep bonus badge */}
        <FadeIn delay={0.5}>
          <a
            href="#pricing"
            className="mt-7 sm:mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 text-slate-800 hover:from-amber-100 hover:to-yellow-100 hover:scale-[1.01] transition group shadow-md shadow-amber-200/30"
          >
            <span className="text-2xl">🎁</span>
            <span className="text-xs sm:text-sm">
              <strong className="text-amber-700">Бонус:</strong> при покупке —{" "}
              <strong>Esep в подарок</strong> ({ESEP_VALUE_KZT.toLocaleString("ru-RU")} ₸/мес)
              <span className="ml-1 text-amber-700 group-hover:underline">подробнее →</span>
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// STATS
// ========================

function StatsBar() {
  const stats = [
    { value: "300+", label: "сообщений/час", desc: "с антибан-защитой" },
    { value: "17+", label: "интеграций", desc: "AI, CRM, боты" },
    { value: "5 уровней", label: "защиты", desc: "от банов WhatsApp" },
    { value: "RU/EN/KZ", label: "локализация", desc: "три языка" },
  ];
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08} className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-gradient">{s.value}</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">{s.label}</div>
            <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{s.desc}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ========================
// PROBLEM
// ========================

function Problem() {
  const rows = [
    {
      pain: "Менеджер тратит 4+ часа/день на переписку",
      solution: "Бот отвечает мгновенно — 24/7",
      painIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      ),
      solutionIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
      ),
    },
    {
      pain: "Номера банят за массовые рассылки",
      solution: "Антибан-защита, 5 уровней",
      painIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14"/></svg>
      ),
      solutionIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>
      ),
    },
    {
      pain: "Нет аналитики — не видно кто купил",
      solution: "Дашборд с лидами, заказами, выручкой",
      painIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
      ),
      solutionIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
      ),
    },
    {
      pain: "Каждое сообщение пишется вручную",
      solution: "Шаблоны + AI отвечают за вас",
      painIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      ),
      solutionIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            До и после
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Знакомые проблемы — <span className="text-gradient">наши решения</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/50">
              <div className="px-5 sm:px-7 py-4 border-r border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-slate-500">
                    Без Connect
                  </span>
                </div>
              </div>
              <div className="px-5 sm:px-7 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-emerald-600">
                    С Connect
                  </span>
                </div>
              </div>
            </div>

            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/40 transition-colors"
              >
                {/* Pain */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-r border-slate-200 flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                    {r.painIcon}
                  </div>
                  <span className="text-slate-600 text-sm sm:text-[15px]">{r.pain}</span>
                </div>
                {/* Solution */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    {r.solutionIcon}
                  </div>
                  <span className="text-slate-900 font-semibold text-sm sm:text-[15px]">{r.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// HOW IT WORKS
// ========================

// ========================
// FLOW BUILDER PREVIEW — drag-drop style canvas with connected nodes.
// Replaces the boring 3-card "Старт за 2 минуты". This is the wow-feature
// that says: "you can build your own salesperson visually, like n8n / Zapier".
// ========================

interface FlowNode {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  // grid position on a 6-col x 3-row layout
  col: number;
  row: number;
  color: string; // Tailwind gradient color stops, e.g. "from-blue-400 to-blue-600"
  details: { title: string; items: string[] };
}

const FLOW_NODES: FlowNode[] = [
  {
    id: "n1",
    icon: "📩",
    title: "Клиент пишет",
    subtitle: "Любое сообщение в WA",
    col: 1, row: 1,
    color: "from-slate-500 to-slate-700",
    details: {
      title: "Триггер: новое сообщение",
      items: ["Запускается на любое входящее", "Поддержка текста, фото, голоса", "Ловит даже emoji-реакции"],
    },
  },
  {
    id: "n2",
    icon: "🤖",
    title: "AI-бот распознаёт",
    subtitle: "Намерение клиента",
    col: 2, row: 1,
    color: "from-emerald-400 to-emerald-600",
    details: {
      title: "AI-роутер по базе знаний",
      items: ["GPT определяет: запись / каталог / вопрос / жалоба", "Можно добавить кастомные категории", "Точность ~95%"],
    },
  },
  {
    id: "n3",
    icon: "📋",
    title: "Каталог",
    subtitle: "Бот шлёт товары",
    col: 3, row: 1,
    color: "from-blue-400 to-blue-600",
    details: {
      title: "Карточки товаров с кнопками",
      items: ["Фото + название + цена", "Inline-кнопка «В корзину»", "Категории: розы / торты / завтраки…"],
    },
  },
  {
    id: "n4",
    icon: "🛒",
    title: "Корзина",
    subtitle: "Сборка заказа",
    col: 4, row: 1,
    color: "from-purple-400 to-purple-600",
    details: {
      title: "Накопление позиций",
      items: ["Можно править количество", "Промокоды и скидки", "Auto-расчёт доставки"],
    },
  },
  {
    id: "n5",
    icon: "🚚",
    title: "Адрес + время",
    subtitle: "Сбор данных",
    col: 5, row: 1,
    color: "from-amber-400 to-orange-500",
    details: {
      title: "Структурный сбор",
      items: ["Адрес доставки (геопозиция)", "Имя получателя", "Текст открытки"],
    },
  },
  {
    id: "n6",
    icon: "✅",
    title: "Заказ в дашборде",
    subtitle: "Курьеру / тебе",
    col: 6, row: 1,
    color: "from-green-500 to-emerald-700",
    details: {
      title: "Уведомление + запись",
      items: ["Карточка в /orders", "Push в Telegram владельцу", "WhatsApp-подтверждение клиенту"],
    },
  },
];

function FlowBuilder() {
  const [selected, setSelected] = useState<string>("n3"); // default: catalog
  const node = FLOW_NODES.find((n) => n.id === selected)!;

  return (
    <section id="how" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Конструктор без кода
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Соберите своего <span className="text-gradient">бота-продажника</span><br className="hidden sm:block" /> за пару минут
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Перетягиваете блоки → соединяете линиями → готов сценарий продаж. Без программистов.
          </p>
        </FadeIn>

        {/* The flow canvas */}
        <FadeIn delay={0.15}>
          <div className="relative rounded-3xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Toolbar like a real builder */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-3 text-xs text-slate-500 font-medium">Цветочный магазин · сценарий «Заказ букета»</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">● Активен</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">12 заказов сегодня</span>
              </div>
            </div>

            {/* Canvas with grid background and nodes */}
            <div
              className="relative px-4 sm:px-8 py-10 sm:py-14"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* SVG connectors between nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                {FLOW_NODES.slice(0, -1).map((n, i) => {
                  const next = FLOW_NODES[i + 1];
                  // 6 nodes evenly spaced — % positions
                  const x1 = ((n.col - 0.5) / 6) * 100;
                  const x2 = ((next.col - 0.5) / 6) * 100;
                  return (
                    <g key={i}>
                      <line
                        x1={`${x1}%`} y1="50%"
                        x2={`${x2}%`} y2="50%"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                      {/* Animated dot traveling along */}
                      <motion.circle
                        r="3.5"
                        fill="#22c55e"
                        initial={{ cx: `${x1}%` }}
                        animate={{ cx: [`${x1}%`, `${x2}%`] }}
                        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: i * 0.4, ease: "easeInOut" }}
                        cy="50%"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-2">
                {FLOW_NODES.map((n, i) => {
                  const isActive = selected === n.id;
                  return (
                    <motion.button
                      key={n.id}
                      type="button"
                      onClick={() => setSelected(n.id)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                      className={`relative z-10 rounded-2xl border-2 p-3 sm:p-4 text-left bg-white transition-all
                        ${isActive
                          ? "border-emerald-500 shadow-xl shadow-emerald-200/50"
                          : "border-slate-200 hover:border-emerald-300 shadow-md"}`}
                    >
                      <div className={`inline-flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl items-center justify-center text-lg sm:text-xl bg-gradient-to-br ${n.color} text-white shadow-sm mb-2`}>
                        {n.icon}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider">
                        Шаг {i + 1}
                      </div>
                      <div className="font-bold text-sm sm:text-base text-slate-900 leading-tight mt-0.5">
                        {n.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 mt-1 hidden sm:block">
                        {n.subtitle}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="flow-arrow"
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-emerald-500"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Node detail card — shows on click */}
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-10 mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-5 sm:p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center text-2xl text-white shadow-lg`}>
                    {node.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold mb-1">
                      Настройка блока
                    </div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">{node.details.title}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {node.details.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom hint */}
            <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs text-slate-500">
                💡 Нажмите на любой блок чтобы увидеть что внутри
              </div>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Собрать свой → бесплатно 7 дней
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Quick onboarding strip below */}
        <FadeIn delay={0.3}>
          <div className="mt-8 sm:mt-10 grid sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { num: "01", title: "Зарегистрируйтесь", desc: "Email + пароль. 10 секунд." },
              { num: "02", title: "Подключите WhatsApp", desc: "QR-код с телефона." },
              { num: "03", title: "Соберите бота", desc: "Drag-and-drop, без кода." },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 card-soft">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-mono text-sm font-bold">
                  {s.num}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{s.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Keep old function name for the export below
const HowItWorks = FlowBuilder;

// ========================
// FEATURES
// ========================

function Features() {
  const features = [
    { icon: "🛍️", title: "Каталог товаров", desc: "Бот покажет товары с фото, ценами и кнопками заказа прямо в чате.", color: "from-green-50 to-emerald-50/40", border: "border-green-200/60", iconBg: "bg-green-100" },
    { icon: "📅", title: "Запись на приём", desc: "Клиент выбирает услугу и время — заявка сразу в дашборде.", color: "from-blue-50 to-cyan-50/40", border: "border-blue-200/60", iconBg: "bg-blue-100" },
    { icon: "📢", title: "Рассылки", desc: "Массовая отправка по сегментам с антибан-задержками.", color: "from-purple-50 to-fuchsia-50/40", border: "border-purple-200/60", iconBg: "bg-purple-100" },
    { icon: "🤖", title: "AI чат-бот", desc: "Подключите OpenAI — бот отвечает 24/7 по вашей базе знаний.", color: "from-orange-50 to-amber-50/40", border: "border-orange-200/60", iconBg: "bg-orange-100" },
    { icon: "👥", title: "CRM лидов", desc: "Статусы, теги, история переписки. Сегментация по поведению.", color: "from-pink-50 to-rose-50/40", border: "border-pink-200/60", iconBg: "bg-pink-100" },
    { icon: "🛡️", title: "Антибан", desc: "5 уровней защиты: warmup, очередь, рандом-задержки, slowdown.", color: "from-emerald-50 to-teal-50/40", border: "border-emerald-200/60", iconBg: "bg-emerald-100" },
  ];
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Всё для бизнеса в WhatsApp</h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">CRM, каталог, рассылки и AI — в одной платформе</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className={`p-6 sm:p-7 rounded-3xl border ${f.border} bg-gradient-to-br ${f.color} card-soft transition-all duration-300 h-full`}>
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// SHEETS INTEGRATION SECTION — "уже работаете в Excel? подключите за 30 сек"
// ========================

function SheetsIntegration() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Без миграции данных
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Уже ведёте всё в <span className="text-gradient">Excel</span> или Google Sheets?
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Не нужно переносить данные вручную. Подключите ссылку на свою таблицу — Connect сам подтянет товары, расписание и клиентов.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            {/* Left: 3-step instruction */}
            <div className="space-y-4">
              {[
                {
                  n: 1,
                  icon: "📊",
                  title: "Откройте свою таблицу в Google Sheets / Excel",
                  desc: 'Та таблица где у вас уже хранятся товары, прайс или контакты клиентов.',
                },
                {
                  n: 2,
                  icon: "🔗",
                  title: 'Файл → "Опубликовать в интернете" → CSV',
                  desc: "Google создаст публичную ссылку. Подойдёт также OneDrive / Excel Online.",
                },
                {
                  n: 3,
                  icon: "⚡",
                  title: "Вставьте ссылку в Connect → жмёте «Синхронизировать»",
                  desc: 'Готово. Меняете таблицу → жмёте Sync → данные обновятся в боте.',
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 card-soft"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                        Шаг {s.n}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{s.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pl-5 pt-2">
                <p className="text-xs text-slate-500 leading-relaxed">
                  ✓ Названия колонок на русском или английском · ✓ Без OAuth и Google Cloud Console · ✓ Двусторонняя синхронизация — изменения в Sheets подхватываются автоматически
                </p>
              </div>
            </div>

            {/* Right: animated sheet → bot mockup */}
            <SheetSyncMockup />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SheetSyncMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-blue-200/20 rounded-3xl blur-2xl" />
      <div className="relative space-y-3">
        {/* Spreadsheet card */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white">
            <div className="w-6 h-6 rounded bg-white text-emerald-700 flex items-center justify-center font-bold text-xs">
              X
            </div>
            <span className="text-sm font-medium">Прайс — Маникюр.xlsx</span>
            <span className="ml-auto text-[10px] opacity-80">Google Sheets</span>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2 text-left font-bold text-slate-700">name</th>
                <th className="px-3 py-2 text-left font-bold text-slate-700">price</th>
                <th className="px-3 py-2 text-left font-bold text-slate-700">stock</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: "Маникюр классический", p: "5 000 ₸", s: "99" },
                { n: "Маникюр + покрытие", p: "8 000 ₸", s: "99" },
                { n: "Педикюр", p: "6 500 ₸", s: "99" },
                { n: "Брови + краска", p: "4 000 ₸", s: "99" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-700">{r.n}</td>
                  <td className="px-3 py-2 text-slate-900 font-semibold">{r.p}</td>
                  <td className="px-3 py-2 text-slate-500">{r.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Animated arrow */}
        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Sync · auto
            </div>
            <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
          </motion.div>
        </div>

        {/* Connect catalog card */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <div className="w-6 h-6 rounded-lg bg-white text-emerald-700 flex items-center justify-center font-bold text-xs">
              C
            </div>
            <span className="text-sm font-medium">Каталог Connect — салон Beauty</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full"
            >
              ✓ обновлено
            </motion.span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { e: "💅", n: "Маникюр классический", p: "5 000 ₸" },
              { e: "✨", n: "Маникюр + покрытие", p: "8 000 ₸" },
              { e: "🦶", n: "Педикюр", p: "6 500 ₸" },
              { e: "✏️", n: "Брови + краска", p: "4 000 ₸" },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg bg-white shadow-sm border border-emerald-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{r.e}</span>
                  <span className="text-xs text-slate-700 font-medium">{r.n}</span>
                </div>
                <span className="text-xs font-bold text-emerald-700">{r.p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================
// INTERACTIVE DEMO
// ========================

interface ChatMsg {
  id: number;
  from: "bot" | "user";
  text: string;
  type?: "text" | "buttons" | "card" | "success";
  buttons?: Array<{ label: string; value: string }>;
}

// ────────────────────────────────────────────────────────────────────
// DemoCRMPanel — "live" Connect dashboard mock that reacts to the
// phone-side demo. Shows: customer card, AI suggestion, order being
// built, stats counter ticking up. The whole point: visualize that
// while the customer just clicks buttons in WhatsApp, the salon owner
// sees a real CRM filling itself.
// ────────────────────────────────────────────────────────────────────

function DemoCRMPanel({ step, messages }: { step: number; messages: ChatMsg[] }) {
  // Pick a service the user chose (if any) by scanning for known labels.
  const userTexts = messages.filter((m) => m.from === "user").map((m) => m.text);
  const chosenService = (() => {
    const t = userTexts.join(" ");
    if (/маникюр/i.test(t)) return { name: "Маникюр + покрытие", price: 8000 };
    if (/педикюр/i.test(t)) return { name: "Педикюр", price: 6500 };
    if (/брови/i.test(t)) return { name: "Брови", price: 4000 };
    return null;
  })();
  const chosenTime = (() => {
    const t = userTexts.join(" ");
    const m = t.match(/завтра.*\d{1,2}:\d{2}|послезавтра.*\d{1,2}:\d{2}/i);
    return m ? m[0] : null;
  })();

  // Tag system — bot decides who's who.
  const tags: { label: string; color: string; show: boolean }[] = [
    { label: "Новый клиент", color: "bg-blue-100 text-blue-700", show: true },
    { label: "Маникюр", color: "bg-pink-100 text-pink-700", show: !!chosenService && chosenService.name.includes("Маникюр") },
    { label: "Заказ оформлен", color: "bg-emerald-100 text-emerald-700", show: step >= 4 },
  ];

  // Live stats counter — bumps when step reaches "done"
  const baseStats = { messages: 47, leads: 12, orders: 5, revenue: 84000 };
  const stats = step >= 4
    ? { messages: 48, leads: 13, orders: 6, revenue: 84000 + (chosenService?.price ?? 5000) }
    : baseStats;

  // Activity feed entries — appear as user progresses.
  // Use full Tailwind class names (not interpolation) so JIT picks them up.
  const feed = [
    { id: "f1", show: step >= 0, time: "сейчас",        actor: "Айгуль", text: "написала первой",         dot: "bg-blue-500" },
    { id: "f2", show: step >= 1, time: "5 сек назад",   actor: "Бот",    text: "показал каталог услуг",   dot: "bg-emerald-500" },
    { id: "f3", show: step >= 2, time: "12 сек назад",  actor: "Бот",    text: "предложил время",         dot: "bg-amber-500" },
    { id: "f4", show: step >= 3, time: "20 сек назад",  actor: "Бот",    text: "запросил подтверждение",  dot: "bg-purple-500" },
    { id: "f5", show: step >= 4, time: "26 сек назад",  actor: "Бот",    text: "оформил заказ ✅",         dot: "bg-green-500" },
  ].filter((f) => f.show);

  return (
    <div className="relative">
      {/* Browser frame */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 ml-3">
            <div className="bg-white rounded-md px-3 py-1 text-[11px] text-slate-500 border border-slate-200 max-w-fit">
              connect.esepkz.com/app/
            </div>
          </div>
          <div className="text-[10px] text-slate-400 hidden sm:block font-mono">Connect Dashboard</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] min-h-[480px]">
          {/* Sidebar */}
          <div className="bg-slate-50/70 border-r border-slate-200 p-3 hidden sm:block">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-700 text-white text-xs font-extrabold flex items-center justify-center">C</div>
              <div className="font-bold text-sm text-slate-900">Connect</div>
            </div>
            <div className="space-y-0.5">
              {[
                { l: "Inbox", a: true, badge: 3 },
                { l: "Лиды", a: false },
                { l: "Каталог", a: false },
                { l: "Заказы", a: false, badge: stats.orders },
                { l: "Кампании", a: false },
                { l: "Расписание", a: false },
                { l: "AI-бот", a: false },
              ].map((it, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${
                    it.a ? "bg-emerald-100 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{it.l}</span>
                  {it.badge && (
                    <span className={`text-[10px] px-1.5 py-0 rounded-full ${it.a ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"} font-bold`}>
                      {it.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="p-4 sm:p-5 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Сообщ.", value: stats.messages, color: "text-slate-700" },
                { label: "Лиды", value: stats.leads, color: "text-blue-600" },
                { label: "Заказы", value: stats.orders, color: "text-emerald-600" },
                { label: "₸ выручка", value: stats.revenue.toLocaleString("ru-RU"), color: "text-amber-600" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  layout
                  className="rounded-xl border border-slate-200 bg-white p-2 sm:p-3"
                >
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-medium">{s.label}</div>
                  <motion.div
                    key={String(s.value)}
                    initial={{ scale: 1.2, color: "#22c55e" }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`text-sm sm:text-lg font-extrabold ${s.color} mt-0.5`}
                  >
                    {s.value}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Customer card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white font-bold flex items-center justify-center text-lg">
                  А
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-bold text-slate-900">Айгуль</div>
                    <div className="text-xs text-slate-500">+7 707 *** **</div>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> онлайн
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <AnimatePresence>
                      {tags.filter((t) => t.show).map((t, i) => (
                        <motion.span
                          key={t.label}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${t.color}`}
                        >
                          {t.label}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 hidden sm:block">только что</div>
              </div>

              {/* Order being built */}
              <AnimatePresence>
                {chosenService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 rounded-xl bg-white border border-slate-200 overflow-hidden"
                  >
                    <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📥</span>
                      <span>Заказ #1247</span>
                      {step >= 4 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px]">Подтверждён</span>
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{chosenService.name}</span>
                        <span className="font-bold text-slate-900">{chosenService.price.toLocaleString("ru-RU")} ₸</span>
                      </div>
                      {chosenTime && (
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>🕐 Время</span>
                          <span className="font-medium text-slate-700">{chosenTime}</span>
                        </div>
                      )}
                      <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Итого</span>
                        <span className="font-extrabold text-emerald-600 text-base">
                          {chosenService.price.toLocaleString("ru-RU")} ₸
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Activity feed */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Активность бота — в реальном времени
              </div>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {feed.map((f) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${f.dot} flex-shrink-0`} />
                      <span className="text-slate-400 w-20 sm:w-24 flex-shrink-0">{f.time}</span>
                      <span className="text-slate-700">
                        <strong className="text-slate-900">{f.actor}</strong> {f.text}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Заказ +X ₸" badge appears when step=done */}
      <AnimatePresence>
        {step >= 4 && chosenService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="absolute -top-3 -right-3 px-3 py-2 rounded-2xl bg-white border border-emerald-300 shadow-xl shadow-emerald-200/40 flex items-center gap-2 z-10"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-lg">💸</div>
            <div>
              <div className="text-[10px] text-slate-500 leading-tight">Новый заказ</div>
              <div className="text-emerald-700 font-bold text-sm">+{chosenService.price.toLocaleString("ru-RU")} ₸</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InteractiveDemo() {
  const initialMessages: ChatMsg[] = [
    { id: 0, from: "bot", text: "Привет! 👋 Я бот салона красоты. Чем могу помочь?", type: "buttons",
      buttons: [
        { label: "💅 Записаться", value: "book" },
        { label: "📋 Услуги", value: "services" },
        { label: "📍 Контакты", value: "contacts" },
      ]
    }
  ];
  const [messages, setMessages] = useState<ChatMsg[]>(initialMessages);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const addBotMsg = useCallback((msg: Omit<ChatMsg, "id" | "from">, delayMs = 700) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { ...msg, id: prev.length, from: "bot" }]);
      setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }), 100);
    }, delayMs);
  }, []);

  const handleChoice = useCallback((value: string) => {
    const userText: Record<string, string> = {
      book: "💅 Записаться", services: "📋 Услуги", contacts: "📍 Контакты",
      manicure: "Маникюр + покрытие — 8 000 ₸", pedicure: "Педикюр — 6 500 ₸", brows: "Брови — 4 000 ₸",
      time1: "Завтра, 14:00", time2: "Завтра, 16:30", time3: "Послезавтра, 11:00",
      confirm: "✅ Подтвердить", restart: "🔄 Заново",
    };

    setMessages(prev => [...prev, { id: prev.length, from: "user", text: userText[value] || value, type: "text" }]);

    if (value === "restart") {
      setStep(0);
      setTimeout(() => setMessages(initialMessages), 300);
      return;
    }

    if (value === "services" || value === "book") {
      setStep(1);
      addBotMsg({
        text: "Выберите услугу:", type: "buttons",
        buttons: [
          { label: "Маникюр — 8 000 ₸", value: "manicure" },
          { label: "Педикюр — 6 500 ₸", value: "pedicure" },
          { label: "Брови — 4 000 ₸", value: "brows" },
        ]
      });
    } else if (value === "contacts") {
      addBotMsg({ text: "📍 Алматы, ул. Абая 52\n📞 +7 707 123 4567\n🕐 Пн-Сб 9:00–20:00", type: "buttons",
        buttons: [{ label: "💅 Записаться", value: "book" }, { label: "🔄 Заново", value: "restart" }]
      });
    } else if (["manicure", "pedicure", "brows"].includes(value)) {
      setStep(2);
      addBotMsg({ text: "Выберите время:", type: "buttons",
        buttons: [
          { label: "Завтра, 14:00", value: "time1" },
          { label: "Завтра, 16:30", value: "time2" },
          { label: "Послезавтра, 11:00", value: "time3" },
        ]
      });
    } else if (["time1", "time2", "time3"].includes(value)) {
      setStep(3);
      const timeMap: Record<string, string> = { time1: "завтра в 14:00", time2: "завтра в 16:30", time3: "послезавтра в 11:00" };
      addBotMsg({ text: `Подтвердите запись:\n\n🕐 ${timeMap[value]}\n💰 от 4 000 ₸`, type: "buttons",
        buttons: [
          { label: "✅ Подтвердить", value: "confirm" },
          { label: "🔄 Заново", value: "restart" },
        ]
      });
    } else if (value === "confirm") {
      setStep(4);
      addBotMsg({ text: "✅ Запись подтверждена!\n\nНапомним за 2 часа.\nСпасибо! 💚", type: "success",
        buttons: [{ label: "🔄 Попробовать ещё", value: "restart" }]
      });
    }
  }, [addBotMsg]);

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Живое демо
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Слева — клиент пишет,<br className="sm:hidden" /> справа — <span className="text-gradient">вы видите заказ</span>
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Нажимайте кнопки в WhatsApp слева — следите как бот собирает заказ и кладёт его в ваш дашборд.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid lg:grid-cols-[420px_1fr] gap-6 lg:gap-10 items-start">
            {/* ── LEFT: WhatsApp phone ── */}
            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="absolute -inset-6 bg-green-400/15 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-[28px] border-[10px] border-slate-900 bg-white overflow-hidden shadow-2xl shadow-slate-400/40">
                {/* WhatsApp header */}
                <div className="bg-[#075e54] px-3 sm:px-4 py-2.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Салон Beauty</div>
                    <div className="text-white/70 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300" /> Бот Connect
                    </div>
                  </div>
                </div>

                <div ref={chatRef} className="h-[360px] sm:h-[420px] overflow-y-auto p-3 space-y-2 scroll-smooth bg-[#e5ddd5]">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {msg.from === "user" ? (
                          <div className="flex justify-end">
                            <div className="bg-[#dcf8c6] text-slate-800 rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] text-sm leading-relaxed shadow-sm">
                              {msg.text}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className={`rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] text-sm leading-relaxed shadow-sm ${msg.type === "success" ? "bg-green-100 border border-green-200" : "bg-white"} text-slate-800`}>
                              <div className="whitespace-pre-line">{msg.text}</div>
                            </div>
                            {msg.buttons && msg.id === messages[messages.length - 1].id && (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                className="flex flex-wrap gap-1.5"
                              >
                                {msg.buttons.map((btn, j) => (
                                  <motion.button
                                    key={j}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleChoice(btn.value)}
                                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all duration-200 shadow-sm"
                                  >
                                    {btn.label}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 px-3 py-2.5 bg-white rounded-xl rounded-tl-sm w-14 shadow-sm">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-5 flex-wrap">
                {["Привет", "Услуга", "Время", "Подтв.", "Готово"].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= step ? "bg-green-500 shadow shadow-green-400/50" : "bg-slate-300"}`} />
                    <span className={`text-[11px] hidden sm:inline transition-colors ${i <= step ? "text-green-700 font-medium" : "text-slate-400"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: live CRM dashboard panel ── */}
            <DemoCRMPanel step={step} messages={messages} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// PRICING (single plan)
// ========================

function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Простая цена</h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">Один тариф. Всё включено. Без скрытых платежей.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 glow-green">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-md">
              {TRIAL_DAYS} ДНЕЙ БЕСПЛАТНО
            </div>
            <div className="text-center mb-6 sm:mb-8 mt-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Connect Pro</h3>
              <p className="text-slate-500 text-sm mt-1">Для малого и среднего бизнеса</p>
              <div className="mt-5 sm:mt-6 flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold text-slate-900">{PRICE_KZT.toLocaleString("ru-RU")}</span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-700">₸</span>
              </div>
              <div className="text-slate-500 text-sm mt-1">в месяц</div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white text-green-700 text-xs font-semibold border border-green-200">
                −20% при оплате за 3 месяца → 60 000 ₸
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 mb-7 sm:mb-8">
              {[
                "WhatsApp бот с каталогом",
                "Все диалоги в одном дашборде",
                "Антибан-защита (5 уровней)",
                "Авто-теги и сегментация",
                "Массовые рассылки",
                "Запись на приём прямо в чате",
                "AI-бот по вашей базе знаний",
                "Поддержка 24/7 в Telegram",
                "Установка и обучение бесплатно",
                "RU / KZ / EN интерфейс",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-600 font-bold pt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href={APP_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-center hover:from-green-400 hover:to-green-500 transition shadow-lg shadow-green-500/30">
              Попробовать бесплатно
            </a>
            <div className="text-center text-xs text-slate-400 mt-3">
              Без карты. Отменить в любой момент.
            </div>
          </div>
        </FadeIn>

        {/* Esep bonus block */}
        <FadeIn delay={0.3}>
          <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 p-6 sm:p-8">
            {/* Floating gift emoji */}
            <div className="absolute -top-4 -right-4 text-7xl opacity-20 rotate-12 select-none">🎁</div>

            <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-5 sm:gap-7 items-center">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-amber-300/50">
                🎁
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-200/60 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Бонус для всех клиентов
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5">
                  Esep — бухгалтерия для ИП в подарок
                </h3>
                <p className="text-sm sm:text-base text-slate-700 mb-2 leading-snug">
                  Расчёт формы 910, ОПВ, СО, ВОСМС, налогов по новому НК&nbsp;2026. Напоминания о дедлайнах. Калькулятор за 30 секунд.
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Стоимость отдельно — <strong className="text-amber-800">{ESEP_VALUE_KZT.toLocaleString("ru-RU")} ₸/мес</strong>. При оплате Connect — <strong className="text-green-700">бесплатно навсегда</strong>.
                </p>
              </div>

              <a
                href={ESEP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-amber-400 text-amber-900 font-semibold text-sm hover:bg-amber-50 hover:border-amber-500 transition whitespace-nowrap shadow-sm"
              >
                Что такое Esep →
              </a>
            </div>

            {/* What's inside */}
            <div className="relative mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-amber-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-700">
                {[
                  { icon: "📋", text: "Форма 910" },
                  { icon: "💰", text: "ОПВ / СО / ВОСМС" },
                  { icon: "🔔", text: "Напоминания о дедлайнах" },
                  { icon: "🧮", text: "Калькулятор налогов" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// LEAD CAPTURE FORM (creates lead in Connect)
// ========================

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("https://connect.esepkz.com/leads/esep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D+/g, ""),
          whatsapp: phone.replace(/\D+/g, ""),
          notes: businessType ? `Из лендинга · ${businessType}` : "Из лендинга",
          source: "landing",
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          status: "new",
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setDone(true);
    } catch {
      // Fallback: open WhatsApp
      const text = encodeURIComponent(
        `Здравствуйте! Меня зовут ${name}, хочу подключить Connect для ${businessType || "моего бизнеса"}. Телефон: ${phone}`,
      );
      window.open(`https://wa.me/${SUPPORT_WA}?text=${text}`, "_blank");
      setDone(true);
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
        <p className="text-slate-600">Свяжемся в WhatsApp в течение 1 часа.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 card-soft space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Имя</label>
        <input
          required type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition text-slate-900"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp / телефон</label>
        <input
          required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 707 ..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition text-slate-900"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Тип бизнеса</label>
        <select
          value={businessType} onChange={(e) => setBusinessType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition text-slate-900"
        >
          <option value="">Выберите</option>
          <option>Салон красоты</option>
          <option>Кофейня / ресторан</option>
          <option>Доставка цветов</option>
          <option>Доставка еды</option>
          <option>Детский центр</option>
          <option>Курсы / школа</option>
          <option>Фитнес / спа</option>
          <option>Магазин / интернет-магазин</option>
          <option>Другое</option>
        </select>
      </div>
      <button
        type="submit" disabled={submitting || !name.trim() || !phone.trim()}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-400 hover:to-green-500 transition shadow-md shadow-green-500/25 disabled:opacity-50"
      >
        {submitting ? "Отправляем..." : "Получить демо в WhatsApp"}
      </button>
      <p className="text-xs text-slate-400 text-center">
        Перезвоним в течение 1 часа. Ничего не платите.
      </p>
    </form>
  );
}

// ========================
// FAQ
// ========================

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Что входит в 25 000 ₸?", a: "Полный доступ ко всем функциям Connect: каталог, рассылки, AI-бот, антибан, CRM лидов, расписание, аналитика. Один WhatsApp-номер. Установка и обучение бесплатно. Поддержка 24/7. Плюс — Esep бесплатно (бухгалтерия для ИП, отдельно стоит 14 990 ₸/мес)." },
    { q: "Что такое Esep и почему он бесплатно?", a: "Esep — это наше второе приложение для ИП Казахстана. Считает форму 910, ОПВ, СО, ВОСМС, налоги по новому НК 2026 за 1 минуту. Мы дарим Esep всем клиентам Connect — экономите ещё 14 990 ₸/мес. Подробнее на esepkz.com." },
    { q: "Могут ли забанить мой номер WhatsApp?", a: "У нас 5-уровневая антибан-система: warmup (14 дней постепенного разгона), очередь сообщений с рандом-задержками 30-90 сек, лимит 12/мин, эмуляция набора, auto-slowdown при rate-limit. С нашими настройками риск минимальный." },
    { q: "Сколько занимает подключение?", a: "От 2 минут — отсканировать QR с телефона. Установку и базовую настройку мы делаем за вас бесплатно — обычно за час." },
    { q: "Можно использовать существующий номер?", a: "Да. Connect работает с любым WhatsApp-аккаунтом. Подключение через QR — как WhatsApp Web." },
    { q: "Подходит ли для салонов / кофеен / доставки?", a: "Да. Это наша основная аудитория. У нас готовые шаблоны каталога и сценариев записи. За 1-2 дня запустим под ваш бизнес." },
    { q: "Что если не подойдёт?", a: "Первая неделя бесплатно. Если не подойдёт — просто не платите. Без бюрократии." },
  ];
  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Частые вопросы</h2>
        </FadeIn>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                <button
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-slate-900 pr-4 text-sm sm:text-base">{f.q}</span>
                  <span className={`text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 sm:px-5 pb-5 text-slate-600 text-sm leading-relaxed"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// FINAL CTA + LEAD FORM
// ========================

function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-green-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-5 text-slate-900">
            Готовы продавать через WhatsApp?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
            Оставьте заявку — свяжемся в WhatsApp в течение часа, покажем демо и подключим бесплатно на 7 дней.
          </p>
          <div className="space-y-3">
            {[
              { icon: "✓", text: "Без карты, без обязательств" },
              { icon: "✓", text: "Установка и обучение бесплатно" },
              { icon: "✓", text: "Поддержка 24/7 в Telegram" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">{item.icon}</span>
                <span className="text-sm sm:text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <LeadForm />
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// FOOTER
// ========================

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-xs">C</div>
            <span className="font-bold text-slate-900">Connect</span>
            <span className="text-slate-400 text-sm ml-2">© 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition">Возможности</a>
            <a href="#pricing" className="hover:text-slate-900 transition">Цена</a>
            <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
            <a href={`https://wa.me/${SUPPORT_WA}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
              WhatsApp
            </a>
            <a href="https://t.me/esep_kz_bot" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
              Telegram
            </a>
            <a href="mailto:hello@esepkz.com" className="hover:text-green-600 transition">
              hello@esepkz.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ========================
// MAIN
// ========================

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Problem />
      <HowItWorks />
      <Features />
      <SheetsIntegration />
      <InteractiveDemo />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
