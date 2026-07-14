"use client";

import { useEffect, useState } from "react";

const LINKS = {
  site: "https://example.com/buy?utm_source=landing&utm_medium=site",
  platform: "https://example.com/platform?utm_source=landing&utm_medium=platform",
  telegram: "https://t.me/example?utm_source=landing&utm_medium=telegram",
  socialTelegram: "https://t.me/example",
  socialInstagram: "https://instagram.com/example",
  socialVk: "https://vk.com/example",
};

const faq = [
  ["Когда я получу доступ?", "Сразу после оплаты: письмо со ссылкой и инструкцией придёт на указанную почту в течение пяти минут."],
  ["Как долго открыт курс?", "Записи останутся доступны в личном кабинете в течение 12 месяцев с момента покупки."],
  ["Можно смотреть в записи?", "Да. Обе лекции записаны в высоком качестве, их можно смотреть в удобное время с любого устройства."],
  ["На какой платформе проходит обучение?", "Курс размещён на защищённой образовательной платформе. Для входа понадобится только email."],
  ["Есть ли дополнительные материалы?", "В расширенном тарифе — конспекты, список источников и визуальная хронология ключевых подмен."],
  ["Можно вернуть оплату?", "Да, в порядке и сроки, указанные в публичной оферте. Напишите менеджеру — он поможет оформить обращение."],
];

function track(goal: string) {
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[]; ym?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: goal });
  if (typeof w.ym === "function") w.ym(0, "reachGoal", goal);
}

