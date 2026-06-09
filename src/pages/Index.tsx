import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const DOG_IMG = "https://cdn.poehali.dev/projects/0669d708-9116-4d04-a75f-dfdc64268323/files/ccf4a779-d920-41d5-b769-9dae402c7d0d.jpg";
const VET_IMG = "https://cdn.poehali.dev/projects/0669d708-9116-4d04-a75f-dfdc64268323/files/927f574d-a077-42cd-acac-f7e1d59873c2.jpg";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
};

const benefits = [
  { emoji: "🏥", title: "Любая клиника", desc: "Обращайтесь в любую ветеринарную клинику — государственную или частную." },
  { emoji: "⚡", title: "Выплата за 3 дня", desc: "Подаёте документы онлайн, получаете деньги в течение 72 часов." },
  { emoji: "🛡️", title: "До 300 000 ₽", desc: "Покрытие лечения, операций, анализов и госпитализации." },
  { emoji: "❤️", title: "Без отказов", desc: "Страхуем любые породы от 2 месяцев. Без справок о здоровье." },
  { emoji: "📞", title: "Поддержка 24/7", desc: "Ветеринарная горячая линия для срочных консультаций — бесплатно." },
  { emoji: "💰", title: "От 6 000 ₽/год", desc: "Доступные тарифы для любого бюджета. Оплата раз в год." },
];

const plans = [
  {
    name: "Травмы",
    price: "6 000",
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "",
    items: ["Выплата до 50 000 ₽", "Покрытие травм и несчастных случаев", "Переломы, вывихи, раны", "Горячая линия ветеринара"],
  },
  {
    name: "Травмы + болезни",
    price: "20 000",
    color: "from-orange-50 to-amber-100",
    border: "border-orange-300",
    badge: "Популярный",
    items: ["Выплата до 150 000 ₽", "Покрытие травм и заболеваний", "Диагностика и лечение болезней", "Анализы и обследования", "Горячая линия 24/7"],
  },
  {
    name: "Травмы + острые болезни",
    price: "7 000",
    color: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    badge: "",
    items: ["Выплата до 100 000 ₽", "Покрытие травм", "Острые заболевания", "Экстренная помощь"],
  },
  {
    name: "Всё включено",
    price: "35 000",
    color: "from-teal-50 to-emerald-50",
    border: "border-teal-300",
    badge: "Максимум",
    items: ["Выплата до 300 000 ₽", "Травмы и все заболевания", "Стационарное лечение", "Операции и реабилитация", "Личный куратор 24/7"],
  },
];

const faqs = [
  { q: "С какого возраста можно страховать собаку?", a: "Мы страхуем собак от 2 месяцев до 10 лет. Для питомцев старше 7 лет действует расширенный медицинский осмотр." },
  { q: "Все ли породы принимаются на страхование?", a: "Любые собаки без ограничений по размерам и породностям." },
  { q: "Как быстро начинает действовать страховка?", a: "Полис вступает в силу через 14 дней после оформления. Это стандартный срок ожидания в страховании питомцев." },
  { q: "Что делать, если питомцу потребовалась помощь?", a: "Звоните на горячую линию или обращайтесь в любую ветклинику. После лечения отправляете документы в личном кабинете — выплата в течение 3 дней." },
  { q: "Можно ли оформить страховку онлайн?", a: "Да, полностью онлайн. Заполните анкету, мы свяжемся для уточнения деталей и пришлём полис на email." },
];

