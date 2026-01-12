# Content Management System User Guide
## Haines City Dental Website

---

## 🎯 Overview

Your website now has a **Content Management System (CMS)** that allows you to easily add, edit, or delete content without any coding knowledge. All changes are automatically saved to GitHub and the website is rebuilt within minutes.

---

## 🔑 Accessing the CMS

1. **Go to:** `https://hainescitydental.vercel.app/admin`
2. **Login with GitHub:**
   - You'll need a GitHub account to access the admin panel
   - Click "Login with GitHub" and authorize access
   - Once authenticated, you'll see the admin dashboard

---

## 📝 What You Can Edit

### 1. **Doctors** 👨‍⚕️
- Add/Edit/Delete doctor profiles
- Fields:
  - **Name:** Doctor's full name (e.g., "Dr. Sohail Khan")
  - **Title:** Credentials (e.g., "DMD", "DDS")
  - **Image:** Upload doctor photo or enter image path (e.g., "/dr-name.jpg")
  - **Order:** Display order on the page (1, 2, 3...)
  - **Bio Sections:** Multiple sections for different aspects of their background
    - Education & Credentials
    - Professional Experience
    - Specializations & Expertise
    - Philosophy & Approach

### 2. **Staff Members** 👥
- Manage all staff profiles
- Fields:
  - **Name:** Staff member's name
  - **Role:** Job title (e.g., "Office Manager", "Dental Hygienist RDH")
  - **Bio:** Brief description of their experience and qualifications
  - **Image:** Upload staff photo or enter image path (e.g., "/staff-name.jpg")
  - **Order:** Display order on the page

### 3. **News & Updates** 📰
- Publish announcements, blog posts, or updates
- Fields:
  - **Title:** Article headline
  - **Date:** Publication date
  - **Category:** Type of post (e.g., "Announcement", "Dental Tips")
  - **Image:** Featured image for the article
  - **Excerpt:** Short summary for preview
  - **Content:** Full article text (supports formatting)

### 4. **Services** 🦷
- Add or modify dental services offered
- Fields:
  - **Category:** Service category (e.g., "General Dentistry", "Cosmetic")
  - **Title:** Service name
  - **Description:** What the service includes
  - **Services:** List of specific treatments in this category
  - **Image:** Service illustration or photo

### 5. **Testimonials** ⭐
- Add patient reviews and testimonials
- Fields:
  - **Name:** Patient name
  - **Rating:** Star rating (1-5)
  - **Text:** The testimonial content
  - **Date:** When the review was given
  - **Service:** What service they received (optional)

### 6. **Site Settings** ⚙️
- Update general site information
- **Contact Information:**
  - Address
  - Phone number
  - Email
  - Office hours
- **Hero Section:**
  - Homepage headline
  - Tagline
- **About Section:**
  - Mission statement
  - Practice values
  - Statistics (years in service, patients served, etc.)

---

## 📸 Adding Images

### Option 1: Upload New Image
1. In any content form, click on the **"Choose an image"** button
2. Click **"Upload"** button
3. Select image from your computer
4. Image will be automatically saved to `/public/uploads/`
5. The path will be auto-filled

### Option 2: Use Existing Image
1. If you already have images in the `/public/` folder
2. Enter the path manually (e.g., `/dr-sohail-khan.jpg`)
3. Make sure the image exists in the public folder

**Image Tips:**
- Use clear, professional photos
- Recommended size: 800x800px for profile photos
- Formats: JPG, PNG, or WebP
- Keep file sizes under 500KB for fast loading

---

## ✏️ How to Edit Content

### Editing Existing Content:
1. Log into the admin panel (`/admin`)
2. Click on the content type (e.g., "Doctors", "Staff")
3. Click on the item you want to edit
4. Make your changes
5. Click **"Publish"** to save
6. Changes will appear on the live site in 2-5 minutes

### Adding New Content:
1. Log into the admin panel
2. Click on the content type
3. Click **"New [Content Type]"** button
4. Fill in all required fields
5. Click **"Publish"**
6. The new item will appear on the site after rebuild

### Deleting Content:
1. Log into the admin panel
2. Click on the content type
3. Click on the item you want to delete
4. Click **"Delete"** button
5. Confirm deletion
6. Content will be removed from the site after rebuild

---

## 🔄 How Changes Work

**Behind the Scenes:**
1. When you save changes in the CMS, they're committed to GitHub
2. GitHub automatically notifies Vercel (hosting service)
3. Vercel rebuilds the website with your new content
4. Changes go live in **2-5 minutes**

**Note:** You won't see changes instantly. Wait a few minutes and refresh the page.

---

## 🆘 Common Issues & Solutions

### "Can't Login"
- Make sure you have a GitHub account
- Check that you've been added as a collaborator to the repository
- Try logging out of GitHub and back in

### "Image Not Showing"
- Verify the image path is correct (starts with `/`)
- Check that the image file is in the `/public/` folder
- Try re-uploading the image through the CMS

### "Changes Not Appearing"
- Wait 5 minutes for the site to rebuild
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check that you clicked "Publish" not "Save Draft"

### "Lost Unsaved Work"
- The CMS auto-saves drafts periodically
- Always click "Save Draft" frequently when making large edits
- Don't close the browser tab until you click "Publish"

---

## 💡 Best Practices

1. **Save Frequently:** Click "Save Draft" often while editing
2. **Preview Before Publishing:** Use the preview feature to check how content looks
3. **Consistent Formatting:** Keep doctor/staff bios similar in length and style
4. **Professional Photos:** Use high-quality, well-lit photos
5. **Update Regularly:** Keep news and announcements current
6. **Backup Important Text:** Copy long content to a document before major edits

---

## 📞 Technical Support

If you encounter any issues:
1. Take a screenshot of the error
2. Note what you were trying to do
3. Contact your web developer: [Your Contact Info]

---

## 🔐 Security Notes

- Never share your GitHub login credentials
- Only authorized staff should have admin access
- Log out when finished editing
- The admin panel is only accessible to authenticated users

---

**Last Updated:** January 2025  
**CMS Version:** Decap CMS 3.0.0  
**Website:** https://hainescitydental.vercel.app
