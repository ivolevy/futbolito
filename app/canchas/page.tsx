import { getVenues, getMatches, formatDateShort } from "@/lib/data"
import { MapPin, ExternalLink, Phone, Instagram, StickyNote, CalendarDays } from "lucide-react"
import { AdminVenueControls } from "@/components/admin/venue-controls"

export const metadata = {
  title: "Canchas | Futbolito 2026",
  description: "Todas las canchas donde se jugaron partidos de la temporada.",
}

export const revalidate = 0

export default async function CanchasPage() {
  const venues = await getVenues()
  const matches = await getMatches()
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Canchas</h1>
      <p className="mb-8 text-muted-foreground">
        Todas las canchas de la temporada, con ubicacion, contacto y partidos jugados.
      </p>

      <AdminVenueControls mode="add" />

      <div className="grid gap-6 md:grid-cols-2">
        {venues.map((venue) => {
          const venueMatches = matches.filter((m) => m.venueId === venue.id)
          const playedHere = venueMatches.filter((m) => m.status === "jugado")
          const scheduledHere = venueMatches.filter((m) => m.status === "programado")

          return (
            <div
              key={venue.id}
              className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/20"
            >
              {/* Header with map embed */}
              <div className="relative bg-secondary/30 px-6 py-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{venue.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary/70" />
                      {venue.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Google Maps
                    </a>
                    <AdminVenueControls venue={venue} mode="edit" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Contact info */}
                <div className="mb-5 space-y-2">
                  {venue.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary/70" />
                      <a href={`tel:${venue.phone}`} className="hover:text-foreground">
                        {venue.phone}
                      </a>
                    </div>
                  )}
                  {venue.instagram && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Instagram className="h-4 w-4 text-primary/70" />
                      <a
                        href={`https://instagram.com/${venue.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground"
                      >
                        {venue.instagram}
                      </a>
                    </div>
                  )}
                  {venue.notes && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <StickyNote className="mt-0.5 h-4 w-4 text-primary/70" />
                      <span>{venue.notes}</span>
                    </div>
                  )}
                  {!venue.phone && !venue.instagram && (
                    <p className="text-xs text-muted-foreground/60 italic">
                      Sin informacion de contacto cargada
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="mb-4 flex gap-4">
                  <div className="rounded-lg bg-secondary/30 px-4 py-2 text-center">
                    <p className="text-lg font-bold text-primary">{playedHere.length}</p>
                    <p className="text-xs text-muted-foreground">Jugados</p>
                  </div>
                  <div className="rounded-lg bg-secondary/30 px-4 py-2 text-center">
                    <p className="text-lg font-bold text-foreground">{scheduledHere.length}</p>
                    <p className="text-xs text-muted-foreground">Programados</p>
                  </div>
                </div>

                {/* Match list for this venue */}
                {venueMatches.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Partidos en esta cancha
                    </h3>
                    <div className="space-y-2">
                      {venueMatches.map((match) => (
                        <div
                          key={match.id}
                          className="flex items-center justify-between rounded-lg bg-secondary/20 px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-3.5 w-3.5 text-primary/70" />
                            <span className="text-sm text-foreground">
                              {formatDateShort(match.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {match.status === "jugado" ? (
                              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                Jugado
                              </span>
                            ) : (
                              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                                Programado
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {
        venues.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">Sin canchas</h2>
            <p className="text-muted-foreground">
              Las canchas se agregan automaticamente cuando se crean partidos.
            </p>
          </div>
        )
      }
    </div >
  )
}
