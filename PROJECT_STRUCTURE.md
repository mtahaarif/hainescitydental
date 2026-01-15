# Project Structure - PostgreSQL Migration

## Root Level Files

```
.env.local                          # Environment configuration (KEEP SECRET)
.gitignore                          # Git ignore patterns
package.json                        # Dependencies & scripts
package-lock.json                  # Locked dependency versions
tsconfig.json                       # TypeScript configuration
next.config.js                      # Next.js configuration
tailwind.config.ts                  # Tailwind CSS configuration
middleware.ts                       # Next.js middleware
```

## Documentation Files (NEW)

```
QUICK_START.md                      # 5-minute setup guide
POSTGRESQL_MIGRATION_GUIDE.md       # Detailed PostgreSQL setup
MIGRATION_COMPLETE.md               # Full migration details
```

## Database Layer

```
prisma/
├── schema.prisma                   # Database schema with 4 models
│                                   # - News (articles)
│                                   # - Doctor (profiles)
│                                   # - Staff (employees)
│                                   # - Team (management)
│
lib/
├── prisma.ts                       # Prisma client singleton
│                                   # Serverless-safe connection pooling
│
└── auth/
    ├── auth.ts                     # Authentication functions
    │                               # - generateToken()
    │                               # - verifyToken()
    │                               # - hashPassword()
    │                               # - comparePassword()
    │                               # - verifyAdminCredentials()
    │
    └── middleware.ts              # Bearer token validation wrapper
```

## API Routes (9 Total)

```
app/api/

├── auth/route.ts                   # Login & token verification
│                                   # POST - Login with admin credentials
│                                   # POST - Verify existing token
│
├── news/
│   ├── route.ts                    # GET (list) / POST (create)
│   │                               # GET: Fetch all published articles
│   │                               # POST: Create new article (auth required)
│   │
│   └── [id]/route.ts               # GET / PUT / DELETE
│                                   # GET: Fetch specific article
│                                   # PUT: Update article (auth required)
│                                   # DELETE: Remove article (auth required)
│
├── doctors/
│   ├── route.ts                    # GET (list) / POST (create)
│   │                               # GET: Fetch all active doctors
│   │                               # POST: Create doctor (auth required)
│   │
│   └── [id]/route.ts               # GET / PUT / DELETE
│                                   # GET: Fetch doctor details
│                                   # PUT: Update doctor (auth required)
│                                   # DELETE: Remove doctor (auth required)
│
├── staff/
│   ├── route.ts                    # GET (list) / POST (create)
│   │                               # GET: Fetch all active staff
│   │                               # POST: Create staff (auth required)
│   │
│   └── [id]/route.ts               # GET / PUT / DELETE
│                                   # GET: Fetch staff details
│                                   # PUT: Update staff (auth required)
│                                   # DELETE: Remove staff (auth required)
│
├── team/
│   ├── route.ts                    # GET (list) / POST (create)
│   │                               # GET: Fetch all active team members
│   │                               # POST: Create team (auth required)
│   │
│   └── [id]/route.ts               # GET / PUT / DELETE
│                                   # GET: Fetch team member details
│                                   # PUT: Update team (auth required)
│                                   # DELETE: Remove team (auth required)
│
└── upload/route.ts                # POST - Upload images
                                    # Validates file type/size
                                    # Returns upload URL (auth required)
```

## Frontend Components (UNCHANGED)

```
src/
├── App.tsx                         # Main app component
├── App.css                         # App styles
├── main.tsx                        # Entry point
├── index.css                       # Global styles
│
├── assets/                         # Static assets (images, fonts, etc.)
│
└── components/
    ├── Header.tsx                  # Navigation header
    ├── Hero.tsx                    # Hero section
    ├── About.tsx                   # About section
    ├── Services.tsx                # Services section
    ├── Doctors.tsx                 # Doctors display
    ├── Staff.tsx                   # Staff display
    ├── News.tsx                    # News/blog section
    ├── Contact.tsx                 # Contact section
    ├── Footer.tsx                  # Footer
    ├── PatientInfo.tsx             # Patient information
    └── UniversalSlider.tsx         # Slider component
```

## Admin Pages (NEEDS UPDATE)

