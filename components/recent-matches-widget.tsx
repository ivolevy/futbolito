import { getMatches, getVenueById, formatDateShort } from "@/lib/data"
import { Trophy, Star } from "lucide-react"
import Link from "next/link"

export async function RecentMatchesWidget() {
  const matches = await getMatches()
  const playedMatches = matches
    .filter((m) => m.status === "jugado")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const matchesWithVenues = await Promise.all(
    playedMatches.map(async (match) => {
      const venue = await getVenueById(match.venueId)
      return { ...match, venue }
    })
  )

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Ultimos Resultados
          </h3>
        </div>
        <Link href="/partidos" className="text-xs font-medium text-primary hover:underline">
          Ver todos
        </Link>
      </div>

      {matchesWithVenues.length === 0 ? (
        <div className="p-6">
          <p className="text-center text-sm text-muted-foreground">
            Todavia no se jugaron partidos. El primer resultado aparecera aca.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {matchesWithVenues.map((match) => (
            <div key={match.id} className="px-5 py-4 transition-colors hover:bg-secondary/20">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDateShort(match.date)}</span>
                <span>{match.venue?.name}</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-medium text-foreground">Equipo A</span>
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xl font-bold tabular-nums text-primary">
                  {match.scoreA} - {match.scoreB}
                </span>
                <span className="text-sm font-medium text-foreground">Equipo B</span>
              </div>
              {match.mvp && (
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 text-primary" />
                  MVP: <span className="font-medium text-primary">{match.mvp}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
