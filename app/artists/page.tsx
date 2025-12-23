// app/artists/page.tsx

import { getAllArtists } from '@/lib/artists';

export default function ArtistsPage() {
  const artists = getAllArtists();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-[0.08em] uppercase mb-6">
            Artists
          </h1>
          <p className="text-gray-400 font-light text-lg max-w-3xl">
            Featured in THE ELECTRONIC MUSIC BOOK — from pioneering innovators to contemporary visionaries
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group py-6 border-b border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="text-2xl font-light tracking-wide group-hover:text-gray-300 transition-colors">
                {artist.name}
              </h3>
              {artist.genres && (
                <p className="text-sm text-gray-500 mt-2">
                  {artist.genres.join(' • ')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-gray-800">
          <p className="text-sm text-gray-500 font-light">
            Showing {artists.length} of 500+ artists featured in the book
          </p>
          <p className="text-sm text-gray-600 font-light mt-2">
            Complete artist database coming with the full edition
          </p>
        </div>
      </div>
    </div>
  );
}