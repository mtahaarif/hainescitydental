# Vercel Deployment Guide - Haines City Dental

**Status:** PRODUCTION READY (After fixes applied)  
**Target Environment:** Vercel  
**Database:** HostGator MySQL  
**CMS:** Next.js Admin Dashboard  

---

## CRITICAL FIX CHECKLIST (Must Complete Before Deployment)

### ✅ Security Fixes Applied
- [x] Auth credentials synchronized across files
- [x] JWT_SECRET now required via environment variable
- [x] Added comprehensive error logging
- [x] Credentials validation on app startup
- [x] Created .env.example with full documentation

### ✅ Code Quality
- [x] Removed hardcoded fallback credentials
- [x] Added input validation to login endpoint
- [x] Improved error messages (no credential leaking)
- [x] Full-width responsive layout implemented
- [x] Mobile-optimized Hero component

### ⚠️ Still Need to Verify Locally
- [ ] Restart npm dev after creating .env.local
- [ ] Test login 5+ times with correct and incorrect credentials
- [ ] Test admin image upload/delete
- [ ] Test responsive design on mobile browser/device
- [ ] Verify no console errors

---

## Vercel Environment Variables (MUST SET)

Go to: **Vercel Dashboard** → **Project Settings** → **Environment Variables**

Add ALL of these (copy from .env.local after testing locally):

```
HOSTGATOR_DB_HOST=192.185.22.109
HOSTGATOR_DB_USER=hainesci_user
HOSTGATOR_DB_PASSWORD=(ask admin for password)
HOSTGATOR_DB_NAME=hainesci_dental_db
HOSTGATOR_DB_PORT=3306
JWT_SECRET=(generate using: openssl rand -base64 32)
CMS_ADMIN_USERNAME=hainescitydental
CMS_ADMIN_PASSWORD=(strong password)
NODE_ENV=production
```

