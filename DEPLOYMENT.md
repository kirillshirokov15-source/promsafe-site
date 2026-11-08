# Deployment architecture

## Сейчас

Browser → Next.js → `/api/lead` → dry-run

Внешние записи отключены.

## После подключения CRM

Browser → Next.js → `/api/lead` → Bitrix24

## Production

Для публичного `promsafe.ru` хостинг и хранение персональных данных нужно финально выбрать с учётом требований РФ к локализации персональных данных. Dockerfile не привязывает приложение к одному провайдеру: его можно развернуть на совместимом российском облаке.

## Переменные окружения

- `NEXT_PUBLIC_SITE_ENV` – режим сайта: local/staging/production.
- `NEXT_PUBLIC_SITE_URL` – публичный адрес текущего окружения.
- `EXTERNAL_WRITES_ENABLED` – разрешает или запрещает отправку данных во внешние системы.
- `CRM_WEBHOOK_URL` – секретный webhook Bitrix24.
- `NEXT_PUBLIC_ANALYTICS_ENABLED` – зарезервированный флаг для Метрики после внедрения consent management.

## Git flow

- `main` – готовая к production ветка.
- feature-ветки – отдельные изменения.
- staging рекомендуется деплоить из `main` до первого production запуска либо из отдельной `staging` ветки, если появится параллельная разработка.
