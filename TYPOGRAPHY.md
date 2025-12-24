# TEMB Typography System

## Overview

The Electronic Music Book (TEMB) uses the **Condor** typeface as its primary typography system. This custom implementation provides a reusable Typography component that embodies editorial sophistication and minimal luxury aesthetic.

## Font Details

**Font Family:** Condor
**Format:** WOFF2 (optimized for web)
**Location:** `/public/fonts/condor/*.woff2`

### Available Weights

- **200** - ExtraLight (with italic)
- **300** - Light (with italic)
- **400** - Regular (with italic)
- **500** - Medium (with italic)
- **700** - Bold (with italic)
- **900** - Black (with italic)

## Typography Component

### Location
`/components/ui/Typography.tsx`

### Usage

```tsx
import Typography from '@/components/ui/Typography';

// Basic usage
<Typography variant="h1">THE ELECTRONIC MUSIC BOOK</Typography>

// With custom element
<Typography variant="h2" as="div">Section Title</Typography>

// With italic
<Typography variant="h2" italic>Italic Heading</Typography>

// With additional classes
<Typography variant="body" className="text-space-grey">
  Body text with custom color
</Typography>
```

### Available Variants

| Variant   | Element | Weight | Size (px) | Line Height | Letter Spacing | Use Case |
|-----------|---------|--------|-----------|-------------|----------------|----------|
| `h1`      | h1      | 200    | 64        | 1.1         | 0.08em         | Page titles, hero headlines |
| `h2`      | h2      | 300    | 40        | 1.2         | 0.04em         | Section titles |
| `h3`      | h3      | 400    | 28        | 1.3         | 0.02em         | Subsection titles |
| `h4`      | h4      | 500    | 20        | 1.4         | 0.01em         | Card titles, labels |
| `body`    | p       | 300    | 16        | 1.6         | 0              | Default body text |
| `body-lg` | p       | 300    | 18        | 1.6         | 0              | Lead paragraphs |
| `caption` | span    | 400    | 12        | 1.4         | 0.02em         | Image captions, footnotes |
| `meta`    | span    | 200    | 14        | 1.4         | 0.04em         | Metadata, timestamps |
| `nav`     | span    | 500    | 14        | 1.0         | 0.08em         | Navigation links (uppercase) |
| `button`  | span    | 500    | 14        | 1.0         | 0.1em          | Button text (uppercase) |

### Props

```typescript
interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-lg' | 'caption' | 'meta' | 'nav' | 'button';
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;  // Override HTML element
  className?: string;                 // Additional Tailwind classes
  italic?: boolean;                   // Enable italic variant
}
```

## Responsive Behavior

The Typography component includes built-in responsive scaling:

- **h1:** 64px → 48px (md) → 36px (sm)
- **h2:** 40px → 32px (md) → 24px (sm)
- **h3:** 28px → 24px (md) → 20px (sm)
- **h4:** 20px → 18px (md)
- **body-lg:** 18px → 16px (sm)

## CSS Variables

Available in `app/globals.css`:

```css
:root {
  /* Font Family */
  --font-condor: 'Condor', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;

  /* Font Weights */
  --font-extralight: 200;
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-bold: 700;
  --font-black: 900;
}
```

## Tailwind Utilities

Custom utility class for Condor font:

```css
.font-condor {
  font-family: var(--font-condor);
}
```

## Implementation Examples

### Page Header
```tsx
<Typography variant="h1" className="text-pearl uppercase mb-6">
  Artists
</Typography>
<Typography variant="body-lg" className="text-space-grey max-w-3xl">
  Featured in THE ELECTRONIC MUSIC BOOK
</Typography>
```

### Navigation Link
```tsx
<Link href="/shop" className="text-pearl hover:opacity-70">
  <Typography variant="nav">Shop</Typography>
</Link>
```

### Button Text
```tsx
<button className="bg-pearl text-midnight px-8 py-3">
  <Typography variant="button">Get it</Typography>
</button>
```

### Body Content
```tsx
<div className="space-y-6">
  <Typography variant="h2" className="text-pearl">
    A Journey Through Electronic Music
  </Typography>
  <Typography variant="body" className="text-space-grey">
    The Electronic Music Book is a curated exploration...
  </Typography>
</div>
```

## Font Loading Strategy

- **Format:** WOFF2 for optimal compression and browser support
- **Display:** `font-display: swap` prevents FOUT (Flash of Unstyled Text)
- **Fallback:** System fonts cascade: system-ui → -apple-system → Helvetica Neue → Arial → sans-serif

## Accessibility

- Proper semantic HTML elements by default (h1, h2, p, etc.)
- Sufficient contrast ratios (WCAG AA compliant with black/white/gray palette)
- Respects user's `prefers-reduced-motion` settings
- Keyboard navigation supported with visible focus states
- Minimum touch target sizes on mobile (44x44px)

## Performance

- All font weights loaded upfront with @font-face declarations
- WOFF2 format provides ~30% better compression than WOFF
- Hosted locally (no external CDN requests)
- Total font size: ~320KB for 12 font files (all weights + italics)

## Design Philosophy

The Condor typography system embodies TEMB's minimal luxury aesthetic:

1. **Generous Letter Spacing:** Creates breathing room and editorial sophistication
2. **Light Weights:** ExtraLight (200) and Light (300) dominate, conveying elegance
3. **Clear Hierarchy:** Font size and weight establish visual order without color
4. **Editorial Feel:** Reminiscent of high-end magazines and luxury brands
5. **Timeless Simplicity:** Classic proportions with modern execution

## Migration Guide

### Before (old approach)
```tsx
<h1 className="text-5xl md:text-7xl font-light tracking-[0.08em] uppercase text-pearl">
  THE ELECTRONIC MUSIC BOOK
</h1>
```

### After (Typography component)
```tsx
<Typography variant="h1" className="text-pearl uppercase">
  THE ELECTRONIC MUSIC BOOK
</Typography>
```

## Files Modified

1. `/app/globals.css` - @font-face declarations and CSS variables
2. `/components/ui/Typography.tsx` - Typography component
3. `/components/Header.tsx` - Navigation and logo
4. `/components/Footer.tsx` - Footer links and copyright
5. `/app/page.tsx` - Landing page typography
6. `/app/artists/page.tsx` - Artists listing
7. `/app/shop/page.tsx` - Shop page product details

## Troubleshooting

### Fonts not loading?
1. Check browser Network tab for 404 errors on `.woff2` files
2. Verify font files exist in `/public/fonts/condor/`
3. Clear browser cache and rebuild: `pnpm build`
4. Check console for CSS parse errors

### Wrong font weight displaying?
1. Verify correct numeric weight values (200, 300, 400, 500, 700, 900)
2. Check if font file exists for that weight
3. Inspect element in DevTools to see computed font-weight

### Layout breaking on mobile?
1. Check responsive classes are applied (max-md:, max-sm:)
2. Test at 320px, 768px, and 1440px viewport widths
3. Verify line-height and letter-spacing are not causing overflow

## Future Enhancements

- [ ] Add font preloading for critical weights (ExtraLight, Light, Medium)
- [ ] Implement variable font version when available
- [ ] Add text animation utilities for editorial transitions
- [ ] Create specialized variants for quotes and pull-quotes
- [ ] Add dark mode font rendering optimizations

---

**Last Updated:** December 23, 2025
**Version:** 1.0.0
**Maintained by:** TEMB Design Team
