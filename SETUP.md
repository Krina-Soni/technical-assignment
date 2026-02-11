# Project Setup and Run Instructions

This guide provides step-by-step instructions to get the application up and running on your local machine.

## Prerequisites
- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher
- **Docker**: For running MongoDB locally

## 1. Environment Configuration
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL=mongodb://localhost:27017/qa-test-app
JWT_SECRET=hardcoded-secret-for-testing-do-not-use-in-production
STRIPE_SECRET_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 2. Infrastructure Setup
Start the MongoDB database using Docker Compose:
```bash
docker-compose up -d
```

## 3. Installation
Install all required dependencies for both frontend and backend:
```bash
npm install
```

## 4. Database Seeding
Populate the database with initial test data (products, users, etc.):
```bash
npm run seed
```

## 5. Running the Application
### Development Mode
Runs both the Next.js frontend and Express backend concurrently with hot-reloading:
```bash
npm run dev
```
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Production Build
To build the application for production:
```bash
npm run build
npm start
```

## 6. Testing
Execute unit tests:
```bash
npm test
```
Execute E2E tests:
```bash
npm run test:e2e
```