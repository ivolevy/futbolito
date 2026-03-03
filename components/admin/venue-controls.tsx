"use client"

import { useAdmin } from "@/hooks/use-admin"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useState } from "react"
import { deleteVenue } from "@/lib/actions"
import { toast } from "sonner"
import { VenueModal } from "@/components/admin/venue-modal"

interface AdminVenueControlsProps {
    venue?: any
    mode: "edit" | "add"
}

export function AdminVenueControls({ venue, mode }: AdminVenueControlsProps) {
    const { isAdmin } = useAdmin()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!isAdmin) return null

    if (mode === "add") {
        return (
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Agregar Cancha
                </button>
                {isModalOpen && <VenueModal onClose={() => setIsModalOpen(false)} />}
            </div>
        )
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!confirm("¿Estás seguro de que quieres eliminar esta cancha?")) return

        setIsDeleting(true)
        try {
            await deleteVenue(venue.id)
            toast.success("Cancha eliminada correctamente")
        } catch (error) {
            toast.error("Error al eliminar la cancha")
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex gap-2">
                <button
                    onClick={handleEdit}
                    className="rounded-lg border border-border bg-card p-1.5 text-foreground transition-colors hover:bg-secondary"
                >
                    <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded-lg border border-destructive/20 bg-destructive/5 p-1.5 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
            {isModalOpen && <VenueModal venue={venue} onClose={() => setIsModalOpen(false)} />}
        </>
    )
}
