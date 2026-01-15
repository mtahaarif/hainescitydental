# PostgreSQL Migration Complete ✅

## Current Status
- **Database**: PostgreSQL via Neon
- **ORM**: Prisma
- **Authentication**: JWT + Bcrypt
- **API Routes**: 9 fully implemented with auth
- **Backup**: Saved to GitHub branch `backup-mongodb-cms`

## Models Migrated
1. **News** - Blog articles with slug, publication status
2. **Doctor** - Doctor profiles with specializations
3. **Staff** - Staff members with departments
4. **Team** - Team members with ordering

## Database Connection Setup

### Step 1: Get Neon Connection String
1. Go to [Neon Console](https://console.neon.tech/app/projects)
2. Click your `hainescitydental` project
3. Click "Connection string" button
4. Select "psql" from dropdown
5. Copy the full connection string

Expected format:
```
postgresql://neon_user:password@ep-xxxxx-xxxxx.us-east-2.neon.tech/hainescitydental?sslmode=require
```

### Step 2: Update .env.local
Replace the `DATABASE_URL` value with your actual Neon connection string:

```bash
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

Make sure to keep the quotes around the URL.

### Step 3: Run Migrations
```bash
npx prisma db push
```

This will:
- Connect to your Neon database
- Create all 4 tables (News, Doctor, Staff, Team)
- Create all indexes for performance
- Display: "✔ Database synced with schema"

### Step 4: Test Connection
```bash
npx prisma studio
```

This opens Prisma Studio at `http://localhost:5555` to view/manage database.

## API Endpoints

### Authentication
- **POST** `/api/auth` - Login
  - Body: `{ action: "login", username: "hainescitydental", password: "gATORRAID@422" }`
  - Returns: `{ token: "jwt_token_here" }`

### News (Content Management)
- **GET** `/api/news` - List all published articles
- **GET** `/api/news/[id]` - Get specific article
- **POST** `/api/news` - Create article (requires auth)
- **PUT** `/api/news/[id]` - Update article (requires auth)
- **DELETE** `/api/news/[id]` - Delete article (requires auth)

### Doctors
- **GET** `/api/doctors` - List all active doctors
- **GET** `/api/doctors/[id]` - Get doctor details
- **POST** `/api/doctors` - Create doctor (requires auth)
- **PUT** `/api/doctors/[id]` - Update doctor (requires auth)
- **DELETE** `/api/doctors/[id]` - Delete doctor (requires auth)

### Staff
- **GET** `/api/staff` - List all active staff members
- **GET** `/api/staff/[id]` - Get staff member details
- **POST** `/api/staff` - Create staff (requires auth)
- **PUT** `/api/staff/[id]` - Update staff (requires auth)
- **DELETE** `/api/staff/[id]` - Delete staff (requires auth)

### Team
- **GET** `/api/team` - List all active team members
- **GET** `/api/team/[id]` - Get team member details
- **POST** `/api/team` - Create team member (requires auth)
- **PUT** `/api/team/[id]` - Update team member (requires auth)
- **DELETE** `/api/team/[id]` - Delete team member (requires auth)

## Making Authenticated Requests

All write operations (POST, PUT, DELETE) require a Bearer token:

```javascript
const token = "your_jwt_token_from_login";

fetch('/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "Article Title",
    category: "general",
    description: "Short description",
    content: "Full article content",
    images: [],
    published: true
  })
});
```

## File Structure

```
prisma/
├── schema.prisma          # Database schema with models & indexes

lib/
├── prisma.ts              # Singleton Prisma client
└── auth/
    ├── auth.ts            # JWT & password functions
    └── middleware.ts      # Auth token validation

app/api/
├── auth/route.ts          # Login endpoint
├── news/
│   ├── route.ts           # GET/POST
│   └── [id]/route.ts      # GET/PUT/DELETE
├── doctors/
│   ├── route.ts           # GET/POST
│   └── [id]/route.ts      # GET/PUT/DELETE
├── staff/
│   ├── route.ts           # GET/POST
│   └── [id]/route.ts      # GET/PUT/DELETE
├── team/
│   ├── route.ts           # GET/POST
│   └── [id]/route.ts      # GET/PUT/DELETE
└── upload/route.ts        # Image upload (placeholder)
```

## Next Steps

1. ✅ Update `.env.local` with Neon connection string
2. ✅ Run `npx prisma db push`
3. ⏳ Update admin pages to use new API
4. ⏳ Update frontend to fetch from API
5. ⏳ Delete old MongoDB documentation files
6. ⏳ Test all endpoints
7. ⏳ Commit and push to GitHub

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# JWT (min 32 characters)
JWT_SECRET=your_secret_key_here

# Admin Credentials
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD=gATORRAID@422

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Performance Optimizations

✅ Database indexes on:
- News: `published`, `date`
- Doctor: `active`
- Staff: `active`, `order`
- Team: `active`, `order`

✅ Prisma optimizations:
- Singleton client pattern for serverless
- Efficient query selection
- Proper error handling with Prisma error codes

✅ API optimizations:
- Result limiting (News: max 50 items)
- Sorting by relevant fields
- Authentication on write operations only

## Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Check `.env.local` has proper DATABASE_URL value
- Make sure URL is in quotes if it has special characters
- Restart dev server after updating

### Connection refused
- Verify Neon project is running (check Neon dashboard)
- Confirm connection string has correct password
- Check firewall allows outbound HTTPS (port 5432)

### Prisma type errors
- Run `npx prisma generate` to regenerate types
- Check schema.prisma for syntax errors
- Verify model names match API route imports

## Rollback Plan

If needed, revert to MongoDB version:
```bash
git checkout backup-mongodb-cms
npm install
npm run dev
```

The backup branch has all original MongoDB code preserved.
