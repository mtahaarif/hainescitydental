# Content Management System User Guide
## Haines City Dental Website - Complete Control Portal

---

## 🎯 Overview

Your website is now completely controlled through the **Decap CMS portal**. You have full authority to:
- ✅ Add, edit, and delete doctors and staff profiles
- ✅ Create, modify, and delete news articles and community stories  
- ✅ Manage all dental services offered
- ✅ Add and manage patient testimonials
- ✅ Upload and organize all website images (hero, sliders, doctors, staff, news, etc.)
- ✅ Update company logo, contact info, and all text descriptions
- ✅ Manage image gallery and media assets

All changes are automatically saved to GitHub and the website rebuilds within 2-5 minutes.

---

## 🔑 Accessing the CMS

1. **Go to:** `https://hainescitydental.vercel.app/admin`
2. **Login with GitHub:**
   - Use your GitHub account credentials
   - Click "Login with GitHub" and authorize access
   - Once authenticated, you'll see the admin dashboard with all content collections

---

## 📝 What You Can Control

### 1. **Doctors** 👨‍⚕️
**Complete control over doctor profiles - add new doctors, edit existing ones, or remove them**

Fields you can edit:
- **Name:** Doctor's full name
- **Title/Degree:** (DMD, DDS, etc.)
- **Photo:** Upload doctor portrait or professional headshot
- **Order:** Set the display order (1, 2, 3...)
- **Bio Sections:** Create multiple sections for their background
  - Education & Credentials
  - Professional Experience
  - Specializations & Expertise
  - Philosophy & Approach

**What happens on the website:** Doctors appear on the "Meet the Doctors" page and "Our Team" section with full carousel and bio tabs.

---

### 2. **Staff Members** 👥
**Manage your entire team - add new staff, edit roles/bios, or remove departing team members**

Fields you can manage:
- **Name:** Staff member's full name
- **Role/Position:** Job title (Office Manager, Hygienist RDH, etc.)
- **Photo:** Professional staff photo
- **Biography:** Detailed experience and qualifications
- **Order:** Control display sequence on the website

**What happens:** Staff profiles display on the "Our Team" page with an interactive carousel.

---

### 3. **Dental Services** 🦷
**Full control over all services - add new offerings, modify descriptions, or discontinue services**

Manage:
- **Service Name & Subtitle**
- **Detailed Description** - Full explanation of what the service includes
- **Service Image** - Visual representation of the service
- **Icon** - Visual icon (Star, Heart, Zap, Shield, Clock, etc.)
- **Key Points** - List of benefits or what's included
- **Order** - Display sequence on Services page

**Current services under your control:**
- Cosmetic Dentistry
- General Dentistry
- Implant Dentistry
- Periodontal Therapy
- Sedation Dentistry
- Orthodontics
- Snoring & Sleep Apnea

---

### 4. **News & Community** 📰
**Publish unlimited news, training updates, community involvement, and mission stories**

Create news posts with:
- **Title:** Headline for the article
- **Category:** Choose from:
  - Training (continuing education, courses)
  - Community (volunteering, outreach)
  - Conference (dental conferences, events)
  - Mission (charitable/mission work)
- **Date:** When the event occurred
- **Multiple Images:** Upload gallery of photos
- **Full Description:** Story details

**What happens:** News appears on the "News & Community" page with category filtering and image galleries.

---

### 5. **Patient Testimonials** ⭐
**Add patient reviews and manage testimonials - build trust with prospective patients**

Control:
- **Patient Name**
- **"Patient Since" Date** (e.g., "Patient since 2018")
- **Testimonial Text:** The review content
- **Star Rating:** (1-5 stars)
- **Date Added**
- **Order:** Display sequence

**What happens:** Testimonials appear on the homepage with rotating display and full testimonial section.

---

### 6. **Site Settings** ⚙️
**Update company-wide information that appears across the website**

#### Contact Information
- Practice name
- Full address (multiple lines)
- Phone numbers (main and toll-free)
- Email address
- Office hours

