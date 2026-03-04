'use client'

import { useState, useEffect } from "react"
import { getAllPlayers, getMatches } from "@/lib/data"
import { Users, Trophy, Target, ShieldCheck, UserSearch } from "lucide-react"
import { PlayerDetailsModal } from "@/components/player-details-modal"
import { Button } from "@/components/ui/button"

export default function JugadoresPage() {
  const [fullList, setFullList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const playerStats = await getAllPlayers()
      const matches = await getMatches()

      // Collect all unique player names from all matches (including programados)
      const allPlayerNames = new Set<string>()
      matches.forEach((m) => {
        m.teamA.forEach((p) => allPlayerNames.add(p))
        m.teamB.forEach((p) => allPlayerNames.add(p))
      })

      // Players that participated in played matches already have stats
      const playerStatsNames = new Set(playerStats.map((p) => p.name))
      const combined = [
        ...playerStats,
        ...[...allPlayerNames]
          .filter((name) => !playerStatsNames.has(name))
          .map((name) => ({
            name,
            matches: 0,
            goals: 0,
            goalsPerMatch: 0,
          })),
      ]
      setFullList(combined)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleShowDetails = (player: any) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const hasPlayers = fullList.length > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Plantel <span className="text-primary">2026</span>
          </h1>
          <p className="text-muted-foreground">
            Perfiles técnicos y estadísticas individuales de toda la banda.
          </p>
        </div>
        {!loading && hasPlayers && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{fullList.length}</span>{" "}
              jugadores
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : !hasPlayers ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">Sin jugadores todavia</h2>
          <p className="text-muted-foreground">
            Los jugadores aparecen automaticamente cuando se crean partidos con equipos definidos.
          </p>
        </div>
      ) : (
        <>
          {/* Player cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fullList.map((player, index) => (
              <PlayerCard
                key={player.name}
                player={player}
                rank={index + 1}
                onShowDetails={() => handleShowDetails(player)}
              />
            ))}
          </div>
        </>
      )}

      <PlayerDetailsModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}

function PlayerCard({
  player,
  rank,
  onShowDetails
}: {
  player: {
    name: string
    matches: number
    goals: number
    goalsPerMatch: number
    position?: string
  }
  rank: number
  onShowDetails: () => void
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-sm">
      {/* Player header */}
      <div className="flex items-center gap-4 border-b border-border bg-secondary/10 px-5 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary/20">
          {player.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">{player.name}</h3>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {player.position || "Jugador"}
          </p>
        </div>
        <span className="text-xs font-bold text-primary/40">#{rank}</span>
      </div>

      {/* Stats row */}
      <div className="flex divide-x divide-border">
        <StatCell label="Goles" value={player.goals} />
        <StatCell label="Partidos" value={player.matches} />
        <StatCell label="Prom" value={player.goalsPerMatch.toFixed(1)} />
      </div>

      {/* Action */}
      <div className="p-3 bg-secondary/5 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs font-bold uppercase tracking-tight h-9 transition-colors hover:bg-primary hover:text-primary-foreground"
          onClick={onShowDetails}
        >
          <UserSearch className="h-3.5 w-3.5" />
          Ver ficha técnica
        </Button>
      </div>
    </div>
  )
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-1 flex-col items-center py-2.5">
      <span className="text-sm font-bold text-foreground tabular-nums">{value}</span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
