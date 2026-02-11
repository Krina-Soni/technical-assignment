# QA Test E-Commerce Platform

A production-grade e-commerce prototype built for testing and assessment purposes.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB
- **State Management:** Zustand, React Query
- **Payments:** Stripe (Test Mode)

## Setup Instructions

1. **Prerequisites:**
   - Node.js 20+
   - Docker (for MongoDB)

2. **Database:**
   ```bash
   docker-compose up -d
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file based on `.env.example` (pre-filled for local dev).

5. **Seed Data:**
   ```bash
   npm run seed
   ```

6. **Start Development Server:**
   ```bash
   npm run dev
   ```

## Test Credentials

- **Admin:** `admin@test.com` / `admin123`
- **Customer:** `user@test.com` / `user123`

## Features
- Full product catalog with search and filtering
- Real-time inventory updates via WebSockets
- Persistent shopping cart
- Multi-step checkout flow
- Admin dashboard for inventory monitoring
