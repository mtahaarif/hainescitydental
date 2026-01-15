# Local MongoDB Quick Start - Windows

## Step 1: Download & Install MongoDB

1. **Download** from: https://www.mongodb.com/try/download/community
   - Select: **Windows** → **MSI** → **Download**

2. **Run the installer** (MongoDB-Community-Windows-x86_64-8.0.0-signed.msi)

3. **Installation Options:**
   - ✅ Check "Install MongoDB Compass" (useful GUI)
   - ✅ Check "Install as a Service" (auto-starts on boot)
   - Complete the wizard

4. **Verify Installation:**
   - Open Command Prompt and run:
   ```bash
   mongosh
   ```
   - Should show connection message
   - Type `exit` to quit

---

## Step 2: Configure .env.local

Create `.env.local` file in project root (if not already there):

```env
MONGODB_URI=mongodb://localhost:27017/hainescitydental
JWT_SECRET=super-secret-key-change-this-in-production-at-least-32-chars
ADMIN_USERNAME=hainescitydental
ADMIN_PASSWORD=gATORRAID@422
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 3: Start Development Server

```bash
npm run dev
```

**Output should show:**
```
> next dev
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
```

---

## Step 4: Test Admin Access

1. Open browser: `http://localhost:3000/admin/login`
2. Login with:
   - Username: `hainescitydental`
   - Password: `gATORRAID@422`
3. You should see the Admin Dashboard

---

## Step 5: Create Sample Data

1. Click "News" card on dashboard
2. Click "Add News" button
3. Fill in:
   - Title: "Welcome to our Clinic"
   - Category: "General"
   - Date: Today's date
   - Description: "First news post"
   - Content: "This is a test article"
   - Click "Create Article"
4. You should see success message ✅

---

## Verify Data in Database

Open Command Prompt:

```bash
mongosh
use hainescitydental
db.news.find().pretty()
```

You should see your news article! 🎉

---

## MongoDB Service Commands

**Admin Command Prompt required:**

Start MongoDB:
```bash
net start MongoDB
```

Stop MongoDB:
```bash
net stop MongoDB
```

Check Status:
```bash
Get-Service MongoDB
```

Restart:
```bash
net stop MongoDB
net start MongoDB
```

---

## View Data with MongoDB Compass GUI

1. Open **MongoDB Compass** (installed automatically)
2. Click "Connect" (auto-connects to localhost:27017)
3. Click `hainescitydental` database
4. Explore collections:
   - news
   - doctors
   - staff
   - team
5. Click collection to view documents

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Connection refused" | `net start MongoDB` in Admin Command Prompt |
| "mongosh not found" | Restart Command Prompt after installation |
| "Database not found" | Create sample data via admin panel first |
| Port 27017 in use | Change MongoDB port or stop other services |

---

## You're All Set! 🎉

- ✅ MongoDB running locally
- ✅ Database connected to Next.js
- ✅ Admin panel working
- ✅ Ready to manage content

**Next:** Add more content via admin panel at `http://localhost:3000/admin/login`
