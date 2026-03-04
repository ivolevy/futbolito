import { useAdmin } from "@/hooks/use-admin"
import { PlayerModal } from "@/components/admin/player-modal"
import { Pencil, Plus } from "lucide-react"

export default function JugadoresPage() {
  const { isAdmin } = useAdmin()
  const [fullList, setFullList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false)
  const [editPlayer, setEditPlayer] = useState<any | null>(null)

  useEffect(() => {
    // ... (fetch data logic remains same)
  }, [])

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Jugadores</h1>
          <p className="text-base md:text-lg text-muted-foreground mt-1">Temporada 2026 &bull; Unidos por Stilman</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {isAdmin && (
            <button
              onClick={() => { setEditPlayer(null); setIsPlayerModalOpen(true); }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Nuevo Jugador
            </button>
          )}
          {!loading && hasPlayers && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{fullList.length}</span> jugadores
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-16">
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
          <div className="flex flex-wrap justify-center gap-3">
            {fullList.map((player) => (
              <div key={player.name} className="flex items-center gap-1">
                <button
                  onClick={() => handleShowDetails(player)}
                  className="group relative flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:px-6 md:py-3 transition-all hover:bg-primary/5 hover:border-primary/40 hover:scale-105 active:scale-95"
                >
                  <span className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {player.name}
                  </span>
                  <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
                </button>
                {isAdmin && (
                  <button
                    onClick={(e) => handleEditPlayer(e, player)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-primary transition-all"
                    title="Editar Jugador"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
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
