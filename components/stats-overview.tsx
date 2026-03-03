import { Trophy, Target, Users, Zap } from "lucide-react"
import { getMatches } from "@/lib/data"

export async function StatsOverview() {
  const matches = await getMatches()
  const playedMatches = matches.filter((m) => m.status === "jugado")
  const scheduledMatches = matches.filter((m) => m.status === "programado")
  const totalGoals = playedMatches.reduce(
    (sum, m) => sum + (m.scoreA ?? 0) + (m.scoreB ?? 0),
    0
  )
  const allPlayers = new Set<string>()
  matches.forEach((m) => {
    m.teamA.forEach((p) => allPlayers.add(p))
    m.teamB.forEach((p) => allPlayers.add(p))
  })

  const stats = [
    {
      label: "Jugados",
      value: playedMatches.length,
      icon: Trophy,
      accent: true,
    },
    {
      label: "Programados",
      value: scheduledMatches.length,
      icon: Zap,
      accent: false,
    },
    {
      label: "Goles totales",
      value: totalGoals,
      icon: Target,
      accent: false,
    },
    {
      label: "Jugadores",
      value: allPlayers.size,
      icon: Users,
      accent: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20"
        >
          {stat.accent && (
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-xl" />
          )}
          <div className="relative">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-3xl font-bold tabular-nums text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
