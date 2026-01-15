# CMS Implementation Guide - Haines City Dental

## Overview

This document describes the Content Management System (CMS) that has been implemented for Haines City Dental, allowing non-technical staff to manage website content without code modifications.

## ✅ Completed Implementation

### 1. Database Layer (MongoDB + Mongoose)

**Models Created:**
- **News** (`lib/mongodb/models/News.ts`)
  - Fields: title, category, description, content, images, date, slug, published
  - Auto-generates URL-friendly slug from title
  - Timestamps: createdAt, updatedAt

- **Doctor** (`lib/mongodb/models/Doctor.ts`)
  - Fields: name, credentials, bio, image, specializations, experience, education, active
  - Specializations: array for multiple areas of expertise
  - Timestamps included

- **Staff** (`lib/mongodb/models/Staff.ts`)
  - Fields: name, role, bio, image, department, experience, active, order
  - Order field: enables custom sorting/reordering
  - Timestamps included

- **Team** (`lib/mongodb/models/Team.ts`)
  - Fields: name, position, bio, image, active, order
  - Order field: for display sequence on "Our Team" page
  - Timestamps included

**Connection Handler** (`lib/mongodb/connection.ts`)
- Serverless-safe connection pooling
- Caches connection for reuse across requests
- Handles connection errors gracefully

### 2. Authentication Layer

**Auth Utilities** (`lib/auth/auth.ts`)
```typescript
- generateToken(username, expiresIn?)  // Creates JWT token (24hr default)
- verifyToken(token)                   // Validates JWT and returns payload
- hashPassword(password)                // Bcrypt password hashing
- comparePassword(password, hash)       // Validates password against hash
- verifyAdminCredentials(username, password)  // Admin login verification
```

**Admin Credentials** (stored in `.env.local`):
- Username: `hainescitydental`
- Password: `gATORRAID@422`

**Middleware** (`lib/auth/middleware.ts`)
- `withAuth()`: Wraps API routes to require JWT token in Authorization header

### 3. API Endpoints

#### Authentication
- **POST `/api/auth`** - Login endpoint
  - Body: `{ action: "login", username: string, password: string }`
  - Returns: `{ success: boolean, token?: string }`

#### News Management
- **GET `/api/news`** - Fetch all news articles (sorted newest first)
- **GET `/api/news/[id]`** - Fetch single article by ID
- **POST `/api/news`** - Create new article (requires auth)
- **PUT `/api/news/[id]`** - Update article (requires auth)
- **DELETE `/api/news/[id]`** - Delete article (requires auth)

#### Doctors Management
- **GET `/api/doctors`** - Fetch active doctors
- **GET `/api/doctors/[id]`** - Fetch single doctor
- **POST `/api/doctors`** - Create new doctor (requires auth)
- **PUT `/api/doctors/[id]`** - Update doctor (requires auth)
- **DELETE `/api/doctors/[id]`** - Delete doctor (requires auth)

#### Staff Management
- **GET `/api/staff`** - Fetch active staff (sorted by order)
- **GET `/api/staff/[id]`** - Fetch single staff member
- **POST `/api/staff`** - Create new staff (requires auth)
- **PUT `/api/staff/[id]`** - Update staff (requires auth)
- **DELETE `/api/staff/[id]`** - Delete staff (requires auth)

#### Team Management
- **GET `/api/team`** - Fetch active team members (sorted by order)
- **GET `/api/team/[id]`** - Fetch single team member
- **POST `/api/team`** - Create new team member (requires auth)
- **PUT `/api/team/[id]`** - Update team member (requires auth)
- **DELETE `/api/team/[id]`** - Delete team member (requires auth)

#### File Upload
- **POST `/api/upload`** - Upload image file (requires auth)
  - Validates: JPG, PNG, WebP only, max 5MB
  - Returns: `{ success: boolean, url: string, filename: string }`
  - Stores files in: `/public/uploads/`

### 4. Admin Frontend Pages

#### Login Page (`/admin/login`)
- URL: `http://localhost:3000/admin/login`
- Features:
  - Username/password form with validation
  - Error toast notifications
  - Redirects to dashboard on successful login
  - Stores JWT token in localStorage
  - Responsive design with gradient background

#### Dashboard (`/admin/dashboard`)
- URL: `http://localhost:3000/admin/dashboard` (auto-redirects from `/admin`)
- Features:
  - Welcome message with username
  - 4 stat cards showing counts for News, Doctors, Staff, Team
  - Navigation cards to each management section
  - Logout button
  - Automatic token validation
  - Real-time stat fetching

