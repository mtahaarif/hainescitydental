# Deploy to Vercel - Step by Step

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `hainescitydental` (or any name you prefer)
3. Description: `Haines City Dental - Modern Dental Website`
4. Choose: **Public** (required for free tier)
5. Click **"Create repository"**

## Step 2: Push Local Repository to GitHub

After creating the GitHub repo, you'll see commands. Run these in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hainescitydental.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**If you get authentication errors:**
- Use a Personal Access Token instead of password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Step 3: Deploy to Vercel

### Option A: Automatic (Easiest)

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/hainescitydental`
4. Click **"Import"**
5. Vercel will auto-detect Next.js
6. Click **"Deploy"**
7. **Done!** ✅ Your site is live in ~2 minutes

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Then follow the prompts - it will:
- Ask for GitHub auth
- Detect the project
- Deploy automatically

## Step 4: Custom Domain (Optional)

After deployment, you can add a custom domain:

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your domain (`hainescitydental.com`)
4. Update DNS records at your domain provider
5. Vercel will guide you through DNS setup

## What Happens After Deploy

✅ Website is **live at** `https://YOUR_PROJECT.vercel.app`
✅ Every `git push` to `main` **auto-deploys** (no manual step needed!)
✅ Preview deployments for pull requests
✅ Automatic SSL certificate
✅ CDN worldwide (fast for all users)
✅ Free tier includes everything you need

## Troubleshooting

**Build fails?**
- Check terminal output for errors
- Most common: missing files or imports
- Vercel shows build logs

**Site shows blank?**
- Clear browser cache
- Wait 30 seconds for CDN to update
- Check build logs for errors

**Need rollback?**
- Go to Vercel dashboard
- Click project → Deployments
- Click the ⚙️ icon next to any previous deployment
- Choose "Redeploy"

## Environment Variables (If Needed Later)

If you add backend features later:
1. Vercel dashboard → Project → Settings → Environment Variables
2. Add variables for production
3. Redeploy automatically triggers

---

## Quick Commands Reference

```bash
# From project directory:

# Check git status
git status

# See commits
git log --oneline

# After making changes, push to GitHub
git add .
git commit -m "Your message"
git push origin main

# This auto-triggers Vercel deployment!
```

---

## Current Status

✅ Code ready
✅ Local git repo created
✅ Next step: Push to GitHub
✅ Then: Deploy to Vercel

**Total time: ~5 minutes** 🚀

---

Need help? 
- Vercel docs: https://vercel.com/docs
- GitHub docs: https://docs.github.com
