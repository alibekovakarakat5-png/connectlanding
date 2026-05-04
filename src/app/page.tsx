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
// HERO
// ========================

function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden bg-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[400px] sm:h-[600px] bg-green-300/30 rounded-full blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
        <div className="text-center lg:text-left order-1">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-700 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              WhatsApp CRM для бизнеса Казахстана
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 sm:mb-6 text-slate-900">
              Продавайте в<span className="text-gradient"> WhatsApp</span><br className="hidden sm:block" /> на автопилоте
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-8 leading-relaxed">
              Каталог, заказы, рассылки и AI-бот в одном дашборде. Защита от банов WhatsApp. Подключение за 2 минуты.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-base sm:text-lg hover:from-green-400 hover:to-green-500 transition-all shadow-xl shadow-green-500/30 text-center">
                Начать бесплатно — {TRIAL_DAYS} дней
              </a>
              <a href="#demo"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-white hover:border-slate-400 transition text-center">
                Посмотреть демо ↓
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 sm:mt-10 justify-center lg:justify-start text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-base">✓</span> Без карты
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-base">✓</span> Установка бесплатно
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-base">✓</span> Поддержка 24/7
              </div>
            </div>
          </FadeIn>

          {/* Esep bonus badge */}
          <FadeIn delay={0.5}>
            <a
              href="#pricing"
              className="mt-6 sm:mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 text-slate-800 hover:from-amber-100 hover:to-yellow-100 transition group"
            >
              <span className="text-2xl">🎁</span>
              <span className="text-xs sm:text-sm">
                <strong className="text-amber-700">Бонус:</strong> при покупке тарифа — <strong>Esep в подарок</strong> (бухгалтерия для ИП, ценность {ESEP_VALUE_KZT.toLocaleString("ru-RU")} ₸/мес)
                <span className="ml-1 text-amber-700 group-hover:underline">подробнее →</span>
              </span>
            </a>
          </FadeIn>
        </div>

        {/* Hero visual: Remotion-rendered intro video */}
        <FadeIn delay={0.3} className="order-2 flex justify-center">
          <div className="relative w-full max-w-[520px]">
            <div className="absolute -inset-4 bg-green-400/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xl shadow-slate-300/50">
              <video
                className="w-full aspect-video object-cover bg-slate-100"
                autoPlay
                muted
                loop
                playsInline
                poster="/connect-intro-poster.jpg"
              >
                <source src="/connect-intro.mp4" type="video/mp4" />
              </video>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur border border-green-500/30 shadow-lg"
              >
                <div className="text-[10px] text-slate-500">Антибан</div>
                <div className="text-green-600 font-bold text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Активна
                </div>
              </motion.div>
            </div>
          </div>
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
  const problems = [
    { icon: "⏰", text: "Менеджер тратит 4+ часа/день на переписку" },
    { icon: "🚫", text: "Номера банят за массовые рассылки" },
    { icon: "📊", text: "Нет аналитики — не видно кто купил" },
    { icon: "🤖", text: "Каждое сообщение пишется вручную" },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Знакомо?</h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">Эти проблемы решает Connect</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {problems.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-100">
                <span className="text-2xl sm:text-3xl">{p.icon}</span>
                <span className="text-slate-700 text-sm sm:text-base pt-0.5">{p.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// HOW IT WORKS
// ========================

function HowItWorks() {
  const steps = [
    { num: "01", title: "Регистрация", desc: "Email + пароль. 10 секунд.", icon: "👤" },
    { num: "02", title: "QR-код", desc: "Сканируете телефоном — WhatsApp подключён.", icon: "📱" },
    { num: "03", title: "Запуск", desc: "Добавьте товары, включите бота, шлите рассылки.", icon: "🚀" },
  ];
  return (
    <section id="how" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Старт за 2 минуты</h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">Три шага до продаж в WhatsApp</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="relative p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white card-soft transition group">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{s.icon}</div>
                <div className="text-green-600 font-mono text-sm mb-2">{s.num}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{s.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

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
// INTERACTIVE DEMO
// ========================

interface ChatMsg {
  id: number;
  from: "bot" | "user";
  text: string;
  type?: "text" | "buttons" | "card" | "success";
  buttons?: Array<{ label: string; value: string }>;
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
    <section id="demo" className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-100/60 text-green-700 text-xs sm:text-sm font-medium mb-4">
            Интерактивное демо
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Попробуйте прямо сейчас</h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">Нажимайте кнопки — как клиент в WhatsApp</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-[420px] mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 bg-green-400/15 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xl shadow-slate-300/40">
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

                <div ref={chatRef} className="h-[360px] sm:h-[400px] overflow-y-auto p-3 space-y-2 scroll-smooth bg-[#e5ddd5]">
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
            </div>

            <div className="flex justify-center gap-2 mt-5 sm:mt-6 flex-wrap">
              {["Привет", "Услуга", "Время", "Подтв.", "Готово"].map((label, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= step ? "bg-green-500 shadow shadow-green-400/50" : "bg-slate-300"}`} />
                  <span className={`text-[11px] hidden sm:inline transition-colors ${i <= step ? "text-green-700 font-medium" : "text-slate-400"}`}>{label}</span>
                </div>
              ))}
            </div>
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
      <InteractiveDemo />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
