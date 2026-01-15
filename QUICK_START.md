# 🚀 Quick Start - PostgreSQL + Prisma Setup

## What's Changed
- ✅ MongoDB → PostgreSQL (Neon)
- ✅ Mongoose → Prisma ORM
- ✅ 9 RESTful API endpoints created
- ✅ JWT authentication added
- ✅ All code backed up on GitHub

## Immediate TODO

### 1. Get Neon Connection String (2 min)
```
1. Go to https://console.neon.tech/app/projects
2. Click "hainescitydental" project
3. Click "Connection string"
4. Copy the PostgreSQL URL
```

### 2. Update .env.local (1 min)
Replace this:
```env
DATABASE_URL="postgresql://user:password@ep-xxxxx.neon.tech/hainescitydental?sslmode=require"
```

### 3. Create Database Tables (1 min)
```bash
npx prisma db push
```

### 4. Test Connection (1 min)
```bash
npx prisma studio
```
Opens http://localhost:5555 - Should show 4 empty tables

### 5. Build & Test (5 min)
```bash
npm run build
npm run dev
```

## API Testing

### Login
```bash
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"action":"login","username":"hainescitydental","password":"gATORRAID@422"}'
```

Response:
```json
{ "token": "eyJhbGc..." }
```

### Create News Article (with token)
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "New Article",
    "category": "general",
    "description": "Short description",
    "content": "Full content here",
    "published": true,
    "images": []
  }'
```

### Get All Doctors
```bash
curl http://localhost:3000/api/doctors
```

## Environment Variables

Required in `.env.local`:

```env
# Neon PostgreSQL connection
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"

# JWT secret (min 32 chars)
JWT_SECRET="your_secret_key_here_min_32_chars_long"

# Admin login
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD=gATORRAID@422

# Cloudinary (optional for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## File Locations

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database models |
| `lib/prisma.ts` | Prisma client |
| `lib/auth/auth.ts` | JWT & passwords |
| `app/api/auth/route.ts` | Login endpoint |
| `app/api/news/route.ts` | News list/create |
| `app/api/news/[id]/route.ts` | News CRUD |
| `app/api/doctors/route.ts` | Doctors list/create |
| `app/api/doctors/[id]/route.ts` | Doctors CRUD |
| `app/api/staff/route.ts` | Staff list/create |
| `app/api/staff/[id]/route.ts` | Staff CRUD |
| `app/api/team/route.ts` | Team list/create |
| `app/api/team/[id]/route.ts` | Team CRUD |
| `app/api/upload/route.ts` | File upload |

## Database Models

**News** - id, title, category, description, content, images[], date, slug, published
**Doctor** - id, name, credentials, bio, image, specializations[], experience, education, active
**Staff** - id, name, role, bio, image, department, order, active
**Team** - id, name, position, bio, image, order, active

## Backup Info

Old MongoDB code is safely preserved on GitHub:
```bash
git checkout backup-mongodb-cms
```

## Support Files

- `POSTGRESQL_MIGRATION_GUIDE.md` - Detailed setup guide
- `MIGRATION_COMPLETE.md` - Full migration details
- `package.json` - All dependencies listed

---

**Status**: ✅ Ready for production (after Neon connection string added)

**Time to live**: ~1 hour (connection setup + testing + deployment)

**Questions?** Check POSTGRESQL_MIGRATION_GUIDE.md or MIGRATION_COMPLETE.md
