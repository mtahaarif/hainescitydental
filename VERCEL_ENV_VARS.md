# Vercel Environment Variables Checklist

**Last Updated:** February 2, 2026  
**Status:** Ready for Vercel Project Configuration  

Use this checklist to populate environment variables in your Vercel Project Settings → Environment Variables.

---

## 📋 Required Variables

Add these to **Vercel Project Settings** → **Environment Variables**:

### Database Configuration
| Key | Value | Environments | Notes |
|-----|-------|--------------|-------|
| `HOSTGATOR_DB_HOST` | `192.185.22.109` | Production, Preview, Development | HostGator MySQL host |
| `HOSTGATOR_DB_USER` | `hainesci_hainescitydental` | Production, Preview, Development | HostGator database user |
| `HOSTGATOR_DB_PASSWORD` | `(use actual password from .env.local)` | Production, Preview, Development | **SENSITIVE** - do NOT commit |
| `HOSTGATOR_DB_NAME` | `hainesci_dental_db` | Production, Preview, Development | Database name |
| `HOSTGATOR_DB_PORT` | `3306` | Production, Preview, Development | MySQL port (default 3306) |

### Authentication & Security
| Key | Value | Environments | Notes |
|-----|-------|--------------|-------|
| `JWT_SECRET` | `(generate new: openssl rand -base64 32)` | Production, Preview, Development | **SENSITIVE** - must be 32+ chars |
| `CMS_ADMIN_USERNAME` | `hainescitydental` | Production, Preview, Development | Admin login username |
| `CMS_ADMIN_PASSWORD` | `(use actual password from .env.local)` | Production, Preview, Development | **SENSITIVE** - do NOT commit |

### Vercel Blob Storage
| Key | Value | Environments | Notes |
|-----|-------|--------------|-------|
| `BLOB_READ_WRITE_TOKEN` | `vercel_blob_rw_HUXTtpXMuYIrVBOB_BnREFFLtWNx63yGzlfwMU8kdjFam4G` | Production, Preview, Development | Vercel Blob API token for uploads |

### Node Environment
| Key | Value | Environments | Notes |
|-----|-------|--------------|-------|
| `NODE_ENV` | `production` | Production only | Set to `production` for Vercel |

---

## 🔐 Security Notes

- **NEVER commit `.env.local`** — it contains sensitive credentials
- **Sensitive values** (marked in table): DB password, JWT_SECRET, CMS password, Blob token
- **Local vs. Production**: Use different JWT_SECRET and strong passwords for production
- **For preview deployments**: Use the same values as production (or temporarily weaker ones for testing)

---

## 📝 Step-by-Step Setup

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/projects

2. **Select your project**
   - Click on: hainescitydental

3. **Go to Settings**
   - Click: Settings tab

4. **Navigate to Environment Variables**
   - Left sidebar: Environment Variables

5. **Add each variable**
   - For each row in the table above:
     - Key: (from "Key" column)
     - Value: (from "Value" column)
     - Environments: Select Production, Preview, Development (or as noted)
     - Click: Save

6. **Redeploy**
   - After adding all variables, trigger a new deployment
   - Vercel will rebuild with the new environment variables

---

## ✅ Verification Checklist

After setting environment variables in Vercel:

- [ ] All 10 variables added to Vercel
- [ ] All variables selected for correct environments (Production, Preview, Development)
- [ ] Sensitive values (password, JWT_SECRET, token) are NOT visible in `.env.example`
- [ ] Deployment logs show "Environment: Production"
- [ ] Admin login works on deployed site
- [ ] API endpoints return data (not 500 errors)
- [ ] Database connection logs visible in Vercel Real-time Logs

---

## 🔗 Related Documentation

- **Setup Vercel Blob:** See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Complete Deployment Guide:** See `PRODUCTION_DEPLOYMENT_SUMMARY.md`
- **Production Checklist:** See `PRE_DEPLOYMENT_CHECKLIST.md`

---

## 🚀 Deployment Status

**Before Vercel Env Vars Setup:**
- ⏳ Production deployment will fail with 500 errors
- ⏳ Blob uploads will fail (no token)
- ⏳ Database connection will fail (missing credentials)

**After Vercel Env Vars Setup:**
- ✅ Production deployment ready
- ✅ Blob uploads functional
- ✅ Database connections stable

---

**Ready? Follow the Step-by-Step Setup above.** 🚀
