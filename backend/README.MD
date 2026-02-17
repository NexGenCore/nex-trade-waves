Nex Trade Wave 🌊 — Backend

Nex Trade Wave 🌊 Backend is a scalable and modular trading engine built with NestJS.

It powers authentication, order matching, wallet management, simulation processing, and real-time WebSocket events.

🏗 Architecture

Modular domain-driven design

REST + WebSocket APIs

Event-driven order engine

Redis-powered caching

MongoDB persistence

API Key lifecycle management

🧩 Tech Stack

Framework: NestJS

Database: MongoDB + Mongoose

Cache: Redis

Auth: JWT + bcrypt

Testing: Jest & Supertest

Containerization: Docker

🔐 Authentication & Security

JWT access & refresh tokens

Role-Based Access Control (RBAC)

Two-Factor Authentication (2FA)

Secure API key rotation & expiry

Guard-based authorization

📈 Trading Engine Features

Market orders

Limit orders

Stop orders

Real-time order matching

Order book aggregation

Trade execution logging

WebSocket broadcasting

👛 Wallet Management

Multi-asset wallet tracking

Stellar-based settlement

Deposit & withdrawal handling

Transaction history logs

Non-custodial architecture

📦 Installation
Prerequisites

Node.js 18+

MongoDB 5+

Redis 6+

Setup
git clone https://github.com/KAMALDEEN333/nex-trade-waves
cd nex-trade-waves/apps/backend
npm install
cp .env.example .env
npm run start:dev


Runs on:

http://localhost:4000

🌐 Environment Variables
NODE_ENV=development
PORT=4000

MONGO_URI=mongodb://localhost:27017/nex-trade-wave
REDIS_URL=redis://localhost:6379

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m

API_KEY_SECRET=your_api_key_secret

STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

🧪 Testing
npm run test
npm run test:e2e
npm run test:cov

📚 API Documentation

Swagger:

http://localhost:4000/api/docs

🐳 Docker
docker-compose up -d
docker-compose exec backend npm run seed

📜 License

MIT License