#### About Information
- Founded year
- Mission statement
- Practice values
- Commitment to patients
- Statistics (years of experience, patient count, services offered)

#### Homepage Hero Section
- Main heading/headline
- Description/tagline
- Button text for calls-to-action

---

### 7. **Image Gallery & Media** 📸
**Upload and organize all images used on the website**

Upload images for:
- Doctor profiles
- Staff photos
- Service illustrations
- Hero/banner images
- News article photos
- Testimonial images (optional)
- Company logo
- Slider images
- Any other website images

**Organization:** Categorize by type (doctors, staff, services, news, hero, testimonials, other) for easy management.

---

## 🖼️ Image Management Guide

### Uploading Images

**Option 1: Direct Upload in CMS**
1. Click on any **Image field** in a content form
2. Click **"Upload"** button
3. Select image from your computer
4. Image automatically saves to `/public/uploads/`
5. The path will be auto-filled in the form

**Option 2: Use Existing Images**
1. If image already exists in `/public/` folder (e.g., `/dr-sohail-khan.jpg`)
2. Enter the path manually in the image field
3. Make sure the image file exists

### Image Best Practices
- **Profile Photos:** 800x800px minimum, JPG or PNG
- **Service Images:** 1200x800px for best display
- **News Photos:** 1200x800px to 1600x900px
- **File Size:** Keep under 500KB for fast loading
- **Format:** JPG for photos, PNG for graphics with transparency, WebP for best compression
- **Logo:** 300x100px minimum, PNG recommended

---

## ✏️ How to Edit Content

### Editing Existing Content

1. **Log into admin panel:** Visit `/admin`
2. **Select content type** from left sidebar (Doctors, Staff, Services, News, etc.)
3. **Click on the item** you want to edit
4. **Make your changes** in the form
5. **Click "Publish"** button to save
6. **Changes appear live** in 2-5 minutes after website rebuilds

### Adding New Content

1. **Log into admin panel**
2. **Select content type** (e.g., "Dental Services")
3. **Click "New [Content Type]"** button (e.g., "New Dental Services")
4. **Fill in all required fields** (marked with *)
5. **Upload images** if needed
6. **Click "Publish"** to save
7. **New item appears** on website after rebuild completes

### Deleting Content

1. **Log into admin panel**
2. **Select content type**
3. **Click on item** you want to remove
4. **Click "Delete"** button (usually in top menu)
5. **Confirm deletion**
6. **Item removed** from website after rebuild

### Saving Drafts

- You can click **"Save Draft"** to save work without publishing
- Drafts don't appear on the live website
- Perfect for working on content across multiple sessions

---

## 🔄 How Changes Work (Behind the Scenes)

1. You make changes in the CMS admin panel
2. Click "Publish" to save
3. Changes are automatically committed to GitHub repository
4. GitHub notifies Vercel (hosting service) of the update
5. Vercel rebuilds the entire website with new content
6. Updated website goes live within **2-5 minutes**

**Note:** Changes don't appear instantly! Always wait a few minutes and refresh your browser.

---

## 🆘 Common Tasks & Solutions

### "I want to add a new doctor"
1. Go to **Doctors** collection
2. Click **"New Doctors"** button
3. Fill in: Name, Title, Photo, Bio sections
4. Click **"Publish"**
5. New doctor appears on "Meet the Doctors" page in 2-5 min

### "I want to update staff bios"
1. Go to **Staff Members** collection
2. Click on staff member you want to edit
3. Update the bio and/or photo
4. Click **"Publish"**
5. Updated bio appears on website

### "I want to post news about recent events"
1. Go to **News & Community** collection
2. Click **"New News Articles"**
3. Add title, select category, upload photos, write description
4. Click **"Publish"**
5. News appears on News & Community page

### "I want to add a new service"
1. Go to **Dental Services** collection
2. Click **"New Dental Services"**
3. Add service name, description, image, and key points
4. Click **"Publish"**
5. Service appears on Services page

