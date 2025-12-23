# The Electronic Music Book (TEMB)

A minimal luxury web experience showcasing THE ELECTRONIC MUSIC BOOK—a curated collection of 500+ electronic music artists from around the world. Built with Next.js 14, TypeScript, and Stripe, this application embodies sophistication through restraint: black, white, gray, and nothing more.

## Overview

The Electronic Music Book is both a digital catalog and e-commerce platform featuring a meticulously designed book that celebrates electronic music culture. The application provides an elegant browsing experience for exploring featured artists and a streamlined checkout flow for purchasing the physical book.

**Design Philosophy**: Minimal luxury through typography, generous whitespace, and a strictly monochromatic palette. Every element serves a purpose; nothing is superfluous.

## Features

### Phase 1 - Foundation (Current Release: v0.1.0)

- **Graceful Stripe Integration**: Fully functional application with intelligent fallback behavior when Stripe API keys are not configured
- **Artist Showcase**: Clean, responsive grid displaying electronic music artists with search and pagination support
- **E-Commerce Infrastructure**: Complete checkout flow with dynamic shipping calculation for Mexico and international destinations
- **Accessible Navigation**: Keyboard-navigable interface with comprehensive ARIA labels and focus states
- **Responsive Design**: Fluid layouts optimized for mobile (375px), tablet (768px), and desktop (1440px+) viewports
- **Type-Safe Architecture**: End-to-end TypeScript implementation with strict type checking
- **Production Ready**: Zero build errors, passes accessibility compliance, works without environment variables

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives, shadcn/ui
- **Payments**: Stripe (API version 2025-08-27.basil)
- **Deployment**: Vercel-optimized
- **Package Manager**: pnpm 8.15.7

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 8.15.7 (recommended) or npm/yarn
- Optional: Stripe account for payment processing

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd temb-site
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

The application will run successfully without any environment variables. Stripe functionality will gracefully display "Coming Soon" states until configured.

### Environment Variables (Optional)

For full Stripe payment processing, create a `.env.local` file:

```env
# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Note**: The application is designed to function completely without these variables. Stripe integration is optional and the checkout flow will adapt accordingly.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type checking (via Next.js build)
pnpm build
```

## Project Structure

```
temb-site/
├── app/
│   ├── actions/
│   │   └── stripe.ts           # Server actions for Stripe operations
│   ├── api/
│   │   └── checkout/
│   │       └── route.ts        # Checkout API endpoint with graceful fallback
│   ├── artists/
│   │   └── page.tsx            # Artist catalog page
│   ├── shop/
│   │   └── page.tsx            # E-commerce page with edition details
│   ├── globals.css             # Global styles (minimal luxury aesthetic)
│   ├── layout.tsx              # Root layout with Header/Footer
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── Footer.tsx              # Minimal footer component
│   └── Header.tsx              # Sticky navigation with mobile support
├── lib/
│   ├── artists.ts              # Artist data structure and helpers
│   ├── editions.ts             # Book edition data and helpers
│   ├── shipping.ts             # Shipping regions and rate calculation
│   ├── stripe.ts               # Server-side Stripe initialization
│   ├── stripe-client.ts        # Client-side Stripe configuration
│   ├── utils.ts                # Utility functions
│   └── index.ts                # Central export file
├── types/
│   └── stripe.ts               # TypeScript interfaces for Stripe objects
└── public/                     # Static assets
```

## Design Principles

### Minimal Luxury Aesthetic

1. **Color Palette**: Exclusively black (#000000), white (#FFFFFF), and gray (#A1A1AA, #71717A, #52525B)
2. **Typography**: Primary focus on type hierarchy, scale, and spacing
3. **Whitespace**: Generous padding and margins to create breathing room
4. **Contrast**: High contrast for readability and visual impact
5. **Restraint**: No gradients, no colors, no decorative elements—only what serves the content

### Accessibility First

- WCAG 2.1 AA compliant color contrast ratios
- Full keyboard navigation support
- Semantic HTML structure
- Comprehensive ARIA labels and roles
- Visible focus indicators on all interactive elements

### Performance Optimized

- Server-side rendering for optimal initial load
- Code splitting and lazy loading
- Optimized image delivery
- Minimal JavaScript bundle size

## Data Architecture

### Editions (`lib/editions.ts`)

Manages book edition information including pricing, availability, and metadata.

```typescript
interface Edition {
  id: string
  title: string
  description: string
  priceInCents: number
  currency: string
  available: boolean
  // ... additional fields
}
```

### Artists (`lib/artists.ts`)

Contains artist catalog with search and pagination capabilities. Currently features 20 placeholder artists with plan to expand to 500+ artists.

```typescript
interface Artist {
  id: string
  name: string
  // ... additional fields
}
```

### Shipping (`lib/shipping.ts`)

Defines shipping regions and rate calculation:

- **Mexico (MX)**: $5.00 USD
- **International (INTL)**: $15.00 USD

## Stripe Integration Architecture

### Graceful Fallback System

The application implements a sophisticated fallback mechanism:

1. **Environment Detection**: Checks for `STRIPE_SECRET_KEY` at runtime
2. **Conditional Initialization**: Stripe instance only created when keys are present
3. **UI Adaptation**: Checkout UI displays appropriate states based on configuration
4. **Zero Errors**: Application builds and runs successfully without Stripe credentials

### API Version Lock

Fixed to Stripe API version `2025-08-27.basil` to ensure consistency with the installed Stripe SDK and prevent version drift.

## Roadmap

### Phase 2 - Content & Refinement (Planned)
- Expand artist catalog to 500+ entries
- Add artist detail pages with biographies
- Implement artist search and filtering
- Add book preview spreads/gallery
- Enhanced mobile experience

### Phase 3 - E-Commerce Enhancement (Planned)
- Complete Stripe checkout integration
- Order confirmation emails
- Order tracking system
- Customer account management
- Inventory management

### Phase 4 - Advanced Features (Future)
- Content management system integration
- Multi-language support
- Artist submission portal
- Newsletter integration
- Social media integration

## Known Limitations

- Artist catalog contains 20 placeholder entries (full 500+ catalog pending)
- Stripe checkout displays "Coming Soon" without API keys configured
- No artist detail pages yet (artist showcase only)
- No book preview gallery (coming in Phase 2)

## Production Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables** (Optional):
   - Add `STRIPE_SECRET_KEY` in Vercel dashboard
   - Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel dashboard
   - Or use Vercel's Stripe integration

4. **Deploy**: Vercel will automatically build and deploy

### Environment-Specific Notes

- Application works in production without environment variables
- Stripe integration is entirely optional
- All pages are statically optimized where possible

## Contributing

This is a private project for The Electronic Music Book. For inquiries about contributions or collaboration, please contact the project maintainers.

## License

All rights reserved. This project and The Electronic Music Book are proprietary.

---

**Built with discipline and restraint.**
The Electronic Music Book © 2025
