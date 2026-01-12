# Haines City Dental CMS - Setup Guide

## Overview

This project includes a fully functional Content Management System (CMS) for managing news, team members, and media assets without touching code. The system uses:

- **Authentication**: NextAuth.js with email/password (credentials provider)
- **Database**: Prisma ORM + PostgreSQL
- **API**: Next.js Route Handlers with Zod validation
- **Admin UI**: React with Framer Motion animations
- **Error Handling**: Global toast notifications

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or hosted)
- Environment variables configured

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

All required packages are already in `package.json`:
- `next-auth@4.24.13`
- `@auth/prisma-adapter@1.6.0`
- `@prisma/client@5.22.0`
- `prisma@5.22.0` (dev)
- `bcryptjs@2.4.3`
- `zod` (validation)

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Database Connection String (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/hainescitydental1"

# NextAuth Configuration
NEXTAUTH_SECRET="your-random-secret-string-here"
NEXTAUTH_URL="http://localhost:3001"
```

**To generate a random NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Initialize Prisma & Database

Generate Prisma client and create database migrations:

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init
```

This will:
- Create all required tables: User, Account, Session, VerificationToken, NewsItem, TeamMember, MediaAsset
- Set up relationships and indexes
- Configure audit fields (createdAt, updatedAt, createdById, updatedById)

### 4. Create Admin Account

Access the signup page and create your first admin account:

```
http://localhost:3001/admin/login
```

Click "Sign Up" and register with:
- Email: `admin@hainescitydental.com`
- Password: (secure password)

The account is automatically assigned the ADMIN role.

### 5. Access Admin Dashboard

Login and navigate to:

```
http://localhost:3001/admin/dashboard
```

You'll see three tabs:
- **News**: Create, edit, publish news items
- **Team**: Manage doctors and staff profiles
- **Media**: Store and organize media asset URLs

## API Endpoints

All endpoints are protected - authenticated users only.

### News API

```
GET    /api/news           # Fetch all news (published or all if admin)
POST   /api/news           # Create new news item
GET    /api/news/[id]      # Fetch single news item
PUT    /api/news/[id]      # Update news item
DELETE /api/news/[id]      # Delete news item
```

Example POST:
```json
{
  "title": "New Whitening Treatment",
  "content": "We now offer professional whitening...",
  "excerpt": "Professional whitening now available",
  "image": "https://example.com/image.jpg",
  "published": true
}
```

### Team API

```
GET    /api/team           # Fetch all team members
POST   /api/team           # Create team member
GET    /api/team/[id]      # Fetch single member
PUT    /api/team/[id]      # Update member
DELETE /api/team/[id]      # Delete member
```

Example POST:
```json
{
  "name": "Dr. John Smith",
  "specialty": "Cosmetic Dentistry",
  "role": "DOCTOR",
  "bio": "20+ years of experience...",
  "email": "john@example.com",
  "phone": "555-1234",
  "image": "https://example.com/photo.jpg"
}
```

Roles: `DOCTOR` or `STAFF`

### Media API

```
GET    /api/media           # Fetch all media assets
POST   /api/media           # Create media asset
GET    /api/media/[id]      # Fetch single asset
PUT    /api/media/[id]      # Update asset
DELETE /api/media/[id]      # Delete asset
```

Example POST:
```json
{
  "name": "Office Reception",
  "description": "Our modern reception area",
  "url": "https://example.com/reception.jpg",
  "type": "IMAGE",
  "category": "Office"
}
```

Types: `IMAGE`, `VIDEO`, `DOCUMENT`

## Database Schema

### User
- Stores admin credentials with bcrypt-hashed passwords
- Has one role (admin by default)

### NewsItem
- `id`: UUID primary key
- `title`: String (max 200)
- `content`: String
- `excerpt`: String (optional)
- `image`: URL (optional)
- `published`: Boolean (default: false)
- `createdById`: References User
- `updatedById`: References User
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### TeamMember
- `id`: UUID primary key
- `name`: String
- `specialty`: String
- `role`: Enum (DOCTOR, STAFF)
- `bio`: String
- `image`: URL (optional)
- `email`: String (optional)
- `phone`: String (optional)
- `createdById`: References User
- `updatedById`: References User
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### MediaAsset
- `id`: UUID primary key
- `name`: String
- `description`: String (optional)
- `url`: String
- `type`: Enum (IMAGE, VIDEO, DOCUMENT)
- `category`: String (optional)
- `createdById`: References User
- `createdAt`: Timestamp

## Features

### Validation
All API inputs are validated with Zod schemas defined in `src/lib/validations.ts`. Invalid requests return 400 with detailed error messages.

### Error Handling
- 401: Unauthorized (not authenticated)
- 404: Resource not found
- 400: Validation error
- 500: Server error
- All errors are logged to console

### Audit Trail
Every NewsItem and TeamMember tracks:
- `createdBy`: User who created it
- `createdAt`: Timestamp of creation
- `updatedBy`: User who last updated it
- `updatedAt`: Timestamp of last update

### Authentication
- Uses NextAuth.js with Credentials Provider (email/password)
- Sessions stored in database
- Middleware protects `/admin/*` routes

### UI/UX
- Tab-based interface for content management
- Real-time form validation
- Toast notifications for feedback
- Loading states and empty states
- Responsive grid layouts
- Smooth animations with Framer Motion

## Production Deployment

### Required Environment Variables

```env
DATABASE_URL="postgresql://prod-user:prod-pass@prod-host:5432/dental_prod"
NEXTAUTH_SECRET="strong-random-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_API_BASE_URL="https://yourdomain.com/api"
NODE_ENV="production"
```

### Database Backup

```bash
pg_dump dental_prod > backup.sql
```

### Performance Optimization

1. Enable Prisma Query Engine pooling
2. Use a CDN for media assets
3. Implement caching headers on images
4. Consider S3/Azure Blob for media storage (signed uploads)

### Security Checklist

- [ ] Change default password
- [ ] Enable HTTPS
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Use environment variables for all secrets
- [ ] Enable database encryption at rest
- [ ] Set up database backups
- [ ] Configure CORS if needed
- [ ] Use prepared statements (Prisma does this by default)
- [ ] Implement rate limiting on auth endpoints
- [ ] Add CSRF protection

## Troubleshooting

### "Cannot find module 'critters'"
```bash
npm install critters
```

### Database Connection Error
- Check DATABASE_URL is correct
- Verify PostgreSQL is running
- Ensure network access to database

### "Page not found" in admin
- Make sure you're authenticated
- Check that middleware.ts exists
- Verify routes exist in `/src/app/admin/`

### Form not submitting
- Check browser console for errors
- Verify API endpoints are accessible
- Check network tab for failed requests
- Ensure authentication token is valid

## Next Steps

1. **Media Upload**: Implement S3/Azure Blob signed URL uploads
2. **Email Notifications**: Add email alerts for content updates
3. **Search**: Add full-text search for news items
4. **Versioning**: Track content version history
5. **Bulk Operations**: Support bulk import/export
6. **Analytics**: Track which content is viewed most
7. **SEO**: Auto-generate meta tags from content
8. **CDN**: Integrate Cloudflare or similar for images

## Support

For issues or questions, check:
- Environment variables are set correctly
- Database is initialized
- Prisma models are generated
- NextAuth config is correct
- API response format matches expected schema
