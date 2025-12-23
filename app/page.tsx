// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.08em] leading-[0.9] uppercase">
            THE ELECTRONIC
            <br />
            MUSIC BOOK
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            From the underground to the main stage
          </p>

          <Link
            href="/shop"
            className="inline-block bg-black text-white px-16 py-5 text-sm tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
          >
            Get it
          </Link>
        </div>
      </section>

      {/* Statement Section (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              A Journey Through Electronic Music
            </h2>
            <div className="prose prose-lg font-light text-gray-600 max-w-none">
              <p>
                The Electronic Music Book is a curated exploration of the genre's most influential artists,
                movements, and moments. From pioneering innovators to contemporary visionaries,
                this limited edition publication celebrates the culture that redefined modern music.
              </p>
              <p>
                Each of the 1000 numbered copies represents a piece of electronic music history,
                crafted with the same attention to detail that defines the music itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Preview (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-20">
            What's Inside
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center space-y-4">
              <div className="text-6xl font-light text-gray-300">500+</div>
              <h3 className="text-xl font-light tracking-wide">Artists</h3>
              <p className="text-gray-600 font-light">
                Comprehensive profiles of electronic music's most influential creators
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-light text-gray-300">320</div>
              <h3 className="text-xl font-light tracking-wide">Pages</h3>
              <p className="text-gray-600 font-light">
                Premium quality printing on archival paper stock
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-light text-gray-300">1000</div>
              <h3 className="text-xl font-light tracking-wide">Editions</h3>
              <p className="text-gray-600 font-light">
                Limited numbered copies for collectors worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spreads Preview Area (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-20">
            Sample Spreads
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] bg-gray-200 border border-gray-300"></div>
            <div className="aspect-[4/3] bg-gray-200 border border-gray-300"></div>
            <div className="aspect-[4/3] bg-gray-200 border border-gray-300"></div>
            <div className="aspect-[4/3] bg-gray-200 border border-gray-300"></div>
          </div>
          <p className="text-center text-gray-500 font-light text-sm mt-12">
            Preview images coming soon
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide">
            Own Your Copy
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Limited to 1000 numbered editions worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/artists"
              className="inline-block border-2 border-black text-black px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
            >
              View Artists
            </Link>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
            >
              Get Your Copy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}