# Full Stack app Pohod-Project

Данный проект содержит [Frontend](./frontend/), [Backend](./backend/) и [образ](./database/) базы данных [mongoDB](https://hub.docker.com/layers/library/mongo/6.0.15/images/sha256-f06a25c6a55b98171b65672afbd6c96127d2b66c82c5357dc9275c483cf81ba7?context=explore) для приложения Pohod-Project.

>Для разработки и деббагинга я настоятельно рекомендую использовать систему [Ubuntu 22.04 Desktop](https://ubuntu.com/desktop)

>Для запуска в продаакшн [Ubuntu 22.04 Server](https://ubuntu.com/server)

## Установка 

Для запуска приложения Вам потребуется установить на свою машину [Docker](https://www.docker.com/) 

### 1. Создайте .env файл

Создайте в корне проекта файл .env по примеру [.env.example](./.env.example)

1.1 Укажите что запускаетесь в режиме разработки
```bash
NODE_ENV=development
```

1.2 Вставьте физический адрес контейнера в котором запустилась база данных MongoDB
```bash
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
```

1.3 Укажите логин и пароль к базе данных (по стандарту используется admin:password)
```bash
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
```

1.4 Укажите имя базы данных для работы приложения
```bash
MONGO_DATABASE_NAME=pohod_project
```

1.5 Укажите API-ключ [resend.com](https://resend.com/) для отправки Email-уведомлений

```bash
RESEND_API=KEY_HERE
```

1.6 Укажите отправителя писем (Email)
```bash
EMAIL_SENDER=l1za@resend.dev
```

1.7 Укажите порт на котором будет запущено приложение (по стандарту используется: 3000)
```bash
SERVER_PORT=3000
```

### 2. Запустите контейнеры

Запустите проект с помощью команды

```bash
docker compose --env-file .env up
```

### 3. Backend отладка 

1. Откройте в любом браузере [http://localhost:3000/](http://localhost:3000/)

2. Ответ должен быть таким:
```json
{"status":"online"}
```
Если вы увидели статус онлайн, то все работает отлично

### 4. Frontend запуск

В данный момент этот функционал недоступен для совместной работы с Backend частью, однако вы всегда сможете перейти в эту часть кода и посмотреть как всё будет выглядеть через некоторое время.

1. Перейдём в папку Frontend части
```bash
cd frontend/
```
2. Установим зависимости
```bash
yarn
```
3. Запустим
```bash
yarn dev
```

4. Откройте в браузере [http://localhost:5173/](http://localhost:5173/)

### 5. Остановить контейнеры

Нажмите сочетание клавиш Ctrl + C чтоб остановить контейнеры 

#### Удалить контейнеры и их кэш:

>Внимание: запуск этой команды удалит все ваши имеющиеся контейнеры

1. Дайте права на запуск [./docker-down.sh](./docker-down.sh) файла
```bash
chmod +x ./docker-down.sh
```
2. Запустите [./docker-down.sh](./docker-down.sh)

### Задачи

- [x] Подключить [MongoDB](https://www.mongodb.com/)
- [x] Сделать [JWT](https://jwt.io/) авторизацию/регистрацию
- [ ] Контейнеризовать Frontend
- [ ] Связать работу Frontend & Backend