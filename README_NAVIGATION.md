# TEMB Navigation and Layout Components

## Overview
This document describes the global layout and navigation system for The Electronic Music Book (TEMB) Next.js application.

## Components Created

### 1. Header Component (`/components/Header.tsx`)
- **Features:**
  - Fixed/sticky header with blur backdrop on scroll
  - Logo/brand name links to home (`/`)
  - Desktop navigation: Artists, Shop links
  - Persistent CTA button "Get it" → `/shop`
  - Mobile-responsive hamburger menu
  - Keyboard navigable with visible focus states
  - ARIA labels for accessibility

### 2. Footer Component (`/components/Footer.tsx`)
- **Features:**
  - Three-column layout on desktop
  - Brand information
  - Quick navigation links
  - Edition information
  - Copyright and legal links
  - Fully responsive design

### 3. Root Layout (`/app/layout.tsx`)
- **Updates:**
  - Integrated Header and Footer components
  - Set up Inter font (temporary, will be replaced with Condor)
  - Updated metadata for SEO
  - Proper viewport configuration
  - Min-height flexbox layout for sticky footer

### 4. Global Styles (`/app/globals.css`)
- **Design System:**
  - Black/white/gray color palette only
  - Custom CSS properties for consistent spacing
  - Typography hierarchy with generous whitespace
  - Focus states for accessibility
  - Utility classes for luxury aesthetic
  - Mobile-first responsive design

## Design Principles

1. **Minimal Luxury Aesthetic**
   - Black, white, and gray color palette only
   - Generous whitespace
   - Light font weights (300-400)
   - Clean typography hierarchy

2. **Accessibility**
   - Keyboard navigation support
   - Visible focus indicators
   - ARIA labels where appropriate
   - Semantic HTML structure

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 375px (mobile), 768px (tablet), 1440px+ (desktop)
   - Hamburger menu for mobile navigation
   - Fluid typography scaling

## File Structure

```
/Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/
├── app/
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx          # Updated landing page
│   ├── globals.css       # Global styles and design system
│   ├── artists/
│   │   └── page.tsx      # Artists listing (placeholder)
│   └── shop/
│       └── page.tsx      # Shop page (placeholder, Stripe-ready)
└── components/
    ├── Header.tsx        # Navigation header
    └── Footer.tsx        # Site footer
```

## Testing

Run the development server to test the navigation:
```bash
npm run dev
```

Build the project to check for TypeScript errors:
```bash
npm run build
```

## Navigation Flow

- **Logo** → Home (`/`)
- **Artists link** → Artists page (`/artists`)
- **Shop link** → Shop page (`/shop`)
- **"Get it" CTA** → Shop page (`/shop`)

## Next Steps

1. Replace Inter font with Condor when available
2. Implement full Artists listing with data
3. Complete Shop page with Stripe integration
4. Add page transitions/animations if desired
5. Implement search functionality if needed

## Notes

- All navigation links are functional
- Stripe integration is "ready but disabled" - will activate when environment variables are set
- The design strictly adheres to black/white/gray palette
- Header becomes translucent with backdrop blur on scroll for elegant effect
- Mobile menu uses full-screen overlay for immersive experience