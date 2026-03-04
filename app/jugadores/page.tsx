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
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Plantel <span className="text-primary">2026</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Estadísticas y perfiles técnicos de la plantilla.
          </p>
        </div>
        {!loading && hasPlayers && (
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 md:self-center">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              <span className="font-bold text-foreground">{fullList.length}</span> jugadores
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
            Los jugadores aparecen automáticamente al registrarse en los partidos.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {fullList.map((player, index) => (
            <PlayerCard
              key={player.name}
              player={player}
              rank={index + 1}
              onShowDetails={() => handleShowDetails(player)}
            />
          ))}
        </div>
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
  }
  rank: number
  onShowDetails: () => void
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-card/40 p-1.5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
      style={{ animationDelay: `${rank * 50}ms` }}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-background/80 to-background/40 p-4 pb-5">
        {/* Avatar Circle */}
        <div className="mb-6 relative mx-auto h-24 w-24">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 border-2 border-primary/10 transition-transform duration-500 group-hover:scale-110">
            <span className="text-2xl font-black text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]">
              {player.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h3 className="font-bold text-base text-foreground truncate px-2 leading-tight">
            {player.name}
          </h3>
          <div className="inline-block rounded-full bg-primary/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary/60 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            Temporada 2026
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            variant="ghost"
            className="w-full rounded-2xl bg-primary/5 py-6 text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-white"
            onClick={onShowDetails}
          >
            Ficha Técnica
          </Button>
        </div>
      </div>

      {/* Decorative rank Badge */}
      <div className="absolute top-4 right-4 h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary/40 backdrop-blur-md group-hover:text-primary transition-colors">
        {rank}
      </div>
    </div>
  )
}
