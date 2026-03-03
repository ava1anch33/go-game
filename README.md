# Go Game - Full Stack Application

This is a full stack application, include：

- **backend**：folder /go-game-api, Node.js + Express + MongoDB API service
- **Web frontend**：folder /go-plus, Vue 3 + Vite
- **Mobile frontend**：folder /ai-go, Ionic + Vue 3 + Capacitor

## project folder

```text
go-game/
├── docker-compose.yml         # Docker instruction
├── go-game-api/               # backend API Services
│   ├── Dockerfile
│   ├── src/
│   ├── package.json
│   └── ...
├── go-plus/                   # Web frontend
│   ├── Dockerfile
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json
│   └── ...
├── ai-go/                     # Ionic mobile frontend（Hybrid App）
│   ├── Dockerfile
│   ├── src/
│   ├── vite.config.ts
│   ├── capacitor.config.ts
│   ├── package.json
│   └── ...
└── mongo-data/         
```

## Tech Stack Overview

| section  | tech stack                  | port  | more info                |
|----------|-----------------------------|-------|--------------------------|
| backend  | Node.js/Express/MongoDB     | 4000  | JWT, token refresh       |
| Web      | Vue3/Vite/Vue Router        | 5173  | web pages                |
| mobile   | Ionic8/Vue3/Capacitor       | 8100  | mobile pages in dev mode |
| database | MongoDB 7                   | 27017 | data                     |

## start service

### Docker Compose

1. make sure you have [Docker](https://www.docker.com/) in your computer

2. start

   ```bash
   cd go-game

   # build and start all services
   docker compose up --build

   # or if u want make it run at backend, can check at docker desktop
   docker compose up --build -d
   ```

3. following url to check

    Web ：<http://localhost:5173>
    Ionic ：<http://localhost:8100>

4. stop service

    ```bash
    cd go-game
    docker compose down
    ```
