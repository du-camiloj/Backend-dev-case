# Backend-dev-case

## 🚀 Technologies
* Backend:
  * Node.js,
  * Express.js,
  * GraphQL
* Database:
  * PostgreSQL (Sequelize)
* Cache:
  * Redis
* Testing:
  * Jest
* Containerization:
  * Docker Compose (recommended on Windows for Redis)

## ✅ Requirements
* Node.js v18+
* npm
* PostgreSQL
* Windows: Docker Desktop (run Redis)
* Linux/macOS: Redis can be installed natively or via Docker

## ⚙️ Setup Local Development

### 1. Clone the repo
```
git clone https://github.com/du-camiloj/Backend-dev-case.git
cd Backend-dev-case
```
### 2. Install dependencies
```
npm i
```
### 3. Environment variables
Create a .env file in the project root (the .env file sent by email)
#### NOTE:
* Create and configure the database locally
* In the environment variable DATABASE_URL, use the same structure specified in the comment

### 4. Run migrations
```
npm run migrate
```
### 5. Run Seed sample data
```
npm run seed
```
This imports 15 characters (and their related locations/episodes) from the Rick & Morty API.

### 6. Redis
```
docker-compose up -d
```

## 🧪 Tests
### Run tests:
```
npm run test
```

### View coverage:
```
npm test -- --coverage
```

## ▶️ Run the app
```
npm run dev
```
or
```
npm run start
```
Successfully up and running

Expected console output:
```
DB connected
API ready -> http://localhost:3030/
GraphQL -> http://localhost:3030/graphql
```

## ⏹️ Stop services (Redis via Docker)
```
docker-compose down
```
