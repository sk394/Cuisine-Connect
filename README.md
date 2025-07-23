# 🍽️ Cuisine Connect

**Cuisine Connect** is a full-stack social web app where users can share, search, filter, rate, and bookmark recipes. Features include real-time updates, recipe streaks (HowdyFoody Score), authentication, and rich media uploads.

🔗 [Live Demo / Deployment Link](#) — *Coming Soon*
<img width="975" height="435" alt="image" src="https://github.com/user-attachments/assets/074f3148-ac5f-4efb-b33d-17b7db2d1496" />

---

## 🚀 Features

- 🔐 **Authentication** via NextAuth.js
- 📚 **Advanced Search & Filters** (by title, ingredients, style)
- 📝 **CRUD Recipes** with media upload (drag & drop)
- 💬 **Ratings & Comments**
- 📌 **Bookmarking & Link Sharing**
- ⚡ **Real-Time Feed Updates**
- 🏅 **HowdyFoody Score**: avg. rating across user's recipes

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL
- **Auth:** NextAuth.js
- **Storage:** Cloud-based media uploads

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/sk394/Cuisine-Connect.git
cd Cuisine-Connect

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# (Update .env with your DB connection string, NextAuth secret, etc.)

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev





