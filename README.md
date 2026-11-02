# Qazaq Air · Crew Portal

Портал команды Qazaq Air Roblox: регистрация по email, профили, экзамены, рейсы и дисциплинарные записи. Сайт публикуется на GitHub Pages, аккаунты и данные хранятся в Firebase Realtime Database.

## Уже настроено

- Firebase-проект `qazaq-air-roblox-staff-portal`, Email/Password и Realtime Database (europe-west1).
- Правила базы опубликованы; домен `gmeilkom2-spec.github.io` разрешён для Firebase Authentication.
- Репозиторий: https://github.com/gmeilkom2-spec/qazaq-air-staff-portal
- Google Sheet «Qazaq Air — Регистрации на рейсы» и привязанный Apps Script созданы. Для автоматической отправки записей ещё требуется развернуть Apps Script Web App и добавить его URL в `src.js` как `SHEETS_WEBHOOK`.

## Первый администратор

Новая регистрация всегда получает должность `Training`; выбрать должность при регистрации нельзя. После того как владелец создаст свой аккаунт на сайте, нужно открыть Firebase Console → Realtime Database → `users` → UID владельца и вручную сменить `role` на `Owner`. После этого администратор назначает роли и оценивает экзамены из портала. Не выдавайте административную должность посторонним.

## Экзамены и доступ к рейсам

Экзамен бортпроводника: https://docs.google.com/forms/d/e/1FAIpQLSfAZe4WIAXTr8ku9CxERmYN2m0tsmRjRM34kJJGhjNu0AM8EQ/viewform?usp=header  
Экзамен наземного экипажа: https://docs.google.com/forms/d/e/1FAIpQLSc8Rhp3ygFGXAyVP0N5smtFt67MDBSj-I-04G53g37wRNfsVA/viewform?usp=header

После отправки формы участник отмечает экзамен как отправленный в разделе «Обучение». Администратор проверяет результат и выставляет оценку от 0 до 100. Проходной балл — 70. Для записи на рейс нужны пройденный экзамен и должность выше `Training`.

## GitHub Pages

GitHub Actions публикует статические файлы из этого репозитория. В репозитории уже выбран источник Pages `GitHub Actions`. Сайт: https://gmeilkom2-spec.github.io/qazaq-air-staff-portal/

## Google Sheets

`google-apps-script/Code.gs` — Apps Script для записи подтверждённых заявок в таблицу. В настройках скрипта используются свойства `SHEET_ID`, `FIREBASE_API_KEY` и `FIREBASE_DATABASE_URL`. Разворачивайте Web App от имени владельца таблицы; конечная точка проверяет Firebase ID token и заявку на рейс. После развертывания укажите URL Web App в константе `SHEETS_WEBHOOK` файла `src.js` и опубликуйте изменение.

`firebase-config.js` содержит общедоступные параметры клиентского Firebase приложения. Не добавляйте в репозиторий Firebase Admin SDK credentials, приватные ключи Google, пароли или service account JSON.

## Должности

`Training`, Бортпроводник, Старший Бортпроводник, Супервайзер, Второй Пилот, Капитан, Наземный Экипаж, Граунд Менеджер, Хост, Уполномоченный Состав, Founder, Owner. Админ-доступ имеют Уполномоченный Состав, Founder и Owner.

Сайт — неофициальный фанатский портал для команды Roblox. Логотип в комплекте — стилизованный знак портала.
