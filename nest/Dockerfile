# устанавливаем официальный образ Node.js
FROM node:20-alpine

# указываем рабочую (корневую) директорию
WORKDIR /app

# копируем основные файлы приложения в рабочую директорию
COPY package*.json ./

# Install app dependencies using PNPM
RUN npm install -g pnpm 

# устанавливаем указанные зависимости NPM на этапе установки образа
RUN pnpm install

# после установки копируем все файлы проекта в корневую директорию
COPY . ./

RUN pnpm build

# запускаем основной скрипт в момент запуска контейнера
CMD pnpm start