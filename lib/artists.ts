/**
 * @file lib/artists.ts
 * @description Artist data and types for THE ELECTRONIC MUSIC BOOK
 *
 * TODO: Replace with full 500+ artist list
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Artist names should be exactly as they appear in the book
 * - Use the artist's professional/stage name
 * - Maintain alphabetical order when adding new artists
 * - Check for duplicates before adding
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Represents an artist featured in THE ELECTRONIC MUSIC BOOK
 */
export interface Artist {
  /** Artist's professional/stage name */
  name: string;

  // Future-ready optional fields
  /** Artist's real name (optional) */
  real_name?: string;

  /** Wikipedia or official bio URL (optional) */
  bio_url?: string;

  /** Genres associated with the artist (optional) */
  genres?: string[];

  /** Years active (optional) */
  years_active?: {
    start: number;
    end?: number;
  };

  /** Country of origin (optional) */
  country?: string;

  /** Discogs artist ID for future integration (optional) */
  discogs_id?: string;

  /** Spotify artist ID for future integration (optional) */
  spotify_id?: string;

  /** Page number(s) where artist appears in the book (optional) */
  page_references?: number[];

  /** Additional metadata (optional) */
  metadata?: Record<string, any>;
}

// ============================================
// ARTIST DATA
// ============================================

/**
 * Placeholder list of electronic music artists
 * TODO: Replace with complete 500+ artist database from the book
 *
 * Current list includes 20 notable electronic music artists for development
 */
export const artists: Artist[] = [
  { name: "Aphex Twin" },
  { name: "Carl Cox" },
  { name: "Daft Punk" },
  { name: "Deadmau5" },
  { name: "Disclosure" },
  { name: "Fatboy Slim" },
  { name: "Four Tet" },
  { name: "Jamie xx" },
  { name: "Jeff Mills" },
  { name: "Jon Hopkins" },
  { name: "Justice" },
  { name: "Kraftwerk" },
  { name: "Laurent Garnier" },
  { name: "Moby" },
  { name: "Nicolas Jaar" },
  { name: "Richie Hawtin" },
  { name: "Skrillex" },
  { name: "The Chemical Brothers" },
  { name: "The Prodigy" },
  { name: "Underworld" },
] as const satisfies Artist[];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Returns the complete list of all artists
 * @returns Array of all Artist objects
 */
export function getAllArtists(): Artist[] {
  return artists;
}

/**
 * Search for artists by name (case-insensitive)
 * @param query - Search string
 * @returns Array of matching artists
 */
export function searchArtists(query: string): Artist[] {
  const searchTerm = query.toLowerCase().trim();
  return artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get artists sorted alphabetically by name
 * @param ascending - Sort direction (true for A-Z, false for Z-A)
 * @returns Sorted array of artists
 */
export function getArtistsSorted(ascending = true): Artist[] {
  const sorted = [...artists].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
  return ascending ? sorted : sorted.reverse();
}

/**
 * Get a random selection of artists
 * @param count - Number of artists to return
 * @returns Array of randomly selected artists
 */
export function getRandomArtists(count: number): Artist[] {
  const shuffled = [...artists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, artists.length));
}

/**
 * Get artist by exact name match
 * @param name - Artist name to find
 * @returns Artist object or undefined if not found
 */
export function getArtistByName(name: string): Artist | undefined {
  return artists.find(artist =>
    artist.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get paginated artists
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of artists per page
 * @returns Object with artists array and pagination metadata
 */
export function getPaginatedArtists(page: number = 1, pageSize: number = 20) {
  const totalArtists = artists.length;
  const totalPages = Math.ceil(totalArtists / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    artists: artists.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      pageSize,
      totalPages,
      totalArtists,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }
  };
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard to check if a value is a valid Artist
 * @param value - Value to check
 * @returns Boolean indicating if value is an Artist
 */
export function isArtist(value: unknown): value is Artist {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as any).name === "string"
  );
}

// ============================================
// STATISTICS
// ============================================

/**
 * Get basic statistics about the artist collection
 * @returns Object with artist statistics
 */
export function getArtistStats() {
  return {
    total: artists.length,
    placeholder: 20,
    remaining: 480, // Approximate remaining artists to add
    lastUpdated: "2024-12-23",
    status: "development", // Will change to "production" when complete
  };
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Import in your components:
import { getAllArtists, searchArtists, type Artist } from '@/lib/artists'

// Get all artists:
const allArtists = getAllArtists()

// Search for artists:
const technoArtists = searchArtists('techno')

// Display in a component:
allArtists.map(artist => (
  <div key={artist.name}>
    <h4>{artist.name}</h4>
    {artist.genres && <span>{artist.genres.join(', ')}</span>}
  </div>
))

// Paginated display:
const { artists, pagination } = getPaginatedArtists(1, 10)
*/