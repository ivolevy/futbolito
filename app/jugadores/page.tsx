'use client'

import { useState, useEffect } from "react"
import { getAllPlayers, getMatches } from "@/lib/data"
import { Users, Trophy, Target, ShieldCheck, UserSearch, Eye } from "lucide-react"
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

      const allPlayerNames = new Set<string>()
      matches.forEach((m) => {
        m.teamA.forEach((p) => allPlayerNames.add(p))
        m.teamB.forEach((p) => allPlayerNames.add(p))
      })

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
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Jugadores</h1>
          <p className="text-lg text-muted-foreground mt-1">Temporada 2026 &bull; Unidos por Stilman</p>
        </div>
        {!loading && hasPlayers && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{fullList.length}</span> jugadores
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
          <h2 className="mb-2 text-xl font-semibold text-foreground">Sin jugadores todavía</h2>
          <p className="text-muted-foreground">
            Los jugadores aparecen automáticamente cuando se crean partidos.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
          {fullList.map((player) => (
            <div
              key={player.name}
              className="group flex items-center justify-between p-4 px-6 hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                {player.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
                onClick={() => handleShowDetails(player)}
              >
                <Eye className="h-5 w-5" />
              </Button>
            </div>
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
