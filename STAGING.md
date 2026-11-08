# PromSafe staging

## Что такое staging
Staging – тестовая интернет-версия сайта. Она нужна, чтобы проверять изменения до публикации на promsafe.ru.

## Безопасные настройки по умолчанию

```env
NEXT_PUBLIC_SITE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://<staging-domain>
EXTERNAL_WRITES_ENABLED=false
CRM_WEBHOOK_URL=
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

При `EXTERNAL_WRITES_ENABLED=false` форма проходит весь пользовательский сценарий, но API не вызывает Bitrix24. Ответ помечается как `dry_run`.

Staging также закрыт от поисковой индексации через `robots.txt` и metadata robots.

## Проверка после деплоя

1. Открыть `/api/health` – должно быть `ok: true`, `env: staging`, `externalWrites: false`.
2. Проверить desktop и mobile меню.
3. Пройти калькулятор до конца.
4. Отправить тестовую форму – на странице должно появиться сообщение, что заявка тестовая и в CRM не отправлена.
5. Открыть `/robots.txt` – должен быть запрет индексации.
6. Не добавлять реальный `CRM_WEBHOOK_URL` до отдельного теста CRM.

## Включение Bitrix24 позже

Только после проверки webhook:

```env
EXTERNAL_WRITES_ENABLED=true
CRM_WEBHOOK_URL=https://...
```

Секрет webhook никогда не коммитится в Git.
