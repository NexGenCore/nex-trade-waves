Nex Trade Wave 🌊 — Frontend

Nex Trade Wave 🌊 Frontend is a high-performance Web3 trading and simulation interface built with Next.js and TypeScript.

It delivers real-time trading dashboards, AI-powered analytics views, simulation environments, and secure wallet interactions — all powered by the Stellar ecosystem.

🌍 Overview

This frontend provides:

📊 Real-time trading dashboards

📈 Order book & live price charts

🎮 Simulation-based learning interface

🔐 Secure authentication flows

👛 Non-custodial wallet interaction

🗳 DAO governance interface

Built for beginners, professional traders, and institutions.

🧩 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS + ShadCN UI

State Management: TanStack Query

Deployment: Vercel

API Integration: REST + WebSockets

Authentication: JWT-based secure flows

✨ Key Features
🖥 Trading Interface

Market, limit, and stop order forms

Real-time order book updates

Portfolio tracking

Trade history view

🎮 Simulation Mode

Risk-free market simulation

Strategy testing with live market feeds

Gamified onboarding experience

🔐 Security

JWT authentication

2FA integration

Role-based UI rendering

API key management dashboard

📦 Installation
Prerequisites

Node.js 18+

Backend API running (default: http://localhost:4000
)

Setup
git clone https://github.com/KAMALDEEN333/nex-trade-waves
cd nex-trade-waves/apps/frontend
npm install
npm run dev


App runs on:

http://localhost:3000

🌐 Environment Variables

Create .env.local

NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_STELLAR_NETWORK=testnet


⚠️ Never commit environment files.

📂 Folder Structure
frontend/
├── app/
├── components/
├── hooks/
├── services/
├── lib/
└── styles/

🚀 Deployment

Recommended deployment:

Vercel

vercel deploy

🔗 Related Repositories

Backend API

Smart Contracts

📜 License

MIT License