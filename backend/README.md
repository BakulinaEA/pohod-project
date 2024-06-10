# Backend для Pohod-Project

Здесь разрабатывается логика для работы приложения Pohod-Project. В данном мануале описано как правильно подготовить окружение для дальнейшей разработки.

## Установка

### 1. Склонируйте образ MongoDB в Docker контейнер

Для запуска приложения Вам потребуется установить на свою машину [Docker](https://www.docker.com/)

1. Скачайте Docker-образ базы данных [MongoDB](https://hub.docker.com/layers/library/mongo/6.0.15/images/sha256-f06a25c6a55b98171b65672afbd6c96127d2b66c82c5357dc9275c483cf81ba7?context=explore)

```bash
docker run -d --name mongo-c \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      mongo:6.0.15
```

2. Узнайте физический адрес контейнера в котором запустилась база данных MongoDB

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-c
```

3. Создайте .env файл по примеру [.env.example](./.env.example)

```bash
# Укажите что запускаетесь в режиме разработки
NODE_ENV=development

...

# Вставьте физический адрес контейнера в котором запустилась база данных MongoDB
MONGO_HOST=127.0.0.1
MONGO_PORT=27017

...

# Укажите логин и пароль к базе данных (по стандарту используется admin:password)
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password

...

# Укажите порт на котором будет запущено приложение (по стандарту используется: 3000)
SERVER_PORT=3000
```

### 2. Разработка и сборка приложения NodeJS

Для запуска приложения Вам потребуется установить на свою машину [NodeJS](https://nodejs.org/en) и [yarn](https://yarnpkg.com/)

#### Разработка и отладка

1. Установите зависимости node_modules

```bash
yarn
```

2. Запустите приложение в режиме Development

```bash
yarn dev
```

#### Сборка и запуск в Production режиме

1. Соберите приложение

```bash
yarn build
```

2. Запустите приложение

```bash
yarn start
```

### 3. Запуск приложения в Docker контейнере

1. Соберите образ приложения

```bash
docker build -t backend .
```

2. Запустите образ приложения

```bash
docker run -p 3000:3000 backend
```
