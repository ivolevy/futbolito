import { NextMatchCard } from "@/components/next-match-card"
import { NewsSection } from "@/components/news-section"
import { getNews } from "@/lib/data"

export default async function HomePage() {
  const news = await getNews()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle pitch pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-foreground" />
          <div className="absolute left-0 top-1/4 h-1/2 w-1/5 rounded-r-full border-2 border-foreground" />
          <div className="absolute right-0 top-1/4 h-1/2 w-1/5 rounded-l-full border-2 border-foreground" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-medium tracking-wide text-primary">
                  Temporada 2026
                </span>
              </div>
              <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Futbolito{" "}
                <span className="text-primary">2026</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Unidos por Stilman.
              </p>
            </div>

            {/* Next Match in Hero */}
            <div className="w-full max-w-md md:w-[400px]">
              <NextMatchCard />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <NewsSection news={news} />
      </div>
    </div>
  )
}
