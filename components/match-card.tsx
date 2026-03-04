import { CalendarDays, MapPin, Clock, Trophy, ExternalLink } from "lucide-react"
import type { Match } from "@/lib/data"
import { formatDateLong } from "@/lib/data"
import { AdminMatchControls } from "./admin/match-controls"

interface MatchCardProps {
  match: Match
  venues: any[]
}

export async function MatchCard({ match, venues }: MatchCardProps) {
  const venue = venues.find(v => v.id === match.venueId)
  const isPlayed = match.status === "jugado"

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/20">
      {/* Status bar */}
      <div className={`px-4 py-2 ${isPlayed ? "bg-secondary/50" : "bg-primary/10"}`}>
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${isPlayed ? "text-muted-foreground" : "text-primary"
              }`}
          >
            {!isPlayed && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
            {isPlayed ? "Jugado" : "Programado"}
          </span>
          <span className="text-xs text-muted-foreground">{formatDateLong(match.date)}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Venue & Time */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary/70" />
            <span>{match.time} hs</span>
          </div>
          {venue && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary/70" />
              <span>{venue.name}</span>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

        {/* Score / Teams */}
        <div className="flex items-center justify-center gap-6 rounded-lg bg-secondary/30 py-4">
          <div className="text-center flex flex-col items-center gap-1">
            <p className={`text-sm font-semibold ${isPlayed && match.scoreA! > match.scoreB! ? "text-primary underline decoration-2 underline-offset-4" : "text-foreground"}`}>
              Equipo A
            </p>
            {match.teamA.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {match.teamA.map((p: string) => (
                  <p key={p} className="text-[10px] text-muted-foreground leading-tight">{p}</p>
                ))}
              </div>
            )}
          </div>
          <div className="text-center">
            {isPlayed ? (
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Ganador</span>
                <p className="text-2xl font-bold text-primary">
                  {match.scoreA! > match.scoreB! ? "A" : match.scoreB! > match.scoreA! ? "B" : "Empate"}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-muted-foreground">vs</p>
            )}
          </div>
          <div className="text-center flex flex-col items-center gap-1">
            <p className={`text-sm font-semibold ${isPlayed && match.scoreB! > match.scoreA! ? "text-primary underline decoration-2 underline-offset-4" : "text-foreground"}`}>
              Equipo B
            </p>
            {match.teamB.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {match.teamB.map((p: string) => (
                  <p key={p} className="text-[10px] text-muted-foreground leading-tight">{p}</p>
                ))}
              </div>
            )}
          </div>
        </div>


        {!isPlayed && match.teamA.length === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Equipos por definir
          </p>
        )}

        <AdminMatchControls match={match} venues={venues} />
      </div>
    </div>
  )
}
