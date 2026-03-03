import { getAllPlayers, getMatches } from "@/lib/data"
import { Users, Trophy, Target, Handshake, Star, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Jugadores | Futbolito 2026",
  description: "Todos los jugadores de la temporada 2026 con sus estadisticas.",
}

export default async function JugadoresPage() {
  const playerStats = await getAllPlayers()
  const matches = await getMatches()

  // Collect all unique player names from all matches (including programados)
  const allPlayerNames = new Set<string>()
  matches.forEach((m) => {
    m.teamA.forEach((p) => allPlayerNames.add(p))
    m.teamB.forEach((p) => allPlayerNames.add(p))
  })

  // Players that participated in played matches already have stats
  // Players only in scheduled matches need to be added with zeroes
  const playerStatsNames = new Set(playerStats.map((p) => p.name))
  const fullList = [
    ...playerStats,
    ...[...allPlayerNames]
      .filter((name) => !playerStatsNames.has(name))
      .map((name) => ({
        name,
        matches: 0,
        goals: 0,
        assists: 0,
        mvps: 0,
        goalsPerMatch: 0,
      })),
  ]

  const hasPlayers = fullList.length > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Jugadores
          </h1>
          <p className="text-muted-foreground">
            Todos los jugadores que pasaron por la temporada 2026.
          </p>
        </div>
        {hasPlayers && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{fullList.length}</span>{" "}
              jugadores
            </span>
          </div>
        )}
      </div>

      {!hasPlayers ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">Sin jugadores todavia</h2>
          <p className="text-muted-foreground">
            Los jugadores aparecen automaticamente cuando se crean partidos con equipos definidos.
          </p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryCard
              label="Total jugadores"
              value={fullList.length}
              icon={<Users className="h-4 w-4 text-primary" />}
            />
            <SummaryCard
              label="Goles totales"
              value={fullList.reduce((sum, p) => sum + p.goals, 0)}
              icon={<Target className="h-4 w-4 text-primary" />}
            />
            <SummaryCard
              label="Asistencias totales"
              value={fullList.reduce((sum, p) => sum + p.assists, 0)}
              icon={<Handshake className="h-4 w-4 text-primary" />}
            />
            <SummaryCard
              label="MVPs otorgados"
              value={fullList.reduce((sum, p) => sum + p.mvps, 0)}
              icon={<Star className="h-4 w-4 text-primary" />}
            />
          </div>

          {/* Player cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fullList.map((player, index) => (
              <PlayerCard key={player.name} player={player} rank={index + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
    </div>
  )
}

function PlayerCard({
  player,
  rank,
}: {
  player: {
    name: string
    matches: number
    goals: number
    assists: number
    mvps: number
    goalsPerMatch: number
  }
  rank: number
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/20">
      {/* Player header */}
      <div className="flex items-center gap-4 border-b border-border bg-secondary/20 px-5 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {player.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{player.name}</h3>
          <p className="text-xs text-muted-foreground">
            {player.matches}{" "}
            {player.matches === 1 ? "partido" : "partidos"} jugados
          </p>
        </div>
        <span className="text-xs font-medium text-muted-foreground">#{rank}</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 divide-x divide-border">
        <StatCell
          icon={<Target className="h-3.5 w-3.5 text-primary" />}
          value={player.goals}
          label="Goles"
        />
        <StatCell
          icon={<Handshake className="h-3.5 w-3.5 text-primary" />}
          value={player.assists}
          label="Asist."
        />
        <StatCell
          icon={<Star className="h-3.5 w-3.5 text-primary" />}
          value={player.mvps}
          label="MVP"
        />
        <StatCell
          icon={<ShieldCheck className="h-3.5 w-3.5 text-primary" />}
          value={player.goalsPerMatch}
          label="Prom."
        />
      </div>
    </div>
  )
}

function StatCell({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 py-3">
      {icon}
      <span className="text-base font-bold tabular-nums text-foreground">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
