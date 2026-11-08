# PromSafe – технический контроль качества V8.1

Дата: 8 ноября 2026. Исходник: V8, совпадающий по контенту с опубликованным Railway.

## Сделано и проверено

- [x] Изучены текущие Railway сервис, публичные страницы и метаданные (по состоянию на 8 ноября).
- [x] Зафиксированы последние успешные deployment и среда `production` в Railway.
- [x] Исходник обновлён до Next.js 15.5.29 и React 19.1.10 – исправленные версии согласно публичным advisories.
- [x] Введён fail-closed SEO guard (`SITE_INDEXING_APPROVED`); staging остаётся noindex.
- [x] Добавлен 301 redirect для известного исторического URL `/socialaudit`.
- [x] Добавлена русская 404, иконки из официального логотипа и клавиатурное закрытие мобильного меню.
- [x] API безопаснее обрабатывает размер тела запроса, JSON, поля контакта, Origin, таймаут и ответ Bitrix24.
- [x] Код API протестирован 10 сценариями, с замоканным CRM (не с реальным Bitrix24).
- [x] Статическая проверка: 32 маршрута, 60 буквальных внутренних ссылок, SEO покрытие сервисов/статей.
- [x] Синтаксический разбор TypeScript/TSX: 29 файлов, 0 ошибок.

## Не пройдено и не должно называться проверенным

- [ ] `npm install`, `npm run typecheck` и `npm run build` для новых версий зависимостей: реестр npm недоступен из этой среды.
- [ ] Browser QA в живой новой сборке: desktop, mobile, клавиатурная доступность, формы и Core Web Vitals.
- [ ] Действующий Railway ещё не обновлён (V8 продолжает работать).
- [ ] Полный исходный код GitHub пока не синхронизирован; в репозитории он частично лежит в подпапке, и корневые `package.json`/`Dockerfile` отсутствуют.
- [ ] Данные CRM/реальные заявки не проверены. Форма должна оставаться выключенной до согласования юридических требований и CRM.
- [ ] Индексация на основном домене, карта редиректов со всех старых страниц, Метрика и Вебмастер требуют отдельного запуска после согласования контента.

## Проверка на Windows перед деплоем

```powershell
npm install
npm run qa
npm audit --omit=dev --audit-level=high
npm run typecheck
npm run build
npm run dev
```

В другом терминале: `npm run smoke -- http://localhost:3000`. После релиза: `npm run smoke -- https://promsafe-site-production.up.railway.app`.

Полный безопасный сценарий из VS Code: `powershell -ExecutionPolicy Bypass -File .\scripts\deploy-railway.ps1`. Он проверяет зависимости и сборку, спрашивает финальное согласие перед `railway up` и **не меняет** домен и индексацию.

## Официальные источники по обновлению

- https://github.com/vercel/next.js/releases/tag/v15.5.29
- https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3
- https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

## Синхронизация GitHub без риска потерять текущую V8

Команда `powershell -ExecutionPolicy Bypass -File .\scripts\sync-github.ps1` создаёт отдельную ветку `promsafe-v8-1-tech-*` и передаёт полный исходный код. Старая ветка `main` не изменяется до проверки CI и сознательного принятия изменений.
