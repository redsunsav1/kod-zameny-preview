import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = process.argv[2] || "/tmp/kz-live.html";
const html = fs.readFileSync(sourcePath, "utf8");
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
const mainMatch = html.match(/<main[^>]*>[\s\S]*?<\/main>/);

if (!mainMatch) throw new Error("Rendered <main> was not found");

const main = mainMatch[0]
  .replaceAll("<!-- -->", "")
  .replaceAll('src="/images/', 'src="./images/')
  .replace(/class="([^"]*\breveal\b[^"]*)"/g, 'class="$1 is-visible"');

const output = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Код замены — живая лекция Тины Канделаки в Ростове-на-Дону</title>
  <meta name="description" content="Офлайн-лекция Тины Канделаки о культурных подменах. Оставьте заявку на участие.">
  <meta property="og:title" content="Код замены — живая лекция в Ростове-на-Дону">
  <meta property="og:description" content="Тина Канделаки. Один вечер, два лекционных блока и живой разговор.">
  <meta property="og:image" content="./og.png">
  <style>${css}</style>
</head>
<body>
${main}
<script>
  setTimeout(() => document.querySelector('main')?.classList.add('site-ready'), 1650);
  const hero = document.querySelector('.hero');
  const nav = document.querySelector('.sticky-nav');
  const updateNav = () => nav?.classList.toggle('is-shown', scrollY > (hero?.offsetHeight || 600) * .75);
  addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const willOpen = !item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach((row) => {
        row.classList.remove('is-open');
        row.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelector('.application-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.outerHTML = '<div class="form-success" role="status"><span class="stamp">ЗАЯВКА ПРИНЯТА</span><h3>Вы в списке<br>ожидания</h3><p>Мы свяжемся с вами, когда дата и площадка будут подтверждены.</p></div>';
  });
</script>
</body>
</html>`;

const docs = path.join(root, "docs");
fs.mkdirSync(docs, { recursive: true });
fs.writeFileSync(path.join(docs, "index.html"), output);
fs.copyFileSync(path.join(root, "public/og.png"), path.join(docs, "og.png"));
fs.cpSync(path.join(root, "public/images"), path.join(docs, "images"), { recursive: true });
fs.writeFileSync(path.join(docs, ".nojekyll"), "");