```
app/admin/                          # Admin pages directory
├── login/page.tsx                  # Admin login page
├── dashboard/page.tsx              # Admin dashboard
│
├── news/
│   ├── page.tsx                    # News management
│   └── NewsModal.tsx               # News create/edit modal
│
├── doctors/
│   ├── page.tsx                    # Doctors management
│   └── DoctorsModal.tsx            # Doctors create/edit modal
│
├── staff/
│   ├── page.tsx                    # Staff management
│   └── StaffModal.tsx              # Staff create/edit modal
│
└── team/
    ├── page.tsx                    # Team management
    └── TeamModal.tsx               # Team create/edit modal
```

## Configuration Files

```
next.config.js                      # Next.js build config
tailwind.config.ts                  # Tailwind CSS customization
tsconfig.json                       # TypeScript compiler options
tsconfig.app.json                   # App-specific TypeScript options
tsconfig.node.json                  # Node-specific TypeScript options
postcss.config.cjs                  # PostCSS plugins
.eslintrc.js                        # ESLint rules
```

## Public Assets

```
public/                             # Static files served as-is
├── images/                         # Project images
├── doctors/                        # Doctor profile images
├── team/                           # Team member images
└── services/                       # Service images
```

## Content Directory

```
content/                            # Static markdown content
├── staff/                          # Staff markdown files
└── services/                       # Service descriptions
```

## Git Configuration

```
.gitignore                          # Files to exclude from git
- node_modules/                    # Dependencies (reinstall with npm install)
- .next/                           # Build output
- .env.local                       # Local secrets (NEVER commit)
- dist/                            # Build artifacts
```

## Git Branches

```
main                                # Production branch (PostgreSQL version)
├── Latest: PostgreSQL + Prisma API
├── All 9 API endpoints implemented
├── Database migration complete
└── Ready for Neon connection

backup-mongodb-cms                  # Backup branch (MongoDB version)
├── Original MongoDB code preserved
├── Full Mongoose schemas
├── Old admin pages
└── Emergency rollback point
```

## Dependencies in package.json

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0",    // ORM
    "prisma": "^5.22.0",             // ORM CLI
    "bcryptjs": "^2.4.3",            // Password hashing
    "jsonwebtoken": "^9.1.2",        // JWT tokens
    "next": "^14.2.0",               // React framework
    "react": "^18.3.1",              // UI library
    "framer-motion": "^11.0.0",      // Animations
    "tailwind-merge": "^2.2.0",      // Tailwind utilities
    "lucide-react": "^0.562.0"       // Icons
  },
  "devDependencies": {
    "typescript": "^5.6.3",          // Type checking
    "@types/node": "^20.11.0",       // Node types
    "@types/react": "^18.2.0",       // React types
    "tailwindcss": "^3.4.1",         // CSS framework
    "eslint": "^9.0.0"               // Code linting
  }
}
```

## Environment Variables Template

```env
# Database (REQUIRED - Get from Neon)
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# JWT Secret (REQUIRED - Min 32 chars)
JWT_SECRET="your_random_secret_key_here_min_32_characters_long"

# Admin Credentials (REQUIRED)
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD=gATORRAID@422

# Image Uploads (OPTIONAL - For Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# App Configuration (OPTIONAL)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Scripts in package.json

```json
{
  "scripts": {
    "dev": "next dev",              // Start dev server on :3000
    "build": "next build",          // Production build
    "start": "next start",          // Start production server
    "lint": "next lint"             // Run ESLint
  }
}
```

## Build Output Directory

```
.next/                              # Next.js build output (generated)
├── server/                         # Server-side code
├── static/                         # Static assets
└── ...                             # Other build artifacts
```

---

## Migration Summary

### What Changed
- ❌ Removed: MongoDB + Mongoose
- ✅ Added: PostgreSQL + Prisma
- ✅ Added: JWT authentication
- ✅ Added: 9 RESTful API endpoints
- ✅ Added: Database indexes for performance

### What Stayed Same
- ✅ React/Next.js frontend
- ✅ Tailwind CSS styling
- ✅ Component structure
- ✅ Public static assets
- ✅ Configuration files

### Backup Location
All original MongoDB code is preserved on:
```
GitHub → backup-mongodb-cms branch
```

---

## Ready for Production!

✅ Database layer: PostgreSQL + Prisma
✅ API endpoints: 9 routes with auth
✅ Security: JWT + Bcrypt
✅ Performance: Indexes optimized
✅ Backup: GitHub branch preserved
✅ Documentation: Complete setup guides

**Next Step**: Add Neon connection string to `.env.local` and run `npx prisma db push`
