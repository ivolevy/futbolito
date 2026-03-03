import { getMatches, getVenues } from "@/lib/data"
import { MatchCard } from "@/components/match-card"
import { AdminMatchHeader } from "@/components/admin/match-header"

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
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Partidos</h1>
      <p className="mb-8 text-muted-foreground">Calendario y resultados de la temporada 2026.</p>

      <AdminMatchHeader venues={venues} />

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Programados</h2>
          <div className="grid gap-4 md:grid-cols-2">
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
          <div className="grid gap-4 md:grid-cols-2">
            {played.map((match) => (
              <MatchCard key={match.id} match={match} venues={venues} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
