// app/page.tsx

import Link from "next/link";
import Typography from "@/components/ui/Typography";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <Typography variant="h1" className="text-pearl uppercase leading-[0.9]">
            THE ELECTRONIC
            <br />
            MUSIC BOOK
          </Typography>

          <Typography variant="body-lg" className="text-space-grey max-w-2xl mx-auto">
            From the underground to the main stage
          </Typography>

          <Link
            href="/shop"
            className="inline-block bg-pearl text-midnight px-16 py-5 hover:bg-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight"
          >
            <Typography variant="button">Get it</Typography>
          </Link>
        </div>
      </section>

      {/* Statement Section (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-midnight border-t border-space-grey/20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <Typography variant="h2" className="text-pearl">
              A Journey Through Electronic Music
            </Typography>
            <div className="space-y-6">
              <Typography variant="body" className="text-space-grey">
                The Electronic Music Book is a curated exploration of the genre's most influential artists,
                movements, and moments. From pioneering innovators to contemporary visionaries,
                this limited edition publication celebrates the culture that redefined modern music.
              </Typography>
              <Typography variant="body" className="text-space-grey">
                Each of the 1000 numbered copies represents a piece of electronic music history,
                crafted with the same attention to detail that defines the music itself.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Preview (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-pearl text-midnight">
        <div className="max-w-6xl mx-auto">
          <Typography variant="h2" className="text-center mb-20">
            What's Inside
          </Typography>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center space-y-4">
              <div className="text-6xl font-extralight text-space-grey">500+</div>
              <Typography variant="h4">Artists</Typography>
              <Typography variant="body" className="text-space-grey">
                Comprehensive profiles of electronic music's most influential creators
              </Typography>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-extralight text-space-grey">320</div>
              <Typography variant="h4">Pages</Typography>
              <Typography variant="body" className="text-space-grey">
                Premium quality printing on archival paper stock
              </Typography>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-extralight text-space-grey">1000</div>
              <Typography variant="h4">Editions</Typography>
              <Typography variant="body" className="text-space-grey">
                Limited numbered copies for collectors worldwide
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Spreads Preview Area (Placeholder) */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-midnight border-t border-space-grey/20">
        <div className="max-w-6xl mx-auto">
          <Typography variant="h2" className="text-center mb-20 text-pearl">
            Sample Spreads
          </Typography>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] bg-midnight border border-space-grey/30"></div>
            <div className="aspect-[4/3] bg-midnight border border-space-grey/30"></div>
            <div className="aspect-[4/3] bg-midnight border border-space-grey/30"></div>
            <div className="aspect-[4/3] bg-midnight border border-space-grey/30"></div>
          </div>
          <Typography variant="caption" className="text-center text-space-grey block mt-12">
            Preview images coming soon
          </Typography>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-pearl text-midnight">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <Typography variant="h2">
            Own Your Copy
          </Typography>
          <Typography variant="body-lg" className="text-space-grey">
            Limited to 1000 numbered editions worldwide
          </Typography>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/artists"
              className="inline-block border-2 border-midnight text-midnight px-10 py-4 hover:bg-midnight hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-offset-4 focus:ring-offset-pearl"
            >
              <Typography variant="button">View Artists</Typography>
            </Link>
            <Link
              href="/shop"
              className="inline-block bg-midnight text-pearl px-10 py-4 hover:bg-space-grey transition-colors focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-offset-4 focus:ring-offset-pearl"
            >
              <Typography variant="button">Get Your Copy</Typography>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}