"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ========================
// ANIMATION HELPERS
// ========================

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========================
// NAVBAR
// ========================

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#050808]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-extrabold text-sm">C</div>
          <span className="font-bold text-lg tracking-tight">Connect</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Возможности</a>
          <a href="#how" className="hover:text-white transition">Как работает</a>
          <a href="#pricing" className="hover:text-white transition">Цены</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
        <a href="#pricing" className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/20">
          Попробовать бесплатно
        </a>
      </div>
    </nav>
  );
}

// ========================
// HERO
// ========================

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/8 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Новое поколение WhatsApp для бизнеса
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Продавайте в<span className="text-gradient"> WhatsApp</span><br />без ограничений
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Каталог товаров, запись на приём, рассылки, чат-боты и защита от банов — всё в одной платформе. Подключите WhatsApp за 2 минуты.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#pricing" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg hover:from-green-400 hover:to-green-500 transition-all shadow-xl shadow-green-500/25 text-center">
                Начать бесплатно — 7 дней
              </a>
              <a href="#how" className="px-8 py-4 rounded-2xl border border-white/10 text-gray-300 font-semibold hover:bg-white/5 transition text-center">
                Как это работает →
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start text-sm text-gray-500">
              <div><span className="text-white font-bold text-xl">2 мин</span><br />подключение</div>
              <div className="w-px h-8 bg-white/10" />
              <div><span className="text-white font-bold text-xl">0 ₸</span><br />за сообщения</div>
              <div className="w-px h-8 bg-white/10" />
              <div><span className="text-white font-bold text-xl">24/7</span><br />чат-боты</div>
            </div>
          </FadeIn>
        </div>

        {/* Phone mockup */}
        <FadeIn delay={0.3} className="flex-1 flex justify-center">
          <div className="phone-3d">
            <div className="phone-inner relative w-[300px] h-[600px] rounded-[3rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl glow-green">
              <div className="w-full h-full rounded-[2.4rem] bg-[#0b141a] overflow-hidden flex flex-col">
                <div className="bg-[#1f2c33] px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">M</div>
                  <div><div className="text-white text-sm font-semibold">Мой Магазин</div><div className="text-green-400 text-xs">онлайн</div></div>
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-hidden">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                    className="bg-[#1f2c33] rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] text-sm">
                    Привет! Хотите посмотреть каталог?
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                    className="bg-[#005c4b] rounded-xl rounded-tr-sm px-3 py-2 max-w-[75%] ml-auto text-sm">
                    Да, покажите!
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 }}
                    className="bg-[#1f2c33] rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] text-sm">
                    Наши товары:
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}
                    className="bg-[#1f2c33] rounded-xl px-3 py-3 max-w-[90%] text-sm space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-lg">&#x1F45F;</div>
                      <div className="flex-1"><div className="font-semibold text-xs">Nike Air Max</div><div className="text-green-400 text-xs font-bold">45 000 &#8376;</div></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">&#x1F455;</div>
                      <div className="flex-1"><div className="font-semibold text-xs">Oversize Tee</div><div className="text-green-400 text-xs font-bold">8 500 &#8376;</div></div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}
                    className="flex gap-2">
                    <div className="px-3 py-1.5 rounded-full border border-green-500/30 text-green-400 text-xs font-medium">Купить</div>
                    <div className="px-3 py-1.5 rounded-full border border-white/10 text-gray-400 text-xs">Каталог</div>
                    <div className="px-3 py-1.5 rounded-full border border-white/10 text-gray-400 text-xs">Запись</div>
                  </motion.div>
                </div>
              </div>
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
    { value: "3 языка", label: "RU / EN / KZ", desc: "полная локализация" },
  ];
  return (
    <section className="border-y border-white/5 bg-[#080c0c]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1} className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-gradient">{s.value}</div>
            <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
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
    { icon: "\u23F0", text: "Менеджер тратит 4+ часа/день на переписку в WhatsApp" },
    { icon: "\uD83D\uDEAB", text: "Номера банят из-за массовых рассылок" },
    { icon: "\uD83D\uDCCA", text: "Нет аналитики — не видно кто купил, кто ушёл" },
    { icon: "\uD83E\uDD16", text: "Нет автоматизации — каждое сообщение вручную" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Знакомо?</h2>
          <p className="text-gray-400 mt-3 text-lg">Эти проблемы решает Connect</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-red-500/10 bg-red-500/5 hover:border-red-500/20 transition">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-gray-300">{p.text}</span>
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
    { num: "01", title: "Зарегистрируйтесь", desc: "Email + пароль. 10 секунд.", icon: "\uD83D\uDC64" },
    { num: "02", title: "Подключите WhatsApp", desc: "Отсканируйте QR-код с телефона.", icon: "\uD83D\uDCF1" },
    { num: "03", title: "Настройте бизнес", desc: "Добавьте товары, включите бота, запустите рассылку.", icon: "\uD83D\uDE80" },
  ];
  return (
    <section id="how" className="py-20 bg-[#080c0c]">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Начните за 2 минуты</h2>
          <p className="text-gray-400 mt-3 text-lg">Три шага до продаж в WhatsApp</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative p-8 rounded-3xl border border-white/5 bg-[#0d1117] hover:border-green-500/20 transition group">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="text-green-400 font-mono text-sm mb-2">{s.num}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
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
    { icon: "\uD83D\uDECD\uFE0F", title: "Каталог товаров", desc: "Добавляйте товары и услуги. Бот покажет их клиенту в WhatsApp с ценами и кнопками.", color: "from-green-500/10 to-green-600/5", border: "border-green-500/10" },
    { icon: "\uD83D\uDCC5", title: "Запись на приём", desc: "Клиент выбирает дату и время через ссылку. Заявка приходит в дашборд.", color: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/10" },
    { icon: "\uD83D\uDCE2", title: "Рассылки", desc: "Массовая отправка по базе контактов с антибан-защитой и отслеживанием доставки.", color: "from-purple-500/10 to-purple-600/5", border: "border-purple-500/10" },
    { icon: "\uD83E\uDD16", title: "Чат-боты с AI", desc: "OpenAI, Dify, Typebot — подключите умного бота который отвечает 24/7.", color: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/10" },
    { icon: "\uD83D\uDD04", title: "Flow Builder", desc: "Визуальный конструктор сценариев: кнопки, списки, формы, условия — без кода.", color: "from-pink-500/10 to-pink-600/5", border: "border-pink-500/10" },
    { icon: "\uD83D\uDEE1\uFE0F", title: "Антибан-защита", desc: "5 уровней защиты: очередь, задержки, warmup, health monitor, anti-spam.", color: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/10" },
  ];
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Всё для бизнеса в WhatsApp</h2>
          <p className="text-gray-400 mt-3 text-lg">Каталог, запись, рассылки, боты — в одной платформе</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={`p-7 rounded-3xl border ${f.border} bg-gradient-to-br ${f.color} hover:scale-[1.02] transition-all duration-300 h-full`}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// COMPARISON
// ========================

function Comparison() {
  const rows = [
    { feature: "Каталог в WhatsApp", connect: true, aisar: false, wati: "$100+" },
    { feature: "Антибан-защита", connect: true, aisar: false, wati: false },
    { feature: "Flow Builder", connect: true, aisar: false, wati: "базовый" },
    { feature: "AI-боты (OpenAI)", connect: true, aisar: false, wati: "доп" },
    { feature: "Рассылки", connect: true, aisar: true, wati: true },
    { feature: "Запись на приём", connect: true, aisar: false, wati: false },
    { feature: "Интеграций", connect: "17+", aisar: "3", wati: "5" },
    { feature: "RU/KZ локализация", connect: true, aisar: true, wati: false },
    { feature: "Цена от", connect: "$29", aisar: "$30", wati: "$49" },
  ];
  const renderCell = (val: boolean | string) => {
    if (val === true) return <span className="text-green-400 font-bold text-lg">&#10003;</span>;
    if (val === false) return <span className="text-gray-600">&#10007;</span>;
    return <span className="text-gray-300 text-sm">{val}</span>;
  };
  return (
    <section className="py-20 bg-[#080c0c]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Сравнение с конкурентами</h2>
          <p className="text-gray-400 mt-3">Почему выбирают Connect</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-green-500/5">
                  <th className="text-left p-4 text-gray-400 font-medium">Функция</th>
                  <th className="p-4 text-green-400 font-bold">Connect</th>
                  <th className="p-4 text-gray-400 font-medium">AISAR</th>
                  <th className="p-4 text-gray-400 font-medium">WATI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                    <td className="p-4 text-gray-300">{r.feature}</td>
                    <td className="p-4 text-center">{renderCell(r.connect)}</td>
                    <td className="p-4 text-center">{renderCell(r.aisar)}</td>
                    <td className="p-4 text-center">{renderCell(r.wati)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ========================
// PRICING
// ========================

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: "Starter", price: annual ? 24 : 29, period: annual ? "/мес (год)" : "/мес", desc: "Для начинающих",
      features: ["3 WhatsApp-инстанса", "Каталог товаров", "Рассылки", "Антибан-защита", "Поддержка в чате"], cta: "Начать бесплатно", highlighted: false },
    { name: "Pro", price: annual ? 65 : 79, period: annual ? "/мес (год)" : "/мес", desc: "Для растущего бизнеса",
      features: ["10 инстансов", "Всё из Starter", "AI чат-боты (OpenAI)", "Flow Builder", "Запись на приём", "Quick Replies", "Приоритетная поддержка"], cta: "Попробовать Pro", highlighted: true },
    { name: "Business", price: annual ? 165 : 199, period: annual ? "/мес (год)" : "/мес", desc: "Для компаний",
      features: ["50 инстансов", "Всё из Pro", "17+ интеграций", "Команды и роли", "Webhook + RabbitMQ", "Персональный менеджер"], cta: "Связаться", highlighted: false },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Простые цены</h2>
          <p className="text-gray-400 mt-3 text-lg mb-6">7 дней бесплатно на любом плане</p>
          <div className="inline-flex items-center gap-3 bg-white/5 rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${!annual ? "bg-green-500 text-white" : "text-gray-400"}`}>Месяц</button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${annual ? "bg-green-500 text-white" : "text-gray-400"}`}>Год (-17%)</button>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`relative p-8 rounded-3xl border ${p.highlighted ? "border-green-500/30 bg-green-500/5 glow-green" : "border-white/5 bg-[#0d1117]"} flex flex-col h-full`}>
                {p.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold">Популярный</div>}
                <div className="mb-6"><h3 className="text-xl font-bold">{p.name}</h3><p className="text-gray-500 text-sm mt-1">{p.desc}</p></div>
                <div className="mb-6"><span className="text-4xl font-extrabold">${p.price}</span><span className="text-gray-500 text-sm">{p.period}</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm text-gray-300"><span className="text-green-400">&#10003;</span> {f}</li>)}
                </ul>
                <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition ${p.highlighted ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 shadow-lg shadow-green-500/20" : "border border-white/10 text-gray-300 hover:bg-white/5"}`}>{p.cta}</button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// FAQ
// ========================

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Что такое Connect?", a: "Connect — платформа для бизнеса в WhatsApp. Каталог товаров, запись на приём, рассылки, чат-боты и аналитика — всё в одном дашборде." },
    { q: "Могут ли забанить мой номер?", a: "Connect имеет 5-уровневую антибан-систему: очередь сообщений, рандомизированные задержки, 14-дневный warmup, health monitor и anti-spam детектор." },
    { q: "Какие способы подключения?", a: "Два канала: Free Channel (бесплатный, через QR-код) и Business Channel (официальный Meta Business API)." },
    { q: "Работает ли с Казахстаном?", a: "Да! Полная локализация на казахский и русский, поддержка тенге, часовой пояс Asia/Almaty." },
    { q: "Есть ли бесплатный период?", a: "Да, 7 дней бесплатно на любом плане. Никаких ограничений." },
    { q: "Чем отличается от WATI и AISAR?", a: "Антибан (только у нас), каталог бесплатно (WATI берёт $100), 17+ интеграций, flow builder и AI-боты включены." },
  ];
  return (
    <section id="faq" className="py-20 bg-[#080c0c]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold">Частые вопросы</h2></FadeIn>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/5 overflow-hidden">
                <button className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-semibold pr-4">{f.q}</span>
                  <span className={`text-gray-500 transition-transform ${open === i ? "rotate-180" : ""}`}>&#9660;</span>
                </button>
                {open === i && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{f.a}</motion.div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================
// FINAL CTA + FOOTER
// ========================

function FinalCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 text-center glow-green">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Готовы продавать через WhatsApp?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Подключите Connect за 2 минуты. 7 дней бесплатно, без карты.</p>
            <a href="#pricing" className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg hover:from-green-400 hover:to-green-500 transition-all shadow-xl shadow-green-500/25">Начать бесплатно</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-xs">C</div>
          <span className="font-bold">Connect</span>
          <span className="text-gray-600 text-sm ml-2">&copy; 2026</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#features" className="hover:text-white transition">Возможности</a>
          <a href="#pricing" className="hover:text-white transition">Цены</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
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
      <Comparison />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
