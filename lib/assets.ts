// /Users/michaelthemac/Desktop/Projectos/TEMB/temb-site/lib/assets.ts

/**
 * Centralized asset manifest for TEMB project
 * All image and asset paths are defined here for type safety and maintainability
 *
 * Asset Organization:
 * - Logos: /public/Logos/ - Brand logos with variants for different backgrounds
 * - Book Photos: /public/BookFotos/ - Product photography of black and white editions
 * - 3D Assets: /public/BookFotos/3DBook/ - 3D model files for interactive displays
 * - Fonts: /public/fonts/condor/ - Custom Condor font family
 */

export const ASSETS = {
  /**
   * Logo variants organized by background color compatibility
   * SVG format with no background for flexibility
   *
   * Color Guide:
   * - Midnight Black (#0A0A0A) → Use WhiteLogoNB.svg
   * - Space Grey (#71717A) → Use WhiteLogoNB.svg
   * - White Pearl (#F5F5F5) → Use BlackLogoNB.svg
   */
  logos: {
    // White logo for dark backgrounds (Midnight Black, Space Grey)
    white: '/Logos/WhiteLogoNB.svg',

    // Black logo for light backgrounds (White Pearl)
    black: '/Logos/BlackLogoNB.svg',

    // Main logo (white version) - primary for the site
    main: '/Logos/WhiteLogoNB.svg',
  },

  /**
   * Book cover images
   * SVG format with no background for flexibility
   * Each edition has two views: side (angled) and straight (front)
   */
  book: {
    black: {
      side: '/BookFotos/BlackSide.svg',
      straight: '/BookFotos/BlackStright.svg',
    },
    white: {
      side: '/BookFotos/WhiteSide.svg',
      straight: '/BookFotos/WhiteStright.svg',
    },
  },

  /**
   * 3D model assets for interactive book displays
   * GLB format for web-optimized 3D rendering
   */
  book3d: {
    model: '/BookFotos/3DBook/3dBookDemo.glb',
  },

  /**
   * Font assets
   * Custom Condor font family used throughout the site
   */
  fonts: {
    condorPath: '/fonts/condor/',
  },
} as const;

// Type for accessing assets with full type safety
export type AssetPaths = typeof ASSETS;

/**
 * Get the appropriate logo based on background color
 *
 * @param bg - Background color: 'dark' for Midnight Black/Space Grey, 'light' for White Pearl
 * @returns Path to logo asset (SVG)
 *
 * @example
 * // For header with midnight black background
 * getLogoForBackground('dark') // Returns WhiteLogoNB.svg
 *
 * @example
 * // For light section
 * getLogoForBackground('light') // Returns BlackLogoNB.svg
 */
export function getLogoForBackground(bg: 'dark' | 'light'): string {
  return bg === 'dark' ? ASSETS.logos.white : ASSETS.logos.black;
}

/**
 * Get the main logo (white version for dark backgrounds)
 * This is the primary logo used throughout the site
 *
 * @returns Path to main logo asset (WhiteLogoNB.svg)
 */
export function getMainLogo(): string {
  return ASSETS.logos.main;
}

/**
 * Get book cover image path for product displays
 *
 * @param variant - Book color variant ('black' or 'white')
 * @param view - View type: 'side' for angled view, 'straight' for front view (default: 'side')
 * @returns Path to book cover asset (SVG)
 *
 * @example
 * // For hero section with angled book
 * getBookCover('black') // Returns BlackSide.svg
 *
 * @example
 * // For shop grid with straight-on view
 * getBookCover('white', 'straight') // Returns WhiteStright.svg
 */
export function getBookCover(
  variant: 'black' | 'white',
  view: 'side' | 'straight' = 'side'
): string {
  return ASSETS.book[variant][view];
}

/**
 * Get 3D book model path for interactive displays
 *
 * @returns Path to 3D GLB model file
 *
 * @example
 * // Load 3D model in Three.js or React Three Fiber
 * const modelPath = get3DBookModel();
 */
export function get3DBookModel(): string {
  return ASSETS.book3d.model;
}

/**
 * Asset size recommendations for optimal performance
 * Use these guidelines when adding new assets
 */
export const ASSET_GUIDELINES = {
  logos: {
    maxWidth: 240,
    maxHeight: 80,
    format: 'SVG with no background',
  },
  bookCovers: {
    maxWidth: 1200,
    maxHeight: 1600,
    format: 'SVG with no background',
  },
  hero3d: {
    maxSize: '2MB',
    format: 'GLB compressed',
  },
} as const;
