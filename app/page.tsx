"use client";

import { useEffect, useState } from "react";

const LINKS = {
  telegram: "https://t.me/example?utm_source=landing&utm_medium=event",
  socialTelegram: "https://t.me/example",
  socialInstagram: "https://instagram.com/example",
  socialVk: "https://vk.com/example",
};

const faq = [
  ["Как попасть на мероприятие?", "Оставьте заявку на сайте. Менеджер свяжется с вами, подтвердит наличие мест и расскажет об условиях участия."],
  ["Где пройдёт встреча?", "В Ростове-на-Дону. Точную площадку и схему проезда мы отправим подтверждённым участникам отдельным письмом."],
  ["Когда состоится лекция?", "Дата согласовывается. После заявки вы первыми получите приглашение с датой, временем и адресом события."],
  ["Можно прийти вдвоём?", "Да. Укажите двух гостей в заявке или сообщите менеджеру, что хотите забронировать два места рядом."],
  ["Будет ли запись?", "Это живое офлайн-событие. Публикация полной записи не планируется — ценность встречи в присутствии и обсуждении."],
  ["Что входит в участие?", "Два лекционных блока, перерыв, сессия вопросов и ответов и комплект материалов участника."],
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
  const [submitted, setSubmitted] = useState(false);

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
          <a href="#program">Программа</a><a href="#author">Автор</a><a href="#access">Для кого</a>
        </div>
        <a className="mini-cta" href="#application">ОСТАВИТЬ ЗАЯВКУ</a>
      </nav>

      <header className="hero" id="top">
        <div className="hero-paper">
          <div className="inventory">
            <span><i>ИНВ. НОМЕР</i>01–2026–КЗ</span>
            <span><i>КАТЕГОРИЯ</i>КУЛЬТУРА</span>
            <span><i>ГОРОД</i>РОСТОВ-НА-ДОНУ</span>
            <span><i>МЕСТ</i>ОГРАНИЧЕНО</span>
            <span><i>ФОРМАТ</i>ОФЛАЙН</span>
            <span><i>СТАТУС</i>ПРИЁМ ЗАЯВОК</span>
          </div>
          <div className="hero-grid">
            <div className="hero-main">
              <p className="eyebrow">АРХИВ КУЛЬТУРНЫХ ПОДМЕН / ЖИВАЯ ЛЕКЦИЯ</p>
              <h1 className="title-reveal" aria-label="Код замены"><span data-text="КОД">КОД</span><span data-text="ЗАМЕНЫ">ЗАМЕНЫ</span></h1>
              <p className="hero-lead">Тина Канделаки · Ростов-на-Дону · офлайн</p>
            </div>
            <div className="hero-aside" aria-hidden="true">
              <span>АРХИВНАЯ КОПИЯ</span><b>КЗ</b><span>ФОНД 01 / ОПИСЬ 26</span>
            </div>
          </div>
          <div className="replacement" aria-label="искусство заменено алгоритмом, история — сценарием, выбор — кодом">
            <span><s>искусство</s> алгоритм</span><i>·</i><span><s>история</s> сценарий</span><i>·</i><span><s>выбор</s> код</span>
          </div>
          <div className="hero-bottom">
            <a className="cta" href="#application" onClick={() => track("cta_hero")}>ОСТАВИТЬ ЗАЯВКУ <span>↘</span></a>
            <p>Один вечер · два блока<br />количество мест ограничено</p>
          </div>
          <div className="hero-stamp"><Stamp>ЗАМЕНЕНО</Stamp></div>
        </div>
      </header>

      <section className="event-bar" aria-label="Главная информация о событии">
        <div><span>ГОРОД</span><strong>Ростов-на-Дону</strong></div>
        <div><span>ФОРМАТ</span><strong>Живая лекция</strong></div>
        <div><span>ПРОДОЛЖИТЕЛЬНОСТЬ</span><strong>Около 3 часов</strong></div>
        <div><span>УЧАСТИЕ</span><strong>По заявке</strong></div>
      </section>

      <section className="manifest section" id="manifest">
        <div className="section-code">ЛИСТ 02 / МАНИФЕСТ</div>
        <div className="manifest-sheet reveal">
          <p className="margin-note">ПОМЕТКА:<br />ЧИТАТЬ<br />ВНИМАТЕЛЬНО</p>
          <h2>Мы живём в мире,<br />подчинённом <em>алгоритмам</em></h2>
          <div className="manifest-copy">
            <p>Они решают за нас, что нам нравится, что считать красивым, кому верить и что помнить. Мы называем это выбором — но всё чаще выбираем лишь из того, что нам показали.</p>
            <p>Уродливое становится прекрасным. Святое — низменным. История превращается в сценарий, написанный теми, кому выгодно наше беспамятство.</p>
            <p className="manifest-big">Это не случайность.<br />Это <span>код замены</span>.</p>
            <p>Матрица, к которой нас подключают без согласия. Чтобы выйти из неё, сначала нужно увидеть швы.</p>
          </div>
        </div>
      </section>

      <section className="program section" id="program">
        <div className="section-head reveal"><div><p className="section-code">РАЗДЕЛ 03 / ПРОГРАММА ВЕЧЕРА</p><h2>Два акта.<br />Один разговор.</h2></div><Stamp>ЖИВОЕ СОБЫТИЕ</Stamp></div>
        <div className="volumes">
          <article className="volume reveal">
            <span className="volume-number">I</span><div className="fold" />
            <p className="eyebrow">АКТ I · ЭСТЕТИКА</p><h3>Красота<br />и уродство</h3>
            <p className="volume-lead">Как за 70 лет символ красоты стал символом распада.</p>
            <ul><li>9 версий «Тайной вечери» — от классики до Олимпиады-2024</li><li>Де Кунинг и рынок, где уродливое стоит сотни миллионов</li><li>Механика превращения уродливого в модное</li></ul>
            <p className="duration">ЖИВАЯ ЛЕКЦИЯ · ~60 МИНУТ</p>
          </article>
          <article className="volume reveal">
            <span className="volume-number">II</span><div className="fold" />
            <p className="eyebrow">АКТ II · ИСТОРИЯ</p><h3>Фальсификация<br />истории</h3>
            <p className="volume-lead">Как переписывают биографии, эпохи и наше представление о себе.</p>
            <ul><li>Иван Грозный: рождение образа кровавого тирана</li><li>Екатерина Великая и чужие легенды о русской власти</li><li>Маргарет Тэтчер: кто и зачем редактирует прошлое</li></ul>
            <p className="duration">ЛЕКЦИЯ + ВОПРОСЫ · ~75 МИНУТ</p>
          </article>
        </div>
        <div className="program-cta reveal"><div><p className="eyebrow">ОДИН ВЕЧЕР · ЖИВОЙ РАЗГОВОР</p><strong>Продолжим обсуждение после лекции на сессии вопросов и ответов.</strong></div><a className="cta" href="#application" onClick={() => track("cta_program")}>ОСТАВИТЬ ЗАЯВКУ <span>↘</span></a></div>
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
            <p className="bio">Более двадцати лет Тина Канделаки работает внутри медиасистемы — там, где создаются образы, смыслы и массовые представления. На живой встрече она разбирает механику подмен не как сторонний наблюдатель, а как человек, знающий устройство индустрии изнутри.</p>
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

      <section className="application section" id="application">
        <div className="section-head reveal"><div><p className="section-code">РАЗДЕЛ 06 / ЗАЯВКА НА УЧАСТИЕ</p><h2>Получить<br />приглашение</h2></div><Stamp>РОСТОВ-НА-ДОНУ</Stamp></div>
        <div className="application-layout reveal">
          <div className="event-brief">
            <p className="eyebrow">КАРТОЧКА СОБЫТИЯ</p>
            <dl>
              <div><dt>ФОРМАТ</dt><dd>Живая лекция</dd></div>
              <div><dt>ГОРОД</dt><dd>Ростов-на-Дону</dd></div>
              <div><dt>ДАТА</dt><dd>Будет объявлена</dd></div>
              <div><dt>ПРОДОЛЖИТЕЛЬНОСТЬ</dt><dd>Около 3 часов</dd></div>
              <div><dt>УЧАСТИЕ</dt><dd>По предварительной заявке</dd></div>
            </dl>
            <p className="event-note">После заявки менеджер подтвердит наличие мест и отправит детали события.</p>
          </div>
          {submitted ? (
            <div className="form-success" role="status"><Stamp>ЗАЯВКА ПРИНЯТА</Stamp><h3>Вы в списке<br />ожидания</h3><p>Мы свяжемся с вами, когда дата и площадка будут подтверждены.</p></div>
          ) : (
            <form className="application-form" onSubmit={(event) => { event.preventDefault(); track("application_submit"); setSubmitted(true); }}>
              <label className="field"><span>ИМЯ И ФАМИЛИЯ</span><input name="name" autoComplete="name" required placeholder="Как к вам обращаться" /></label>
              <label className="field"><span>ТЕЛЕФОН</span><input name="phone" type="tel" autoComplete="tel" required placeholder="+7 900 000-00-00" /></label>
              <label className="field"><span>ЭЛЕКТРОННАЯ ПОЧТА</span><input name="email" type="email" autoComplete="email" required placeholder="name@example.ru" /></label>
              <label className="field"><span>КОЛИЧЕСТВО ГОСТЕЙ</span><select name="guests" defaultValue="1"><option value="1">Одно место</option><option value="2">Два места</option></select></label>
              <label className="consent"><input type="checkbox" required /><span>Согласен с политикой конфиденциальности и обработкой персональных данных</span></label>
              <button className="form-submit" type="submit">ОТПРАВИТЬ ЗАЯВКУ <span>↘</span></button>
              <p className="form-meta">ЗАЯВКА НЕ ЯВЛЯЕТСЯ ОПЛАТОЙ · МЕНЕДЖЕР СВЯЖЕТСЯ С ВАМИ</p>
            </form>
          )}
        </div>
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
        <div className="final-inner reveal"><p className="section-code">РОСТОВ-НА-ДОНУ / ЖИВАЯ ВСТРЕЧА</p><h2>Увидеть.<br /><em>Обсудить.</em></h2><p>Присоединяйтесь к разговору.</p><a className="cta" href="#application" onClick={() => track("cta_final")}>ОСТАВИТЬ ЗАЯВКУ <span>↘</span></a><div className="signature">ДЕЛО № 01/2026 · КОЛИЧЕСТВО МЕСТ ОГРАНИЧЕНО</div></div>
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
