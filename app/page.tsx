import { NextMatchCard } from "@/components/next-match-card"
import { NewsSection } from "@/components/news-section"
import { getNews, getAnalysis } from "@/lib/data"
import { FileText, Calendar } from "lucide-react"

export default async function HomePage() {
  const news = await getNews()
  const analysis = await getAnalysis()

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

        {/* Analysis Section */}
        <section>
          <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">El Análisis de la Fecha</h2>
                <p className="text-sm text-muted-foreground">La mirada experta sobre lo que dejó la jornada.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/20">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Calendar className="h-3.5 w-3.5" />
              {analysis.date}
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground">{analysis.title}</h3>
            <div className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>{analysis.content}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
