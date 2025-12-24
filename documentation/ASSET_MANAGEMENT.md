# TEMB Asset Management System

## Overview

The TEMB project uses a centralized asset management system to ensure type-safe, maintainable access to all images, logos, and media files. All asset paths are defined in `/lib/assets.ts` and accessed through helper functions.

---

## Directory Structure

```
/public/
├── BookFotos/              # Product photography
│   ├── BlackCover.jpeg         # Black edition - angled view (1059x1022)
│   ├── BlackCoverStright.jpeg  # Black edition - straight view (1080x1080)
│   ├── WhiteCover.jpeg         # White edition - angled view (1600x1522)
│   ├── WhiteCoverStright.jpeg  # White edition - straight view (1080x1080)
│   └── 3DBook/
│       └── 3dBookDemo.glb      # 3D book model (1.4 MB, glTF Binary v2)
├── Logos/                  # Brand logos
│   ├── WhitePearlLogoSpaceGreyBack.png           # For dark backgrounds - icon only
│   ├── WhitePearlLogoSpaceGreyBackPlusText.png   # For dark backgrounds - with text
│   ├── SpaceGreyLogoWhitePearlBack.png           # For light backgrounds - icon only
│   └── SpaceGreyLogoWhitePearlBackPlusText.png   # For light backgrounds - with text
└── fonts/
    └── condor/             # Custom Condor font family
```

---

## Asset Manifest

All assets are defined in `/lib/assets.ts`:

```typescript
import { getLogoForBackground, getBookCover, get3DBookModel, ASSETS } from '@/lib/assets';
```

### Available Helper Functions

#### 1. `getLogoForBackground(bg, withText?)`

Returns the appropriate logo based on background color.

**Parameters:**
- `bg`: `'dark' | 'light'` - Background color context
- `withText`: `boolean` (optional, default: `false`) - Include text variant

**Examples:**
```typescript
// Header with Midnight Black background
getLogoForBackground('dark', true)
// Returns: /Logos/WhitePearlLogoSpaceGreyBackPlusText.png

// Footer logo icon only
getLogoForBackground('dark')
// Returns: /Logos/WhitePearlLogoSpaceGreyBack.png

// Light section with White Pearl background
getLogoForBackground('light', true)
// Returns: /Logos/SpaceGreyLogoWhitePearlBackPlusText.png
```

**Logo Usage Guide:**