### "I want to add a patient testimonial"
1. Go to **Patient Testimonials** collection
2. Click **"New Patient Testimonials"**
3. Add patient name, since date, testimonial text, and rating
4. Click **"Publish"**
5. Testimonial appears on homepage

### "Can't Login"
- Make sure you have a GitHub account
- Check GitHub notifications for any permission requests
- Try logging out of GitHub and back in
- Clear browser cache and try again

### "Changes Not Appearing"
- Wait 5-10 minutes for rebuild to complete
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Verify you clicked "Publish" not "Save Draft"
- Check that image paths are correct if images don't show

### "Image Not Showing"
- Verify image path starts with `/` (e.g., `/uploads/image.jpg`)
- Check that image file actually uploaded
- Try uploading image again through CMS
- Ensure image format is JPG, PNG, or WebP

### "Lost Work After Crash/Close"
- CMS auto-saves drafts frequently
- Click "Save Draft" often when editing large content
- Don't close browser tab until you click "Publish"

---

## 💡 Best Practices for Website Management

### Content Quality
1. ✅ **Save Frequently:** Click "Save Draft" often
2. ✅ **Preview Before Publishing:** Check how content looks
3. ✅ **Use Consistent Formatting:** Keep bios/descriptions similar length
4. ✅ **Professional Photos:** Use high-quality, well-lit images
5. ✅ **Update Regularly:** Keep news and testimonials current
6. ✅ **Backup Text:** Copy long content to a document before editing

### Image Management
1. **Optimize Images:** Compress before uploading for faster load times
2. **Consistent Style:** Use similar photo styles across team photos
3. **Good Lighting:** Professional headshots with proper lighting
4. **Consistent Sizing:** Keep images consistent dimensions
5. **Alt Text:** Always add descriptive alt text for accessibility

### SEO & Marketing
1. Use descriptive titles for news posts
2. Include keywords in service descriptions
3. Keep doctor/staff bios detailed (Google loves content)
4. Update news regularly (fresh content helps rankings)
5. Include patient testimonials (builds trust & SEO)

---

## 🔐 Security & Access

- **Never share** your GitHub login credentials
- **Only authorized staff** should have admin access
- **Log out** when finished editing
- **Use strong password** for your GitHub account
- Admin panel only accessible to authenticated GitHub users
- All changes are tracked and can be reverted if needed

---

## 📊 What You Can Track

The CMS automatically tracks:
- Who made changes (GitHub username)
- When changes were made
- What was changed
- History of all edits (can revert if needed)

---

## 📞 Technical Support

If you encounter issues:

1. **Take a screenshot** of the error
2. **Note what you were trying** to do
3. **Describe the issue** in detail
4. **Contact web developer** with this information

Common issues are usually resolved by:
- Waiting for rebuild to complete
- Clearing browser cache
- Logging out and back in
- Checking image paths and file formats

---

## 🎓 Training Videos & Resources

**Key CMS Features:**
- **Add Content:** Collections page > New [Type] > Fill form > Publish
- **Edit Content:** Collections page > Click item > Edit > Publish
- **Delete Content:** Collections page > Click item > Delete > Confirm
- **Upload Images:** Any image field > Upload > Select file > Submit

---

## 📈 Website Performance

After making changes:
- **2-5 minutes:** Website rebuilds
- **5-10 minutes:** Changes fully live and visible to all users
- **All devices:** Changes appear on mobile, tablet, and desktop

---

## 🎉 You're All Set!

You now have **complete control** over your dental practice website. You can:
- ✅ Manage your team (doctors and staff)
- ✅ Showcase your services
- ✅ Share your community involvement
- ✅ Display patient testimonials
- ✅ Upload and manage all images
- ✅ Update contact information
- ✅ Control all website content

**No coding required** - just point and click!

For questions or issues, contact your web developer.

---

**Last Updated:** January 2026  
**CMS Version:** Decap CMS 3.0.0  
**Website:** https://hainescitydental.vercel.app  
**Admin Portal:** https://hainescitydental.vercel.app/admin