#### News Management (`/admin/news`)
- URL: `http://localhost:3000/admin/news`
- Features:
  - Table view of all news articles
  - Columns: Title, Category, Date, Status (Published/Draft)
  - Add button opens NewsModal for creating new articles
  - Edit button opens NewsModal with pre-filled data
  - Delete button with confirmation dialog
  - Newest articles displayed first
  - Real-time list updates after CRUD operations

**NewsModal Component** (`components/admin/NewsModal.tsx`)
- Form fields:
  - Title (required)
  - Category dropdown (General, Updates, Events, Tips, Announcements, Treatments)
  - Date picker (defaults to today)
  - Description textarea (required)
  - Content rich text editor (Quill) (required)
  - Multiple image upload with preview
  - Published toggle checkbox
- Features:
  - Validates required fields
  - Shows image upload progress
  - Displays uploaded images with remove option
  - Submits to API with authentication
  - Shows loading state during save
  - Toast notifications for success/error

#### Doctors Management (`/admin/doctors`)
- URL: `http://localhost:3000/admin/doctors`
- Features:
  - Table view of all doctors
  - Columns: Name, Credentials, Specializations, Experience, Status (Active/Inactive)
  - Add/Edit/Delete functionality
  - Similar UX to news management

**DoctorsModal Component** (`components/admin/DoctorsModal.tsx`)
- Form fields:
  - Name (required)
  - Credentials (required) - e.g., DDS, DMD
  - Experience (years)
  - Education (school/university)
  - Biography (required)
  - Specializations (multi-checkbox) - 9 options:
    - General Dentistry
    - Cosmetic Dentistry
    - Orthodontics
    - Periodontics
    - Endodontics
    - Prosthodontics
    - Oral Surgery
    - Pediatric Dentistry
    - Implant Dentistry
  - Profile image upload
  - Active toggle
- Features:
  - Image preview with remove option
  - Multi-select specializations
  - Detailed validation

#### Staff Management (`/admin/staff`)
- URL: `http://localhost:3000/admin/staff`
- Features:
  - Table view with order column for display sequence
  - Columns: Order, Name, Role, Department, Status
  - Supports reordering via order field

**StaffModal Component** (`components/admin/StaffModal.tsx`)
- Form fields:
  - Name (required)
  - Role (required) - e.g., Dental Hygienist
  - Department dropdown (Reception, Dental Hygiene, Nursing, Administrative, Laboratory, Sterilization)
  - Experience (years)
  - Biography (required)
  - Display Order (for sorting)
  - Profile image upload
  - Active toggle
- Features:
  - Image preview
  - Department selection

#### Team Management (`/admin/team`)
- URL: `http://localhost:3000/admin/team`
- Features:
  - Table view of team members with order column
  - Add/Edit/Delete functionality
  - Status indicators (Active/Inactive)

**TeamModal Component** (`components/admin/TeamModal.tsx`)
- Form fields:
  - Name (required)
  - Position (required) - e.g., Lead Dentist
  - Biography (required)
  - Display Order
  - Profile image upload
  - Active toggle

### 5. Environment Configuration

Create `.env.local` file in project root:
```
MONGODB_URI=mongodb://localhost:27017/hainescitydental
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD_HASH=<bcrypted-hash-of-password>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note**: For production deployment:
1. Use a real MongoDB Atlas cluster (not localhost)
2. Generate a strong random JWT_SECRET
3. Use Cloudinary or similar service for image storage
4. Never commit `.env.local` to version control

### 6. Installed Dependencies

The following packages were added for CMS functionality:
```json
{
  "mongoose": "^8.x",                 // MongoDB ODM
  "jsonwebtoken": "^9.x",             // JWT token generation/verification
  "bcryptjs": "^2.x",                 // Password hashing
  "next-cloudinary": "^5.x",          // Cloudinary integration (optional)
  "multer": "^1.x",                   // File upload handling
  "dotenv": "^16.x",                  // Environment variables
  "zod": "^3.x",                      // Schema validation
  "react-hook-form": "^7.x",          // Form state management
  "react-toastify": "^10.x",          // Toast notifications
  "quill": "^2.x",                    // Rich text editor
  "react-quill": "^2.x",              // React wrapper for Quill
  "@hookform/resolvers": "^3.x"       // Form validation integration
}
```

## 🚀 Quick Start

### 1. Access Admin Panel
1. Navigate to `http://localhost:3000/admin/login`
2. Login with:
   - Username: `hainescitydental`
   - Password: `gATORRAID@422`

