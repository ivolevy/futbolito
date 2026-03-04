import { NextMatchCard } from "@/components/next-match-card"
import { StatsOverview } from "@/components/stats-overview"
import { TopScorersWidget } from "@/components/top-scorers-widget"
import { RecentMatchesWidget } from "@/components/recent-matches-widget"
import { NewsSection } from "@/components/news-section"
import Link from "next/link"
import { ArrowRight, Trophy, Users } from "lucide-react"
import { getAllPlayers, getMatches, getNews } from "@/lib/data"

export default async function HomePage() {
  const matches = await getMatches()
  const players = await getAllPlayers()
  const news = await getNews()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-secondary/10">
        {/* Subtle pitch pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-foreground" />
          <div className="absolute left-0 top-1/4 h-1/2 w-1/5 rounded-r-full border-2 border-foreground" />
          <div className="absolute right-0 top-1/4 h-1/2 w-1/5 rounded-l-full border-2 border-foreground" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Temporada 2026
            </span>
          </div>
          <h1 className="mb-4 text-balance text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            Futbolito <span className="text-primary">2026</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Unidos por Stilman. El torneo donde sobran ganas y falta nivel, pero nunca falta el asado.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* News Section */}
            <NewsSection news={news} />

            {/* Quick links */}
            <section className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/estadisticas"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Estadisticas</p>
                    <p className="text-xs text-muted-foreground">Rankings</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/jugadores"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Jugadores</p>
                    <p className="text-xs text-muted-foreground">Perfiles</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/canchas"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="12" y1="4" x2="12" y2="20" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Canchas</p>
                    <p className="text-xs text-muted-foreground">Sedes</p>
                  </div>
                </div>
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <StatsOverview />
            <TopScorersWidget />
          </div>

        </div>
      </div>
    </div>
  )
}