const stats = [
  { value: "47 000+", label: "застрахованных собак" },
  { value: "98%", label: "выплат без отказа" },
  { value: "3 дня", label: "средний срок выплаты" },
  { value: "6 лет", label: "на рынке" },
];

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", breed: "", age: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroSection = useInView(0.1);
  const benefitsSection = useInView(0.1);
  const statsSection = useInView(0.1);
  const plansSection = useInView(0.1);
  const faqSection = useInView(0.1);
  const formSection = useInView(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf7f2]/90 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-black text-xl tracking-tight text-[#c45a1a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              У Нас Лапки
            </span>
          </div>
          <a
            href="#form"
            className="bg-[#e8601f] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#c94e0f] transition-all hover:scale-105 shadow-md shadow-orange-200"
          >
            Оформить полис
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: 'linear-gradient(145deg, #fff8f0 0%, #fef3e2 50%, #fde8cb 100%)' }}>
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />

        <div ref={heroSection.ref} className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div className={`pb-16 ${heroSection.inView ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-200 rounded-full px-4 py-2 mb-6 text-sm text-amber-800 font-medium shadow-sm">
                <span>✨</span> Страхование собак №1 в России
              </div>
              <h1 className="text-6xl md:text-7xl font-bold leading-[0.95] mb-6 text-[#1a120a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Ваш пёс<br />
                <em className="text-[#e8601f] not-italic">заслуживает</em><br />
                лучшего
              </h1>
              <p className="text-lg text-[#5a3e2b] max-w-md mb-8 leading-relaxed" style={{ fontFamily: 'Golos Text, sans-serif' }}>
                Лечение собаки может стоить сотни тысяч рублей. Страховка Ингосстрах защитит вашу семью от неожиданных расходов — от 990 ₽ в год.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#form"
                  className="inline-flex items-center justify-center gap-2 bg-[#e8601f] text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#c94e0f] transition-all hover:scale-105 shadow-lg shadow-orange-200"
                >
                  Застраховать собаку
                  <Icon name="ArrowRight" size={18} />
                </a>
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1a120a] px-8 py-4 rounded-2xl text-base font-semibold hover:bg-amber-50 transition-all border border-amber-200"
                >
                  Посмотреть тарифы
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8">
                {["Без справок", "Онлайн за 5 мин", "Любая клиника"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-sm text-[#5a3e2b]">
                    <Icon name="Check" size={15} className="text-emerald-500" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${heroSection.inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              <div className="relative h-[520px] flex items-end justify-center">
                <div className="absolute bottom-0 w-full h-4/5 rounded-t-[3rem] overflow-hidden shadow-2xl">
                  <img src={DOG_IMG} alt="Счастливая собака" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(234,100,30,0.15) 0%, transparent 50%)' }} />
                </div>
                <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl p-4" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <div className="text-2xl font-black text-[#e8601f]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>300 000 ₽</div>
                  <div className="text-xs text-gray-500 mt-0.5">максимальное покрытие</div>
                </div>
                <div className="absolute top-32 left-0 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3" style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a120a]">Выплата одобрена</div>
                    <div className="text-xs text-gray-400">за 2 дня 14 часа</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsSection.ref} className="bg-[#e8601f] py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className={`text-center ${statsSection.inView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-black text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{s.value}</div>
              <div className="text-orange-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 bg-[#faf7f2]">
        <div ref={benefitsSection.ref} className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-14 ${benefitsSection.inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1a120a] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Почему У Нас Лапки?
            </h2>
            <p className="text-[#5a3e2b] text-lg max-w-xl mx-auto">
              Мы создали страховку, которую сами хотели бы иметь для своих питомцев
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`group bg-white rounded-3xl p-7 border border-amber-100 hover:border-orange-200 hover:shadow-xl transition-all cursor-default ${benefitsSection.inView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-orange-50 transition-colors flex items-center justify-center text-2xl mb-5">
                  {b.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#1a120a] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{b.title}</h3>
                <p className="text-[#5a3e2b] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VET IMAGE BREAK */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={VET_IMG} alt="Ветеринар с собакой" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(232,96,31,0.7) 0%, rgba(20,18,10,0.6) 100%)' }}>
          <div className="text-center text-white px-4">
            <p className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              «Лечение рака у собаки обошлось нам в 280 000 ₽.<br className="hidden md:block" /> Страховка покрыла всё.»
            </p>
            <p className="text-orange-200 text-sm">— Мария, владелица лабрадора Бонни</p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 bg-[#faf7f2]">
        <div ref={plansSection.ref} className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-14 ${plansSection.inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1a120a] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Тарифы
            </h2>
            <p className="text-[#5a3e2b] text-lg">Выберите подходящий план защиты для вашего питомца</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-3xl border-2 ${p.border} bg-gradient-to-br ${p.color} p-8 flex flex-col ${i === 3 ? 'shadow-2xl md:scale-105' : 'hover:shadow-lg'} transition-all ${plansSection.inView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {p.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e8601f] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md">
                    {p.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-[#5a3e2b] uppercase tracking-widest mb-2">{p.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-[#1a120a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{p.price}</span>
                    <span className="text-[#5a3e2b] text-sm">₽/год</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#1a120a]">
                      <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#form"
                  className={`block text-center py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 ${i === 3 ? 'bg-[#e8601f] text-white shadow-lg shadow-orange-200' : 'bg-white text-[#e8601f] border-2 border-orange-200 hover:border-orange-300'}`}
                >
                  Выбрать тариф
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div ref={faqSection.ref} className="max-w-3xl mx-auto px-4">
          <div className={`text-center mb-14 ${faqSection.inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1a120a] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border border-amber-100 rounded-2xl overflow-hidden transition-all ${faqSection.inView ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left bg-amber-50/50 hover:bg-amber-50 transition-colors"
                >
                  <span className="font-semibold text-[#1a120a] pr-4">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-orange-400 flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-3 text-[#5a3e2b] text-sm leading-relaxed bg-white animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-20" style={{ background: 'linear-gradient(135deg, #1a120a 0%, #2d1b0e 50%, #3d2210 100%)' }}>
        <div ref={formSection.ref} className="max-w-xl mx-auto px-4">
          {!submitted ? (
            <div className={`${formSection.inView ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="text-center mb-10">
                <div className="text-4xl mb-4">🐾</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Оформить полис
                </h2>
                <p className="text-amber-200 text-base">
                  Заполните анкету — наш специалист свяжется с вами в течение 15 минут
                </p>
              </div>
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 900 000-00-00"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">Порода собаки</label>
                  <input
                    type="text"
                    placeholder="Лабрадор, хаски, двортерьер..."
                    value={form.breed}
                    onChange={e => setForm({ ...form, breed: e.target.value })}
                    className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">Возраст собаки</label>
                  <select
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all text-sm appearance-none"
                  >
                    <option value="" className="bg-[#2d1b0e]">Выберите возраст</option>
                    <option value="puppy" className="bg-[#2d1b0e]">Щенок (до 1 года)</option>
                    <option value="1-3" className="bg-[#2d1b0e]">1–3 года</option>
                    <option value="3-7" className="bg-[#2d1b0e]">3–7 лет</option>
                    <option value="7+" className="bg-[#2d1b0e]">Старше 7 лет</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e8601f] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#c94e0f] transition-all hover:scale-105 shadow-lg shadow-orange-900/30 mt-2"
                >
                  Получить расчёт бесплатно →
                </button>
                <p className="text-center text-white/40 text-xs">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="text-6xl mb-6">🐶</div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Заявка принята!
              </h2>
              <p className="text-amber-200 text-lg mb-2">
                Спасибо, {form.name || "дорогой друг"}!
              </p>
              <p className="text-white/60 text-base">
                Наш специалист свяжется с вами по номеру {form.phone} в течение 15 минут.
              </p>
              <div className="mt-8 inline-block bg-white/10 rounded-2xl px-6 py-4 border border-white/20">
                <p className="text-amber-200 text-sm">🎁 За оформление сегодня — <strong className="text-white">первый месяц в подарок</strong></p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a120a] py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-black text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>У Нас Лапки</span>
            <span className="text-white/30 text-sm ml-2">© 2024</span>
          </div>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white/80 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/80 transition-colors">Оферта</a>
            <a href="tel:+78001234567" className="hover:text-white/80 transition-colors">8 800 123-45-67</a>
          </div>
        </div>
      </footer>
    </div>
  );
}