| Background Color | Use Logo Type | Helper Call |
|-----------------|---------------|-------------|
| Midnight Black (#000000) | WhitePearl | `getLogoForBackground('dark')` |
| Space Grey (#64696E) | WhitePearl | `getLogoForBackground('dark')` |
| White Pearl (#F8F5F0) | SpaceGrey | `getLogoForBackground('light')` |

---

#### 2. `getBookCover(variant, view?)`

Returns the path to a specific book cover image.

**Parameters:**
- `variant`: `'black' | 'white'` - Book edition color
- `view`: `'cover' | 'straight'` (optional, default: `'cover'`) - View type

**Examples:**
```typescript
// Hero section - angled black cover
getBookCover('black')
// Returns: /BookFotos/BlackCover.jpeg

// Product grid - straight white cover
getBookCover('white', 'straight')
// Returns: /BookFotos/WhiteCoverStright.jpeg
```

---

#### 3. `get3DBookModel()`

Returns the path to the 3D book model.

**Example:**
```typescript
// Load 3D model in Three.js or React Three Fiber
const modelPath = get3DBookModel();
// Returns: /BookFotos/3DBook/3dBookDemo.glb
```

---

## Using Assets in Components

### With Next.js Image Component (Recommended)

```tsx
import Image from 'next/image';
import { getLogoForBackground } from '@/lib/assets';

export default function MyComponent() {
  return (
    <Image
      src={getLogoForBackground('dark', true)}
      alt="The Electronic Music Book"
      width={180}
      height={48}
      priority  // For above-fold images
      className="h-10 w-auto"
    />
  );
}
```

### Direct Asset Access

For cases where you need the raw path:

```tsx
import { ASSETS } from '@/lib/assets';

// Direct access to asset paths
const logoPath = ASSETS.logos.whitePearl.withText;
const bookPath = ASSETS.book.black.cover;
const modelPath = ASSETS.book3d.model;
```

---

## Image Optimization

The project is configured for optimal image performance in `next.config.mjs`:

```javascript
images: {
  formats: ['image/webp', 'image/avif'],  // Modern formats
  deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Best Practices

1. **Use Next.js Image Component**: Automatic optimization, lazy loading, responsive sizing
2. **Set `priority` for Above-Fold Images**: Prevents layout shift, faster LCP
3. **Provide Proper Dimensions**: Prevents cumulative layout shift (CLS)
4. **Use Descriptive Alt Text**: Accessibility and SEO

```tsx
// Good example
<Image
  src={getBookCover('black')}
  alt="The Electronic Music Book - Black Edition limited luxury publication"
  width={400}
  height={500}
  priority
  className="w-full h-auto"
/>

// Avoid
<img src="/BookFotos/BlackCover.jpeg" /> // No optimization
```

---

## Asset Guidelines

When adding new assets to the project:

### Logos
- **Format**: PNG with transparency
- **Dimensions**: Max 240x80px (will be scaled)
- **File Size**: < 100 KB
- **Naming**: Descriptive with background color context

### Book Covers
- **Format**: Progressive JPEG
- **Dimensions**: Max 1600x1600px
- **File Size**: < 200 KB
- **Quality**: 85% JPEG quality
- **Naming**: Include edition and view type

### 3D Models
- **Format**: GLB (Binary glTF)
- **File Size**: < 2 MB
- **Optimization**: Use glTF compression tools
- **Naming**: Descriptive with version if applicable

---

## Current Asset Inventory

### Logos (All 1080x1080 PNG, RGBA)
- ✅ WhitePearlLogoSpaceGreyBack.png
- ✅ WhitePearlLogoSpaceGreyBackPlusText.png
- ✅ SpaceGreyLogoWhitePearlBack.png
- ✅ SpaceGreyLogoWhitePearlBackPlusText.png

### Book Covers (All Progressive JPEG)
- ✅ BlackCover.jpeg (1059x1022)
- ✅ BlackCoverStright.jpeg (1080x1080)
- ✅ WhiteCover.jpeg (1600x1522)
- ✅ WhiteCoverStright.jpeg (1080x1080)

### 3D Assets
- ✅ 3dBookDemo.glb (1.4 MB, glTF Binary v2)

---

## Implementation Examples

### Header Component
```tsx
// components/Header.tsx
import Image from "next/image";
import { getLogoForBackground } from "@/lib/assets";

export default function Header() {
  return (
    <header className="bg-midnight">
      <Image
        src={getLogoForBackground('dark', true)}
        alt="The Electronic Music Book"
        width={180}
        height={48}
        priority
        className="h-10 w-auto"
      />
    </header>
  );
}
```

### Footer Component
```tsx
// components/Footer.tsx
import Image from "next/image";
import { getLogoForBackground } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="bg-midnight">
      <Image
        src={getLogoForBackground('dark', true)}
        alt="The Electronic Music Book"
        width={180}
        height={48}
        className="h-10 w-auto"
      />
    </footer>
  );
}
```

### Shop Product Card
```tsx
// components/shop/ProductCard.tsx
import Image from "next/image";
import { getBookCover } from "@/lib/assets";

export default function ProductCard({ variant }: { variant: 'black' | 'white' }) {
  return (
    <div className="product-card">
      <Image
        src={getBookCover(variant, 'straight')}
        alt={`The Electronic Music Book - ${variant} edition`}
        width={400}
        height={400}
        className="w-full h-auto"
      />
    </div>
  );
}
```

---

## Troubleshooting

### Images Not Loading

1. **Check file exists**: Verify asset is in `/public/` directory
2. **Check path**: Ensure path in manifest matches actual filename (case-sensitive)
3. **Check Next.js config**: Verify `next.config.mjs` has proper image settings
4. **Clear cache**: Run `rm -rf .next && pnpm dev`

### Build Errors

```bash
# TypeScript errors with asset paths
pnpm build

# If errors occur, verify:
# 1. Asset paths in /lib/assets.ts match actual files
# 2. All imports use correct function names
# 3. next.config.mjs is properly configured
```

### Performance Issues

- Use `priority` prop for above-fold images
- Ensure `width` and `height` are specified
- Use appropriate image formats (WebP/AVIF when possible)
- Consider lazy loading for below-fold images

---

## Version History

- **v1.0.0** (2025-12-23): Initial asset management system
  - Created centralized asset manifest
  - Implemented helper functions
  - Integrated logos in Header and Footer
  - Configured Next.js image optimization

---

## Related Documentation

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [TEMB Typography Guide](/documentation/TYPOGRAPHY.md)
- [TEMB Development Log](/DEVELOPMENT_LOG.md)

---

**Last Updated**: December 23, 2025
**Maintained by**: TEMB Development Team
