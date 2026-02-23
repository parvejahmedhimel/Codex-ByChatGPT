# EduLaunch Pro (Next.js + TypeScript)

A real educational platform starter with:
- Next.js App Router + TypeScript
- Prisma + SQLite database
- NextAuth credentials login
- Course enrollment persisted in DB
- Exam submission + score history persisted in DB

## Setup

1. Install deps:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and migrate DB:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed sample courses and exam:
   ```bash
   npm run db:seed
   ```
5. Run app:
   ```bash
   npm run dev
   ```

## Key routes
- `/register` - create account
- `/login` - credentials login
- `/courses` - list + enroll
- `/exams` - take exam
- `/dashboard` - user progress
