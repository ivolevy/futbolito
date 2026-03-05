import { getMatches, getVenues } from "@/lib/data"
import { MatchCard } from "@/components/match-card"
import { AdminMatchHeader } from "@/components/admin/match-header"
import { MatchCalendar } from "@/components/match-calendar"
import { RecentMatchesWidget } from "@/components/recent-matches-widget"
import Link from "next/link"
import { Play, MapPin } from "lucide-react"

export const metadata = {
  title: "Partidos | Futbolito 2026",
  description: "Historial completo de partidos de la temporada 2026.",
}

export const revalidate = 0

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

        {/* Videos Section */}
        <div className="border-t border-border/20 pt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic">Videos y Resúmenes</h2>
            <p className="text-muted-foreground mt-2">Reviví la magia y la tragedia de cada fecha</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {played.map((match) => (
              <Link
                key={match.id}
                href={`/partidos/videos/${match.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
              >
                {/* Background accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      {new Date(match.date + "T12:00:00").toLocaleDateString('es-AR', { dateStyle: 'long' })}
                    </p>
                    <h3 className="text-xl font-bold text-foreground">
                      Fútbol {Math.max(match.teamA?.length || 0, match.teamB?.length || 0)}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-2 rounded-xl bg-background p-4 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Sede: <strong className="text-foreground">{venues.find(v => v.id === match.venueId)?.name || "Sede por confirmar"}</strong></span>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="flex-1 border-t border-border" />
                  <span className="uppercase tracking-widest">Ver clips del partido</span>
                  <span className="flex-1 border-t border-border" />
                </div>
              </Link>
            ))}

            {played.length === 0 && (
              <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-border bg-secondary/5">
                <h3 className="text-lg font-medium text-foreground">Aún no hay videos disponibles</h3>
                <p className="text-muted-foreground mt-2">Los videos aparecerán aquí a medida que se jueguen los partidos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
