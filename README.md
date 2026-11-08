# PromSafe 2.0

Корпоративный многостраничный сайт PromSafe на Next.js.

## Что это

Проект заменяет концепцию длинного лендинга на масштабируемый сайт: услуги, отраслевые решения, калькулятор, база знаний и бесплатные материалы.

## Стек

- Next.js 15 – страницы и серверные API.
- React 19 – интерактивные компоненты.
- TypeScript – типизированный код.
- Bitrix24 – будущая CRM для заявок.
- Docker – переносимый способ запуска на staging/production хостинге.

## Основные маршруты

- `/`
- `/services`
- `/services/[slug]`
- `/solutions`
- `/solutions/production`
- `/calculator`
- `/knowledge`
- `/knowledge/[slug]`
- `/resources`
- `/resources/git-checklist`
- `/contacts`
- `/api/lead`
- `/api/health`

## Локальный запуск

```bash
cp .env.example .env.local
npm install
npm run dev
```

Открыть `http://localhost:3000`.

## Staging

Безопасные значения:

```env
NEXT_PUBLIC_SITE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://<staging-domain>
EXTERNAL_WRITES_ENABLED=false
CRM_WEBHOOK_URL=
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

При таком режиме форма не пишет в Bitrix24, staging закрыт от индексации.

Подробнее: `STAGING.md` и `DEPLOYMENT.md`.

## Production

Перед production нужно отдельно завершить:

1. реальные фирменные assets;
2. финальный контент и юридическую проверку статей;
3. ценовую формулу калькулятора;
4. Bitrix24;
5. consent/cookie и Яндекс Метрику;
6. политику персональных данных и согласия;
7. выбор production-хостинга с учётом требований РФ;
8. SEO-миграцию старого `promsafe.ru` и 301-редиректы.


## Design freeze V6

В код перенесена утверждённая дизайн-версия V6: встроенный калькулятор на главной, повышенный контраст, выделенная кнопка «Контакты», усиленная типографика содержания статей, активная статья о документах и рабочее скачивание demo PDF.

## Фирменные материалы

Оригинальный логотип компании подключён как `public/promsafe-logo-original.png` и используется через компонент `components/CompanyLogo.tsx`. Вертикальный исходник сохранён без изменения композиции. В шапке пока оставлена компактная текстовая версия бренда – для неё желательно получить отдельный горизонтальный логотип/wordmark.

## Public-content milestone — 16.09.2026

Добавлены подтверждаемые из открытых источников данные: полный каталог основных услуг, страница «О компании», отраслевые страницы, пять материалов базы знаний со ссылками на Роструд и готовый чек-лист подготовки к проверке ГИТ. Неподтверждённые цены, кейсы и коммерческие гарантии намеренно не публикуются.

## SEO checkpoint V6 – 18.09.2026

Добавлены уникальные metadata/canonical, Open Graph, структурированные данные Organization/WebSite/Service, локальный фокус Москва + МО, внутренняя перелинковка и обновлённые sitemap/robots. Подробности: `SEO_IMPLEMENTATION_STATUS.md`, карта: `SEO_MAP_V2.csv`, очередь контента: `SEO_CONTENT_PLAN.csv`.
