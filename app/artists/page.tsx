// app/artists/page.tsx

import type { Metadata } from 'next';
import { getAllArtists } from '@/lib/artists';
import Typography from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Artists — The Electronic Music Book',
  description: 'Meet the artists featured in The Electronic Music Book. A collection celebrating electronic music culture.',
  openGraph: {
    title: 'Artists — The Electronic Music Book',
    description: 'Meet the artists featured in The Electronic Music Book.',
    url: 'https://theelectronicmusicbook.com/artists',
  },
};

export default function ArtistsPage() {
  const artists = getAllArtists();

  return (
    <div className="min-h-screen bg-midnight text-pearl">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        {/* Page Header */}
        <div className="mb-16">
          <Typography variant="h1" className="text-pearl uppercase mb-6">
            Artists
          </Typography>
          <Typography variant="body-lg" className="text-space-grey max-w-3xl">
            Featured in THE ELECTRONIC MUSIC BOOK — from pioneering innovators to contemporary visionaries
          </Typography>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group py-6 border-b border-space-grey/30 hover:border-space-grey transition-colors"
            >
              <Typography variant="h3" className="group-hover:opacity-80 transition-opacity">
                {artist.name}
              </Typography>
              {artist.genres && (
                <Typography variant="caption" className="text-space-grey block mt-2">
                  {artist.genres.join(' • ')}
                </Typography>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-space-grey/30">
          <Typography variant="caption" className="text-space-grey block">
            Showing all {artists.length} artists featured in THE ELECTRONIC MUSIC BOOK
          </Typography>
          <Typography variant="caption" className="text-space-grey/70 block mt-2">
            Complete biographies and discographies coming soon
          </Typography>
        </div>
      </div>
    </div>
  );
}