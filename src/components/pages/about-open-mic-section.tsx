import { Mic2, Music, Users } from "lucide-react";

import { OptimizedImage } from "@/components/shared";

export function AboutOpenMicSection() {
  return (
    <section className="bg-primary-lighter py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
              Poetry & Expression
            </p>
            <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
              Open Mic Nights
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Beyond pottery, our studio comes alive with the rhythm of words
                and melodies. Our Open Mic nights bring together poets,
                musicians, storytellers, and dreamers in a warm, intimate
                setting surrounded by handcrafted art.
              </p>
              <p>
                Whether you&apos;re a seasoned performer or stepping up to the
                mic for the first time, our community welcomes all voices. Share
                your poetry, strum your guitar, or simply come to listen and be
                inspired.
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <Mic2 className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-neutral-700">
                  Live Poetry
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <Music className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-neutral-700">
                  Acoustic Music
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-neutral-700">
                  Community
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square">
            <OptimizedImage
              src="https://images.pexels.com/photos/6919985/pexels-photo-6919985.jpeg"
              alt="Open mic night at Poetry & Pottery"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-primary/90 rounded-full px-3 py-1 text-xs font-medium text-white">
                Every Month
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
