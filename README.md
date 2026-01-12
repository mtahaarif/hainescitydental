# Haines City Dental - Next.js Version

A modern, enhanced version of the Haines City Dental website built with Next.js 14, featuring smooth animations, particle effects, and improved user experience.

## 🚀 Features

### Next.js Exclusive Features
- **Server-Side Rendering (SSR)** - Improved SEO and faster initial page loads
- **Image Optimization** - Automatic image optimization with Next.js Image component
- **App Router** - Latest Next.js routing with layouts and loading states
- **Metadata API** - Enhanced SEO with built-in metadata handling
- **Font Optimization** - Automatic Google Fonts optimization

### Enhanced Animations & Effects
- **Framer Motion** - Smooth page transitions and micro-interactions
- **Particle Background** - Interactive particle effects using tsparticles
- **Scroll Progress Indicator** - Visual feedback for page scroll position
- **Staggered Animations** - Elements animate in sequence for visual appeal
- **Hover Effects** - Magnetic hover effects and smooth transitions

### Design Improvements
- **Glass Morphism** - Enhanced frosted glass effect throughout
- **Gradient Accents** - Beautiful gradient text and backgrounds
- **Floating Animations** - Subtle floating elements for depth
- **Responsive Design** - Fully responsive from mobile to 4K displays

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Particles**: tsparticles
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd hainescitydental1
```

2. Install dependencies:
```bash
npm install
```

3. Copy the public assets from the original project:
```bash
# Copy all files from hainescitydental/public to hainescitydental1/public
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
hainescitydental1/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── services/page.tsx   # Services page
│   │   ├── doctors/page.tsx    # Doctors page
│   │   ├── staff/page.tsx      # Staff page
│   │   ├── news/page.tsx       # News page
│   │   ├── about/page.tsx      # About page
│   │   ├── contact/page.tsx    # Contact page
│   │   └── patient-info/page.tsx # Patient info page
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Hero.tsx            # Hero section
│   │   ├── ParticleBackground.tsx # Particle effects
│   │   ├── PageTransition.tsx  # Page transitions
│   │   ├── ScrollProgress.tsx  # Scroll indicator
│   │   ├── FeaturedServices.tsx # Services preview
│   │   ├── WhyChooseUs.tsx     # Features section
│   │   ├── Testimonials.tsx    # Reviews carousel
│   │   └── CallToAction.tsx    # CTA section
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 Key Components

### ParticleBackground
Interactive particle system that responds to mouse movements and clicks.

### PageTransition
Smooth page transitions using Framer Motion's AnimatePresence.

### ScrollProgress
Animated progress bar showing scroll position.

### Glass Morphism Components
- `.glass` - Light effect
- `.glass-light` - Medium effect
- `.glass-strong` - Strong effect

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the dental-blue color palette.

### Animations
Modify animation variants in individual components or add new keyframes in `globals.css`.

### Particles
Adjust particle options in `ParticleBackground.tsx`.

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📄 License

Private - Haines City Dental

## 👥 Contact

For questions about this website, contact Haines City Dental:
- Phone: (863) 422-8338
- Email: office@hainescitydental.com