function Stamp({ children, pale = false }: { children: React.ReactNode; pale?: boolean }) {
  return <span className={`stamp ${pale ? "stamp--pale" : ""}`}>{children}</span>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

    const hero = document.querySelector(".hero");
    const nav = document.querySelector(".sticky-nav");
    const navObserver = hero && nav ? new IntersectionObserver(([entry]) => nav.classList.toggle("is-shown", !entry.isIntersecting), { threshold: 0.1 }) : null;
    if (hero && navObserver) navObserver.observe(hero);
    return () => { reveal.disconnect(); navObserver?.disconnect(); };
  }, []);

  return (
    <main>
      <nav className="sticky-nav" aria-label="Навигация по странице">
        <a href="#top" className="nav-logo">КОД ЗАМЕНЫ</a>
        <div className="nav-links">
          <a href="#program">Программа</a><a href="#author">Автор</a><a href="#access">Доступ</a>
        </div>
        <a className="mini-cta" href="#tariffs">ПОЛУЧИТЬ ДОСТУП</a>
      </nav>

      <header className="hero" id="top">
        <div className="hero-paper">
          <div className="inventory">
            <span><i>ИНВ. НОМЕР</i>01–2026–КЗ</span>
            <span><i>КАТЕГОРИЯ</i>КУЛЬТУРА</span>
            <span><i>ХРАНЕНИЕ</i>ПОСТОЯННО</span>
            <span><i>ЛИСТОВ</i>02</span>
            <span><i>ФОРМА</i>КЗ–ЛК</span>
            <span><i>ДАТА ЗАВЕДЕНИЯ</i>2026</span>
          </div>
          <div className="hero-grid">
            <div className="hero-main">
              <p className="eyebrow">АРХИВ КУЛЬТУРНЫХ ПОДМЕН / ЛЕКЦИОННЫЙ КУРС</p>
              <h1 className="glitch" data-text="КОД ЗАМЕНЫ">КОД<br />ЗАМЕНЫ</h1>
              <p className="hero-lead">Лекционный курс Тины Канделаки</p>
            </div>
            <div className="hero-aside" aria-hidden="true">
              <span>АРХИВНАЯ КОПИЯ</span><b>КЗ</b><span>ФОНД 01 / ОПИСЬ 26</span>
            </div>
          </div>
          <div className="replacement" aria-label="искусство заменено алгоритмом, история — сценарием, выбор — кодом">
            <span><s>искусство</s> алгоритм</span><i>·</i><span><s>история</s> сценарий</span><i>·</i><span><s>выбор</s> код</span>
          </div>
          <div className="hero-bottom">
            <a className="cta" href="#tariffs" onClick={() => track("cta_hero")}>ПОЛУЧИТЬ ДОСТУП <span>↘</span></a>
            <p>2 лекции<br />доступ сразу после оплаты</p>
          </div>
          <div className="hero-stamp"><Stamp>ЗАМЕНЕНО</Stamp></div>
        </div>
      </header>

      <section className="manifest section" id="manifest">
        <div className="section-code">ЛИСТ 02 / МАНИФЕСТ</div>
        <div className="manifest-sheet reveal">
          <p className="margin-note">ПОМЕТКА:<br />ЧИТАТЬ<br />ВНИМАТЕЛЬНО</p>
          <div>
            <h2>Мы живём в мире,<br />подчинённом <em>алгоритмам</em></h2>
            <div className="manifest-copy">
              <p>Они решают за нас, что нам нравится, что считать красивым, кому верить и что помнить. Мы называем это выбором — но всё чаще выбираем лишь из того, что нам показали.</p>
              <p>Уродливое становится прекрасным. Святое — низменным. История превращается в сценарий, написанный теми, кому выгодно наше беспамятство.</p>
              <p className="manifest-big">Это не случайность.<br />Это <span>код замены</span>.</p>
              <p>Матрица, к которой нас подключают без согласия. Чтобы выйти из неё, сначала нужно увидеть швы.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="program section" id="program">
        <div className="section-head reveal"><div><p className="section-code">РАЗДЕЛ 03 / ОПИСЬ ДЕЛА</p><h2>Два тома.<br />Одна система.</h2></div><Stamp>РАССЕКРЕЧЕНО</Stamp></div>
        <div className="volumes">
          <article className="volume reveal">
            <span className="volume-number">I</span><div className="fold" />
            <p className="eyebrow">ТОМ I · ЭСТЕТИКА</p><h3>Красота<br />и уродство</h3>
            <p className="volume-lead">Как за 70 лет символ красоты стал символом распада.</p>
            <ul><li>9 версий «Тайной вечери» — от классики до Олимпиады-2024</li><li>Де Кунинг и рынок, где уродливое стоит сотни миллионов</li><li>Механика превращения уродливого в модное</li></ul>
            <p className="duration">ХРОНОМЕТРАЖ · ~1,5 ЧАСА</p>
          </article>
          <article className="volume reveal">
            <span className="volume-number">II</span><div className="fold" />
            <p className="eyebrow">ТОМ II · ИСТОРИЯ</p><h3>Фальсификация<br />истории</h3>
            <p className="volume-lead">Как переписывают биографии, эпохи и наше представление о себе.</p>
            <ul><li>Иван Грозный: рождение образа кровавого тирана</li><li>Екатерина Великая и чужие легенды о русской власти</li><li>Маргарет Тэтчер: кто и зачем редактирует прошлое</li></ul>
            <p className="duration">ХРОНОМЕТРАЖ · ~1,5 ЧАСА</p>
          </article>
        </div>
      </section>

      <section className="author section" id="author">
        <p className="section-code">РАЗДЕЛ 04 / ЛИЧНОЕ ДЕЛО</p>
        <div className="profile reveal">
          <div className="portrait" role="img" aria-label="Место для портрета Тины Канделаки">
            <div className="portrait-lines" /><span>ФОТОГРАФИЯ<br />БУДЕТ ДОБАВЛЕНА</span><small>АРХИВ · 2026</small>
          </div>
          <div className="dossier">
            <div className="dossier-row"><span>ФАМИЛИЯ</span><b>Канделаки</b></div>
            <div className="dossier-row"><span>ИМЯ</span><b>Тина</b></div>
            <div className="dossier-row"><span>РОД ЗАНЯТИЙ</span><b>Журналист, продюсер, автор</b></div>
            <div className="dossier-row"><span>СПЕЦИАЛИЗАЦИЯ</span><b>Медиа, культура, общество</b></div>
            <p className="bio">Более двадцати лет Тина Канделаки работает внутри медиасистемы — там, где создаются образы, смыслы и массовые представления. В этом курсе она разбирает механику подмен не как сторонний наблюдатель, а как человек, знающий устройство индустрии изнутри.</p>
            <blockquote>«Чтобы защитить свой выбор, нужно сначала понять, кто и как пытается сделать его за тебя».</blockquote>
          </div>
        </div>
      </section>

      <section className="admission section" id="access">
        <div className="section-head reveal"><div><p className="section-code">РАЗДЕЛ 05 / ДОПУСК К ДЕЛУ</p><h2>Вам сюда,<br />если вы…</h2></div></div>
        <div className="passes">
          {[
            ["01", "Устали от навязанных смыслов и готовых ответов"],
            ["02", "Хотите видеть механику культурных подмен"],
            ["03", "Интересуетесь искусством без учебникового глянца"],
            ["04", "Предпочитаете неудобные вопросы удобной правде"],
          ].map(([n, text]) => <article className="pass reveal" key={n}><p>ДОПУСК № {n}</p><span>{text}</span><small>ПРОВЕРЕНО / КЗ</small></article>)}
        </div>
      </section>

      <section className="tariffs section" id="tariffs">
        <div className="section-head reveal"><div><p className="section-code">РАЗДЕЛ 06 / УСЛОВИЯ ДОСТУПА</p><h2>Выберите<br />уровень допуска</h2></div><p className="head-note">Доступ к материалам<br />сразу после оплаты</p></div>
        <div className="tariff-grid">
          <article className="tariff reveal"><p className="eyebrow">ДОПУСК · БАЗОВЫЙ</p><h3>Слушатель</h3><div className="price">4 900 <small>₽</small></div><ul><li>Две лекции в записи</li><li>Доступ на 12 месяцев</li><li>Список источников</li></ul><a href={LINKS.site} onClick={() => track("cta_tariff_site")}>ОПЛАТИТЬ НА САЙТЕ</a></article>
          <article className="tariff tariff--featured reveal"><Stamp>РЕКОМЕНДОВАНО</Stamp><p className="eyebrow">ДОПУСК · РАСШИРЕННЫЙ</p><h3>Исследователь</h3><div className="price">7 900 <small>₽</small></div><ul><li>Всё из базового тарифа</li><li>Авторские конспекты</li><li>Визуальная хронология</li><li>Дополнительные материалы</li></ul><a href={LINKS.platform} onClick={() => track("cta_tariff_platform")}>ОПЛАТИТЬ НА ПЛАТФОРМЕ</a></article>
          <article className="tariff reveal"><p className="eyebrow">ДОПУСК · ПЕРСОНАЛЬНЫЙ</p><h3>Соучастник</h3><div className="price">ПО ЗАПРОСУ</div><ul><li>Полный пакет материалов</li><li>Закрытая встреча</li><li>Приоритетная поддержка</li></ul><a href={LINKS.telegram} onClick={() => track("cta_tariff_tg")}>НАПИСАТЬ МЕНЕДЖЕРУ</a></article>
        </div>
        <p className="delivery-note">ДОСТУП ПРИХОДИТ НА ПОЧТУ В ТЕЧЕНИЕ 5 МИНУТ</p>
      </section>

      <section className="faq section">
        <p className="section-code">РАЗДЕЛ 07 / ПРИМЕЧАНИЯ К ДЕЛУ</p><h2 className="reveal">Вопросы,<br />оставшиеся на полях</h2>
        <div className="faq-list reveal">
          {faq.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? "is-open" : ""}`} key={q}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{String(i + 1).padStart(2, "0")}</span><b>{q}</b><i /></button>
            <div className="faq-answer"><p>{a}</p></div>
          </div>)}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-inner reveal"><p className="section-code">ЗАКЛЮЧЕНИЕ / ДЕЛО НЕ ЗАКРЫТО</p><h2>Код можно<br /><em>переписать.</em></h2><p>Начните с себя.</p><a className="cta" href="#tariffs" onClick={() => track("cta_final")}>ПОЛУЧИТЬ ДОСТУП <span>↘</span></a><div className="signature">ДЕЛО № 01/2026 · ПОДПИСАНО: Т. КАНДЕЛАКИ</div></div>
      </section>

      <footer>
        <a className="footer-logo" href="#top">КОД<br />ЗАМЕНЫ</a>
        <div><p>КАНАЛЫ СВЯЗИ</p><a href={LINKS.socialTelegram}>TELEGRAM ↗</a><a href={LINKS.socialInstagram}>INSTAGRAM* ↗</a><a href={LINKS.socialVk}>VK ↗</a></div>
        <div><p>ДОКУМЕНТЫ</p><a href="#">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a><a href="#">ПУБЛИЧНАЯ ОФЕРТА</a><a href="#">ИП · РЕКВИЗИТЫ</a></div>
        <div className="copyright">© 2026 · ВСЕ ПРАВА ЗАЩИЩЕНЫ<br /><small>* ПРИНАДЛЕЖИТ META, ПРИЗНАННОЙ ЭКСТРЕМИСТСКОЙ ОРГАНИЗАЦИЕЙ И ЗАПРЕЩЁННОЙ В РФ.</small></div>
      </footer>

      {/* Yandex.Metrika: вставьте код счётчика здесь */}
    </main>
  );
}
