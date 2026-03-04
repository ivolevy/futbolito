import { NextMatchCard } from "@/components/next-match-card"
import { NewsSection } from "@/components/news-section"
import { news, matchAnalysis } from "@/lib/data"
import { FileText, Calendar } from "lucide-react"

export default function HomePage() {

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
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        <NewsSection news={news} />

        {/* Editorial Analysis Section */}
        <section className="relative">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              El Análisis de la Fecha
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-primary/30" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary">La mirada experta</p>
              <span className="h-px w-8 bg-primary/30" />
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            <article className="prose prose-lg prose-invert mx-auto">
              <div className="mb-8 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {matchAnalysis.date}
                </div>
                <span className="h-1 w-1 rounded-full bg-border" />
                <div className="text-primary">{matchAnalysis.author}</div>
              </div>

              <h3 className="mb-8 text-center text-2xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
                {matchAnalysis.title}
              </h3>

              <div className="relative space-y-6">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-transparent" />
                {matchAnalysis.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`text-xl leading-relaxed text-muted-foreground italic ${idx === 0 ? "first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left" : ""
                      }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <div className="mt-12 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
