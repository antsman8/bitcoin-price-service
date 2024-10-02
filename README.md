Микросервис для получения текущей цены Биткоина с биржи Бинанс

# Используемые технологии

- Nest.js
- Axios
- Docker

# Функциональность

- Получение текущей цены Bitcoin с биржи Binance.
- Расчет цены с учетом комиссии сервиса.
- Обновление данных каждые 10 секунд.

# Шаги для запуска

## Шаг 1: Клонирование репозитория

Клонируйте репозиторий
git clone <URL*вашего*репозитория>

## Шаг 2: Настройка переменных окружения

Создайте файл .env в корневом каталоге проекта и укажите следующие переменные:  
 PORT=3000
SERVICE_FEE=0.01
REFRESH_RATE=10000

## Шаг 3: Запуск проекта

### Способ 1: Через Docker (основной)

    - Соберите Docker-образ:
    docker build -t bitcoin-price-service .
    - Запустите контейнер:
    docker run -d -p 3000:3000 bitcoin-price-service
    Перейдите по следующему пути в браузере или в Insomnia/Postman, чтобы получить текущую цену Bitcoin:
    http://localhost:3000/price/bitcoin

    Пример запроса через Insomnia или Postman:

    Метод: GET
    URL: http://localhost:3000/price/bitcoin

### Способ 2: Локальный запуск (резервный)

    - Установите зависимости:
      npm install
    - Соберите проект:
      npm run build
    - Запустите проект:
      npm run start
    - Откройте в браузере:
      http://localhost:3000/price/bitcoin
      Или отправьте GET-запрос через Insomnia/Postman:

      Метод: GET
      URL: http://localhost:3000/price/bitcoin
