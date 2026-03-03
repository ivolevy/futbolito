"use client"

import { useState } from "react"
import { X, Save, Loader2 } from "lucide-react"
import { addVenue, updateVenue } from "@/lib/actions"
import { toast } from "sonner"

interface VenueModalProps {
    venue?: any
    onClose: () => void
}

export function VenueModal({ venue, onClose }: VenueModalProps) {
    const isEditing = !!venue
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        id: venue?.id || "",
        name: venue?.name || "",
        address: venue?.address || "",
        maps_url: venue?.maps_url || "",
        phone: venue?.phone || "",
        instagram: venue?.instagram || "",
        notes: venue?.notes || "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (isEditing) {
                await updateVenue(venue.id, formData)
                toast.success("Cancha actualizada")
            } else {
                // Generate ID from name if empty
                const payload = { ...formData, id: formData.id || formData.name.toLowerCase().replace(/\s+/g, "-") }
                await addVenue(payload)
                toast.success("Cancha agregada")
            }
            onClose()
        } catch (error) {
            toast.error("Error al guardar la cancha")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-lg">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 className="text-lg font-bold">
                        {isEditing ? "Editar Cancha" : "Agregar Cancha"}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                            placeholder="Poli de Cramer"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">ID (dejar vacío para auto-generar)</label>
                        <input
                            type="text"
                            disabled={isEditing}
                            value={formData.id}
                            onChange={e => setFormData({ ...formData, id: e.target.value })}
                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                            placeholder="poli-cramer"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">Dirección</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                            placeholder="Calle 123, CABA"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">Google Maps URL</label>
                        <input
                            type="url"
                            value={formData.maps_url}
                            onChange={e => setFormData({ ...formData, maps_url: e.target.value })}
                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                            placeholder="https://maps.google.com/..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium">Teléfono</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium">Instagram</label>
                            <input
                                type="text"
                                value={formData.instagram}
                                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                placeholder="@cancha"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">Notas</label>
                        <textarea
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            className="h-20 w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {isEditing ? "Guardar" : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
