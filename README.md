# Qazaq Air · Crew Portal

Внутренний портал Qazaq Air Roblox: регистрация по email, должности, экзамены, рейсы и дисциплинарные записи. Страница статическая и публикуется через GitHub Pages; аккаунты и данные хранятся в Firebase Realtime Database.

## Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/), добавьте Web App и скопируйте её конфигурацию в `firebase-config.js`. Этот веб-конфиг не является секретом; права доступа защищаются правилами Realtime Database.
2. В Authentication включите провайдера **Email/Password**.
3. Создайте Realtime Database. В **Rules** вставьте содержимое `database.rules.json` и нажмите Publish.
4. В Authentication → Settings → Authorized domains добавьте домен GitHub Pages (`<username>.github.io`).
5. Опубликуйте сайт по инструкции GitHub Pages ниже.
6. Зарегистрируйте свой рабочий аккаунт на сайте. В Firebase Console → Realtime Database найдите `/users/<ваш UID>` и вручную измените `role` на `Owner`. Это разовое безопасное назначение первого администратора. После этого выдавайте доступ из вкладки «Администрирование».

Регистрация всегда создаёт только `Training`; пользователь не выбирает должность. После отправки экзамена администратор выставляет оценку от 0 до 100. Проходной балл сейчас 70. Для записи на рейс нужны одновременно пройденный экзамен и должность выше `Training`. Порог можно поменять в `src.js` в функции `grade`.

## Публикация на GitHub Pages

1. Создайте пустой GitHub repository и загрузите содержимое этой папки в корень репозитория.
2. Откройте repository → **Settings → Pages**. В поле Build and deployment выберите **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` опубликует статический сайт после отправки изменений в ветку `main`.
4. Дождитесь завершения Actions и откройте показанный GitHub Pages адрес.

`firebase-config.js` содержит только общедоступные параметры клиентского Firebase приложения. Никогда не помещайте в сайт Firebase Admin SDK credentials, приватный ключ Google, пароли или service account JSON.

## Google Sheets (необязательно)

Шаблон `google-apps-script/Code.gs` записывает подтверждённые регистрации на рейсы в Google Sheet. Разверните Apps Script как Web App, скопируйте URL и укажите его в `src.js` в константе `SHEETS_WEBHOOK`. В свойствах Apps Script задайте `SHEET_ID`, `FIREBASE_API_KEY` и `FIREBASE_DATABASE_URL`. Скрипт проверяет Firebase ID token, статус участника и его собственную запись на рейс перед добавлением строки. В Google Sheet создайте вкладку `Registrations` с заголовками `Когда`, `UID`, `Имя`, `Должность`, `Рейс`, `Маршрут`, `Дата рейса`.

## Должности

`Training`, Бортпроводник, Старший Бортпроводник, Супервайзер, Второй Пилот, Капитан, Наземный Экипаж, Граунд Менеджер, Хост, Уполномоченный Состав, Founder, Owner. Доступ к админке имеют Уполномоченный Состав, Founder и Owner. Добавляйте в эти роли только доверенных участников.

Сайт — неофициальный фанатский портал для команды Roblox. Логотип в комплекте — стилизованный знак этого портала.
