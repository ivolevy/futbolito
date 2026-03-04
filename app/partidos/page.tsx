import { getMatches, getVenues } from "@/lib/data"
import { MatchCard } from "@/components/match-card"
import { AdminMatchHeader } from "@/components/admin/match-header"
import { MatchCalendar } from "@/components/match-calendar"

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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Partidos</h1>
          <p className="text-muted-foreground">Calendario y resultados de la temporada 2026.</p>
        </div>
        <AdminMatchHeader venues={venues} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar Calendar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <MatchCalendar matches={matches} />
          </div>
        </div>

        {/* Matches List */}
        <div className="lg:col-span-2 space-y-10">
          {/* Scheduled */}
          {scheduled.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Programados</h2>
              <div className="grid gap-4">
                {scheduled.map((match) => (
                  <MatchCard key={match.id} match={match} venues={venues} />
                ))}
              </div>
            </section>
          )}

          {/* Played */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Historial</h2>
            {played.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  Todavia no hay partidos jugados. Los resultados apareceran aca a medida que se jueguen.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {played.map((match) => (
                  <MatchCard key={match.id} match={match} venues={venues} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
