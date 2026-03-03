import { CalendarDays, MapPin, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getNextMatch, getVenueById, formatDateLong, getVenues } from "@/lib/data"
import { AdminMatchControls } from "./admin/match-controls"

export async function NextMatchCard() {
  const match = await getNextMatch()
  if (!match) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No hay partidos programados por el momento.</p>
      </div>
    )
  }

  const venue = await getVenueById(match.venueId)
  const venues = await getVenues()

  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card">
      {/* Green glow accent */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="relative p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Proximo partido
          </span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Match info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{formatDateLong(match.date)}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {match.time} hs
                </p>
              </div>
            </div>

            {venue && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{venue.name}</p>
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
                  >
                    Ver en Google Maps <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* VS display */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/30 px-10 py-6 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background text-lg font-bold text-foreground">
                  A
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  vs
                </span>
              </div>
              <div className="text-center">
                <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background text-lg font-bold text-foreground">
                  B
                </div>
              </div>
            </div>
            {match.teamA.length === 0 && (
              <span className="text-xs text-muted-foreground">Equipos por definir</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/partidos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver todos los partidos
          </Link>
          {venue && (
            <Link
              href="/canchas"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Info de la cancha
            </Link>
          )}
        </div>

        <AdminMatchControls match={match} venues={venues} />
      </div>
    </div>
  )
}
