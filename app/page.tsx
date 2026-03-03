import { NextMatchCard } from "@/components/next-match-card"
import { StatsOverview } from "@/components/stats-overview"
import { TopScorersWidget } from "@/components/top-scorers-widget"
import { RecentMatchesWidget } from "@/components/recent-matches-widget"
import Link from "next/link"
import { ArrowRight, Trophy, Users } from "lucide-react"
import { getAllPlayers, getMatches } from "@/lib/data"

export default async function HomePage() {
  const matches = await getMatches()
  const players = await getAllPlayers()
  const playedCount = matches.filter((m) => m.status === "jugado").length
  const allPlayersInMatches = new Set<string>()
  matches.forEach((m) => {
    m.teamA.forEach((p) => allPlayersInMatches.add(p))
    m.teamB.forEach((p) => allPlayersInMatches.add(p))
  })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle pitch pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
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
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/partidos"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Ver partidos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/jugadores"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Users className="h-4 w-4" />
                  Jugadores
                </Link>
              </div>
            </div>

            {/* Quick stats on the right */}
            <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:grid-cols-1 md:gap-4">
              <div className="rounded-xl border border-border bg-card/60 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Partidos jugados
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-foreground">
                  {playedCount}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/60 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Jugadores
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-foreground">
                  {allPlayersInMatches.size}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Next match */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Proximo partido
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <NextMatchCard />
        </section>

        {/* Stats overview */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Resumen
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <StatsOverview />
        </section>

        {/* Widgets row */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Destacados
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <TopScorersWidget />
            <RecentMatchesWidget />
          </div>
        </section>

        {/* Quick links */}
        <section className="grid gap-3 md:grid-cols-3">
          <Link
            href="/estadisticas"
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Estadisticas</p>
                <p className="text-xs text-muted-foreground">Rankings y promedios</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          <Link
            href="/jugadores"
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Jugadores</p>
                <p className="text-xs text-muted-foreground">Perfiles y datos</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          <Link
            href="/canchas"
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Canchas</p>
                <p className="text-xs text-muted-foreground">Ubicaciones y contacto</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </section>
      </div>
    </div>
  )
}