### 2. Manage Content
1. Click on any management card (News, Doctors, Staff, Team)
2. View existing content in table format
3. Click "Add" to create new content
4. Click "Edit" to modify existing content
5. Click "Delete" to remove content

### 3. Upload Images
- When creating/editing content, use the image upload area
- Supported formats: JPG, PNG, WebP
- Max file size: 5MB per image
- Images are stored in `/public/uploads/`

## 📝 Field Descriptions

### News Article
- **Title**: Headline of the article
- **Category**: Classification (General, Updates, Events, Tips, Announcements, Treatments)
- **Date**: Publication date
- **Description**: Short summary for listings (shows in news index)
- **Content**: Full article text with rich formatting
- **Images**: Supporting photos/graphics
- **Published**: Draft vs. published status

### Doctor
- **Name**: Full name
- **Credentials**: Professional degrees (e.g., DDS, DMD, FAGD)
- **Bio**: Professional background and experience
- **Specializations**: Areas of expertise (select multiple)
- **Experience**: Years in practice
- **Education**: School/university attended
- **Image**: Professional headshot
- **Active**: Whether to display on website

### Staff
- **Name**: Full name
- **Role**: Job title (e.g., Dental Hygienist, Receptionist)
- **Bio**: Role description and background
- **Department**: Team assignment
- **Experience**: Years in this role
- **Order**: Display sequence (0 = first)
- **Image**: Photo
- **Active**: Whether to display on website

### Team Member
- **Name**: Full name
- **Position**: Job title
- **Bio**: Professional background
- **Order**: Display sequence on "Our Team" page
- **Image**: Photo
- **Active**: Whether to display on website

## 🔄 Frontend Integration (Pending)

To connect the frontend pages to the CMS:

### Update News Page
```typescript
// app/pages/News.tsx
const [articles, setArticles] = useState([]);

useEffect(() => {
  fetch('/api/news')
    .then(res => res.json())
    .then(data => setArticles(data));
}, []);

return articles.map(article => (
  <NewsCard key={article._id} article={article} />
));
```

### Update Doctors Page
```typescript
// app/pages/Doctors.tsx
const [doctors, setDoctors] = useState([]);

useEffect(() => {
  fetch('/api/doctors')
    .then(res => res.json())
    .then(data => setDoctors(data));
}, []);
```

### Update Staff Page
```typescript
// app/pages/Staff.tsx
const [staff, setStaff] = useState([]);

useEffect(() => {
  fetch('/api/staff')
    .then(res => res.json())
    .then(data => setStaff(data));
}, []);
```

### Update Team Page
```typescript
// app/pages/Team.tsx
const [team, setTeam] = useState([]);

useEffect(() => {
  fetch('/api/team')
    .then(res => res.json())
    .then(data => setTeam(data));
}, []);
```

## 🔐 Security Notes

1. **Token Management**:
   - JWT tokens expire after 24 hours
   - Tokens stored in browser localStorage
   - Always include Authorization header: `Bearer <token>`

2. **File Uploads**:
   - Only authenticated users can upload
   - File type validation (JPG, PNG, WebP)
   - File size limit: 5MB
   - Files stored with timestamp to prevent collisions

3. **Production Checklist**:
   - [ ] Change JWT_SECRET to random 64+ character string
   - [ ] Use MongoDB Atlas (encrypted, backed up)
   - [ ] Configure Cloudinary for cloud image storage
   - [ ] Add HTTPS enforcement
   - [ ] Set up rate limiting on /api/auth
   - [ ] Enable CORS properly
   - [ ] Regular database backups
   - [ ] Monitor admin login attempts
   - [ ] Add 2FA for admin accounts (optional)

## 🐛 Troubleshooting

### "Failed to connect to MongoDB"
- Check MONGODB_URI in .env.local
- Ensure MongoDB server is running locally or Atlas cluster is accessible
- Check network connectivity

### "Unauthorized" errors on API calls
- Ensure token is being sent in Authorization header
- Check token hasn't expired (24-hour expiration)
- Try logging out and logging back in

### "Failed to upload image"
- Check file size (max 5MB)
- Check file format (JPG, PNG, WebP only)
- Ensure `/public/uploads/` directory exists and is writable
- Check available disk space

### "Article not showing on website"
- Ensure "Published" toggle is enabled
- Check article date is not in the future
- Verify frontend page is fetching from `/api/news` endpoint
- Clear browser cache

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console (F12)
3. Check server logs for API errors
4. Contact development team

---

**Last Updated**: January 15, 2026
**CMS Version**: 1.0
**Next.js**: 14.2.35
**MongoDB**: Compatible with local and Atlas
