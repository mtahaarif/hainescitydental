# Haines City Dental - Modern Dental Practice Website

A high-performance website for Haines City Dental built with **Next.js 14**, **PostgreSQL**, **Prisma**, and **TypeScript**.

## 🚀 Features

- **Content Management**: REST API for news, doctors, staff, and team members
- **JWT Authentication**: Secure admin access with 24-hour token expiry
- **PostgreSQL Database**: Serverless database via Neon with auto-scaling
- **Prisma ORM**: Type-safe database queries with auto-generated types
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **High Performance**: Database indexes and optimized queries
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Secure**: JWT + Bcrypt password hashing on all admin operations

## 📦 Tech Stack

- **Framework**: Next.js 14.2.35 with App Router
- **UI Library**: React 18.3.1
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma v5.22.0
- **Styling**: Tailwind CSS + Custom Design System
- **Auth**: JWT + Bcryptjs
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🛠️ Quick Start
### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL via Neon (free at https://neon.tech)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd hainescitydental1

# Install dependencies
npm install

# Configure database
# 1. Get connection string from Neon console
# 2. Add to .env.local:
#    DATABASE_URL="postgresql://..."

# Create database tables
npx prisma db push

# Run development server
npm run dev
```

Visit `http://localhost:3000` and admin panel at `/admin/login`

## 📝 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Create production build
npm start                # Start production server
npm run lint             # Run ESLint
npx prisma db push      # Sync database schema
npx prisma studio      # Open database UI (http://localhost:5555)
```

## 🔐 Admin Access

**Login at**: `/admin/login`

**Credentials**:
- Username: `hainescitydental`
- Password: `gATORRAID@422`

**After login**: JWT token stored in localStorage, automatically sent with API requests

## 📂 Project Structure

```
hainescitydental1/
├── prisma/
│   └── schema.prisma              # Database models
├── lib/
│   ├── prisma.ts                  # Prisma client
│   └── auth/                      # Authentication
├── app/
│   ├── api/                       # REST API endpoints
│   │   ├── auth/                  # Login
│   │   ├── news/                  # News CRUD
│   │   ├── doctors/               # Doctors CRUD
│   │   ├── staff/                 # Staff CRUD
│   │   ├── team/                  # Team CRUD
│   │   └── upload/                # Image uploads
│   └── admin/                     # Admin dashboard
├── src/
│   ├── components/                # React components
│   └── assets/                    # Images, fonts
├── public/                        # Static files
└── next.config.js                 # Next.js config
```

## 🗄️ API Endpoints

All endpoints require Bearer token from `/api/auth` for write operations.

**News**
- `GET /api/news` - List published articles
- `GET /api/news/[id]` - Get article
- `POST /api/news` - Create article (auth required)
- `PUT /api/news/[id]` - Update article (auth required)
- `DELETE /api/news/[id]` - Delete article (auth required)

**Doctors**
- `GET /api/doctors` - List active doctors
- `GET /api/doctors/[id]` - Get doctor
- `POST /api/doctors` - Create doctor (auth required)
- `PUT /api/doctors/[id]` - Update doctor (auth required)
- `DELETE /api/doctors/[id]` - Delete doctor (auth required)

**Staff**
- `GET /api/staff` - List staff
- `GET /api/staff/[id]` - Get staff member
- `POST /api/staff` - Create staff (auth required)
- `PUT /api/staff/[id]` - Update staff (auth required)
- `DELETE /api/staff/[id]` - Delete staff (auth required)

**Team**
- `GET /api/team` - List team members
- `GET /api/team/[id]` - Get team member
- `POST /api/team` - Create team member (auth required)
- `PUT /api/team/[id]` - Update team member (auth required)
- `DELETE /api/team/[id]` - Delete team member (auth required)

**Authentication**
- `POST /api/auth` - Login and token verification

See [QUICK_START.md](QUICK_START.md) for API testing examples.

## 🗄️ Database Models

**News**
- Title, category, description, content, images
- Slug for URL-friendly links
- Published status and date

**Doctor**
- Name, credentials, bio, image
- Specializations, experience, education
- Active status

**Staff**
- Name, role, bio, image
- Department, display order
- Active status

**Team**
- Name, position, bio, image
- Display order
- Active status

See [POSTGRESQL_MIGRATION_GUIDE.md](POSTGRESQL_MIGRATION_GUIDE.md) for detailed schema.

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - 5-minute setup guide
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Full testing guide
- [POSTGRESQL_MIGRATION_GUIDE.md](POSTGRESQL_MIGRATION_GUIDE.md) - Database setup
- [ACTION_ITEMS.md](ACTION_ITEMS.md) - Next steps checklist
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - File structure
- [FINAL_SUMMARY.md](FINAL_SUMMARY.md) - Migration details

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables:
   - `DATABASE_URL` - Neon connection string
   - `JWT_SECRET` - 32+ character secret
   - `ADMIN_USERNAME` - Admin username
   - `ADMIN_PASSWORD` - Admin password
4. Deploy!

### Environment Variables (.env.local)
```env
# Database (from Neon console)
DATABASE_URL="postgresql://user:password@host.neon.tech/db?sslmode=require"

# JWT Secret (min 32 chars)
JWT_SECRET="your_random_secret_key_here_min_32_chars_long"

# Admin
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD=gATORRAID@422

# Optional: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔒 Security

- ✅ JWT authentication with 24-hour expiry
- ✅ Bcrypt password hashing
- ✅ Bearer token validation on write operations
- ✅ SQL injection protection via Prisma
- ✅ CORS headers configured
- ✅ Environment variables for secrets

## 📊 Performance

- ✅ Database indexes on frequently queried fields
- ✅ Prisma serverless connection pooling
- ✅ Result limiting (max 50 items)
- ✅ Efficient query selection
- ✅ TypeScript for compile-time safety

## 🆘 Troubleshooting

**Connection issues?** → Check [SETUP_COMPLETE.md#troubleshooting](SETUP_COMPLETE.md)
**API not working?** → See [ACTION_ITEMS.md#if-something-goes-wrong](ACTION_ITEMS.md)
**Need to rollback?** → `git checkout backup-mongodb-cms`

## 📝 License

Copyright © 2024-2026 Haines City Dental. All rights reserved.

---

Built with ❤️ using Next.js and modern web technologies.