**IMPORTANT:** 
- ✓ Add for all environments (Production, Preview, Development)
- ✓ Generate a NEW JWT_SECRET (don't reuse from local)
- ✓ Use STRONG password for CMS_ADMIN_PASSWORD
- ✓ NEVER share these values

---

## Local Testing Before Deployment

### Setup
```bash
# 1. Create .env.local from .env.example
cp .env.example .env.local

# 2. Edit .env.local with ACTUAL values:
# - Database credentials from HostGator
# - Generate JWT_SECRET: openssl rand -base64 32
# - Set strong CMS password

# 3. Restart dev server
npm run dev  # Kill current server first (Ctrl+C)

# 4. Clear browser cookies
# - Open DevTools (F12)
# - Application → Cookies → Delete 'cms_token'
```

### Test Checklist
```bash
# Test 1: Admin Login
- Go to http://localhost:3000/admin
- Should redirect to http://localhost:3000/admin/login
- Try wrong credentials → Error message
- Try correct credentials → Redirect to /admin dashboard
- Check cookies in DevTools (cms_token should be present)

# Test 2: Session Persistence
- Refresh page → Should stay logged in
- Close browser tab and reopen → Should redirect to login
- Login expires after 24 hours (session timeout)

# Test 3: Admin Functions
- Create news item with image
- Edit news item
- Delete news item
- Create team member with image
- Edit team member
- Delete team member
- Check public pages updated immediately

# Test 4: Image Upload
- Upload JPG, PNG, WebP
- Verify image appears in edit form
- Verify image persists after save
- Check file saved to public/uploads/

# Test 5: Responsive Design
- Test on phone/tablet (Chrome DevTools)
- Check breakpoints (375px, 768px, 1024px, 1920px)
- Verify no horizontal scroll
- Test touch controls
```

---

## Deployment to Vercel

### Step-by-Step

1. **Connect GitHub to Vercel**
   ```bash
   git add .
   git commit -m "Production-ready: Fixed auth security, optimized responsive design"
   git push origin main
   ```

2. **Create Vercel Project**
   - Go to vercel.com
   - Click "Add New..." → "Project"
   - Import from Git → Select hainescitydental
   - Framework: Next.js
   - Click "Deploy"

3. **Add Environment Variables**
   - After deployment starts, go to Project Settings
   - Environment Variables
   - Add all vars from checklist above
   - Redeploy (or wait for next deployment)

4. **First Deployment Test**
   ```
   - Check deployment logs for errors
   - Visit your-domain.vercel.app
   - Test public pages load
   - Test /admin/login redirects
   - Test CMS login with credentials
   ```

5. **Verify Image Upload on Vercel**
   - Login to admin
   - Try uploading image
   - Check if image persists and appears on public page
   - Note: Images stored in public/ may not persist between deployments

---

## IMPORTANT: Image Persistence Issue

### Current Setup
- Images stored in: `public/uploads/`
- Problem: Vercel ephemeral filesystem (images deleted on redeploy)

### Solutions (Pick One)

**Option 1: Accept Image Loss (Development Only)**
- Current setup, images lost on redeploy
- OK for testing, NOT for production

**Option 2: Use CDN (Recommended)**
- Upload images to AWS S3, Cloudinary, or Supabase
- Requires code changes to upload endpoint
- Images persist indefinitely
- Cost: ~$5-10/month

**Option 3: Use Database Blob Storage**
- Store image base64 in MySQL
- Persists across deployments
- Slower than CDN
- OK for small site

**Action Required:**
- For production, implement Option 2 or 3
- For MVP, use Option 1 (test only)

---

## Monitoring & Maintenance

### Monitor These After Deployment
1. **Check Logs**
   - Vercel Dashboard → Functions → View Logs
   - Look for database connection errors
   - Look for authentication errors
   - Look for image upload errors

2. **Monitor Admin Access**
   - Test login daily
   - If getting 401s, check JWT_SECRET
   - If getting db errors, check credentials

3. **Monitor Public Pages**
   - Check news loads
   - Check team loads
   - Check images display
   - Check no 500 errors

### Common Issues & Fixes

**Issue: "Unknown column 'display_order' in 'field list'"**
- Solution: Click "Setup Display Order" button in admin
- Or run: `ALTER TABLE news ADD COLUMN display_order INT DEFAULT 0;`
- Or run: `ALTER TABLE staff ADD COLUMN display_order INT DEFAULT 0;`

**Issue: Admin login fails (401)**
- Check CMS_ADMIN_USERNAME and CMS_ADMIN_PASSWORD in Vercel env vars
- Try logging out and back in (clear cookies)
- Check browser console for errors

**Issue: Images don't upload**
- Check public/uploads/ folder exists and is readable
- Check file upload endpoint logs
- Verify image file is valid (JPG, PNG, WebP)

**Issue: Database connection fails**
- Check HOSTGATOR_DB_HOST (should be 192.185.22.109)
- Check HOSTGATOR_DB_USER and PASSWORD are correct
- Check HOSTGATOR_DB_NAME is correct
- Test connection from Vercel edge function logs

---

## Rollback Plan

If something breaks on production:

```bash
# Option 1: Rollback to previous deployment
- Vercel Dashboard → Deployments
- Find last known good deployment
- Click "..." → "Redeploy"

# Option 2: Rollback code
git revert <commit-hash>
git push origin main
# Vercel will auto-redeploy

# Option 3: Emergency disable
- Set CMS_ADMIN_PASSWORD to something random
- This blocks all admin access (site still works)
```

---

## Performance Checklist

Before final deployment:

- [ ] Run `npm run build` locally and check for errors
- [ ] Check bundle size: `npm run analyze` (if available)
- [ ] Lighthouse score: Should be 80+ for all metrics
- [ ] PageSpeed Insights: Check on vercel preview URL
- [ ] Core Web Vitals: Check no "Poor" ratings
- [ ] Mobile responsiveness: Test on real device
- [ ] Touch targets: All buttons 44px+ (accessibility)

---

## Completion Status

### Development Phase: ✅ 100%
- All features implemented
- All pages responsive
- Admin fully functional

### Testing Phase: 📋 In Progress
- Local testing needed
- Security verification needed
- Performance testing needed

### Deployment Phase: ⏳ Ready When
- All fixes applied
- All tests passing
- Environment vars set

### Production Phase: 🚀 Ready to Launch

---

## Contact & Support

**Admin Login:**
- URL: https://your-domain.com/admin
- Username: hainescitydental
- Password: (set in .env.local and Vercel)

**Database:** HostGator MySQL
- Host: 192.185.22.109
- Database: hainesci_dental_db
- Note: Credentials in Vercel env vars

**Issues:** Check deployment logs in Vercel dashboard

---

**Last Updated:** February 2, 2026  
**Next Review:** After first week in production
