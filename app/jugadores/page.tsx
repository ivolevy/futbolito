'use client'

import { useState, useEffect } from "react"
import { useAdmin } from "@/hooks/use-admin"
import { PlayerModal } from "@/components/admin/player-modal"
import { PlayerDetailsModal } from "@/components/player-details-modal"
import { Pencil, Plus, ChevronLeft, ChevronRight, Users, Search } from "lucide-react"
import { getAllPlayers, getMatches } from "@/lib/data"

const ITEMS_PER_PAGE = 8

export default function JugadoresPage() {
  const { isAdmin } = useAdmin()
  const [fullList, setFullList] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false)
  const [editPlayer, setEditPlayer] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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
          .map((name: string) => ({
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

  // Generate filtered list
  const filteredList = fullList.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (player.nickname && player.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    // Reset to page 1 when searching
    setCurrentPage(1)
  }, [searchQuery])

  const handleShowDetails = (player: any) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const handleEditPlayer = (e: React.MouseEvent, player: any) => {
    e.stopPropagation()
    setEditPlayer(player)
    setIsPlayerModalOpen(true)
  }

  const hasPlayers = fullList.length > 0

  // Pagination logic

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl uppercase italic">Jugadores</h1>
          <p className="mt-2 text-muted-foreground">
            Conocé a los protagonistas del Futbolito 2026.
          </p>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => { setEditPlayer(null); setIsPlayerModalOpen(true); }}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105 active:scale-95 shrink-0"
            >
              <Plus className="h-4 w-4" />
              Nuevo
            </button>
          )}
        </div>
      </div>

      <div className="space-y-12">
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
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {paginatedList.map((player) => (
                <div
                  key={player.name}
                  onClick={() => handleShowDetails(player)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6 transition-all hover:bg-primary/5 hover:border-primary/40 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                      <span className="text-sm md:text-base font-bold text-muted-foreground/50">
                        {player.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={(e) => handleEditPlayer(e, player)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-primary transition-all pointer-events-auto"
                        title="Editar Jugador"
                      >
                        <Pencil className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {player.name}
                    </h3>
                    {player.social?.instagram && (
                      <p className="text-xs text-muted-foreground mt-0.5">@instagram</p>
                    )}
                  </div>

                  {/* Subtle hover effect overlay */}
                  <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-primary/10 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-primary disabled:opacity-30 disabled:hover:bg-card disabled:hover:text-muted-foreground transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-primary disabled:opacity-30 disabled:hover:bg-card disabled:hover:text-muted-foreground transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <PlayerDetailsModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {isPlayerModalOpen && (
        <PlayerModal
          player={editPlayer}
          onClose={() => setIsPlayerModalOpen(false)}
        />
      )}
    </div>
  )
}
