import { getMatches, getVenues } from "@/lib/data"
import { MatchCard } from "@/components/match-card"
import { AdminMatchHeader } from "@/components/admin/match-header"
import { MatchCalendar } from "@/components/match-calendar"
import { RecentMatchesWidget } from "@/components/recent-matches-widget"

export const metadata = {
  title: "Partidos | Futbolito 2026",
  description: "Historial completo de partidos de la temporada 2026.",
}

export default async function PartidosPage() {
  const matches = await getMatches()
  const venues = await getVenues()
  const scheduled = matches
    .filter((m) => m.status === "programado")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const played = matches
    .filter((m) => m.status === "jugado")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Partidos</h1>
          <p className="text-lg text-muted-foreground mt-1">Temporada 2026 &bull; Unidos por Stilman</p>
        </div>
        <AdminMatchHeader venues={venues} />
      </div>

      <div className="space-y-16">
        {/* Top Section: Calendar and Recent Results */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <MatchCalendar matches={matches} venues={venues} />
          </div>
          <div className="lg:col-span-4 h-full">
            <RecentMatchesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
