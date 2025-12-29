// app/page.tsx

import Link from "next/link";
import Image from "next/image";
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

          <Typography variant="body-lg" className="text-space-grey max-w-2xl mx-auto text-xl md:text-2xl">
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
              <Typography variant="body-lg" className="text-space-grey">
                The Electronic Music Book is a curated exploration of the genre's most influential artists,
                movements, and moments. From pioneering innovators to contemporary visionaries,
                this limited edition publication celebrates the culture that redefined modern music.
              </Typography>
              <Typography variant="body-lg" className="text-space-grey">
                Each of the 10,000 numbered copies represents a piece of electronic music history,
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
              <Typography variant="h4">Artists Total</Typography>
              <Typography variant="body-lg" className="text-space-grey">
                250+ in each edition — two volumes, one complete story
              </Typography>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-extralight text-space-grey">550</div>
              <Typography variant="h4">Pages</Typography>
              <Typography variant="body-lg" className="text-space-grey">
                Premium quality printing on archival paper stock
              </Typography>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl font-extralight text-space-grey">10,000</div>
              <Typography variant="h4">Editions</Typography>
              <Typography variant="body-lg" className="text-space-grey">
                Limited numbered copies for collectors worldwide
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Spreads Preview Area */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-midnight border-t border-space-grey/20">
        <div className="max-w-6xl mx-auto">
          <Typography variant="h2" className="text-center mb-20 text-pearl">
            The Book
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            
            <div className="aspect-square relative overflow-hidden bg-space-grey/10">
              <Image
                src="/BookFotos/BlackSide.svg"
                alt="Black Edition Side View"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="aspect-square relative overflow-hidden bg-space-grey/10">
              <Image
                src="/BookFotos/WhiteSide.svg"
                alt="White Edition Side View"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          <Typography variant="caption" className="text-center text-space-grey block mt-12">
            A selection of  the interior
          </Typography>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 md:px-8 lg:px-12 bg-pearl text-midnight">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <Typography variant="h2">
            Claim Yours
          </Typography>
          <Typography variant="body-lg" className="text-space-grey">
            Limited to 10,000 numbered editions
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
              <Typography variant="button">GET IT</Typography>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}