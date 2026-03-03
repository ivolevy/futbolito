"use client"

import { useAdmin } from "@/hooks/use-admin"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { deleteMatch } from "@/lib/actions"
import { toast } from "sonner"
import { MatchModal } from "@/components/admin/match-modal" // Keep MatchModal as it's used
// Assuming VenueModal is also needed based on the instruction, but not used in the current component
// import { VenueModal } from "@/components/admin/venue-modal"

// Define types for match and venue to fix implicit 'any'
interface Match {
    id: string;
    // Add other properties of a match object here
    // For example:
    // date: string;
    // team1: string;
    // team2: string;
    // venueId: string;
}

interface Venue {
    id: string;
    name: string;
    // Add other properties of a venue object here
}

interface AdminMatchControlsProps {
    match: Match
    venues: Venue[]
}

export function AdminMatchControls({ match, venues }: AdminMatchControlsProps) {
    const { isAdmin } = useAdmin()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!isAdmin) return null

    const handleDelete = async () => {
        if (!confirm("¿Estás seguro de que quieres eliminar este partido?")) return

        setIsDeleting(true)
        try {
            await deleteMatch(match.id)
            toast.success("Partido eliminado correctamente")
        } catch (error) {
            toast.error("Error al eliminar el partido")
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-border pt-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
                <Pencil className="h-3.5 w-3.5" />
                Editar
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
            >
                <Trash2 className="h-3.5 w-3.5" />
                {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>

            {isModalOpen && (
                <MatchModal
                    match={match}
                    venues={venues}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
