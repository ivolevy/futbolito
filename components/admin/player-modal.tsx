'use client'

import { useState } from "react"
import { X, Save, Loader2, Target, Award, Instagram, Twitter } from "lucide-react"
import { addPlayer, updatePlayer } from "@/lib/actions"
import { toast } from "sonner"

interface PlayerModalProps {
    player?: any
    onClose: () => void
}

export function PlayerModal({ player, onClose }: PlayerModalProps) {
    const isEditing = !!player
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: player?.name || "",
        nickname: player?.nickname || "",
        number: player?.number || "",
        skills: player?.skills?.join(", ") || "",
        weaknesses: player?.weaknesses?.join(", ") || "",
        instagram: player?.social?.instagram || player?.instagram || "",
        twitter: player?.social?.twitter || player?.twitter || "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: formData.name,
            nickname: formData.nickname,
            number: formData.number === "" ? null : Number(formData.number),
            skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
            weaknesses: formData.weaknesses.split(",").map(s => s.trim()).filter(Boolean),
            instagram: formData.instagram,
            twitter: formData.twitter,
        }

        try {
            if (isEditing) {
                await updatePlayer(player.id, payload)
                toast.success("Jugador actualizado")
            } else {
                await addPlayer(payload)
                toast.success("Jugador creado")
            }
            onClose()
        } catch (error) {
            toast.error("Error al guardar")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="flex h-full max-h-[85vh] w-full max-w-lg flex-col rounded-xl border border-border bg-card shadow-lg">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 className="text-lg font-bold">
                        {isEditing ? `Editar: ${player.name}` : "Nuevo Jugador"}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="mb-1.5 block text-sm font-medium">Nombre Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="Ej: Ivo Levy"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Apodo</label>
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="Ej: El Chino"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Número</label>
                                <input
                                    type="number"
                                    value={formData.number}
                                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="10"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                                    <Target className="h-4 w-4 text-primary" />
                                    Habilidades (sep. por coma)
                                </label>
                                <textarea
                                    value={formData.skills}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                    className="h-20 w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="Velocidad, Gambeta, Liderazgo..."
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Award className="h-4 w-4" />
                                    Debilidades (sep. por coma)
                                </label>
                                <textarea
                                    value={formData.weaknesses}
                                    onChange={e => setFormData({ ...formData, weaknesses: e.target.value })}
                                    className="h-20 w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="Falta de aire, Definición..."
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Redes Sociales</p>
                            <div className="flex items-center gap-3">
                                <Instagram className="h-5 w-5 text-pink-500" />
                                <input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                    className="flex-1 rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="URL de Instagram"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Twitter className="h-5 w-5 text-sky-500" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                    className="flex-1 rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                    placeholder="URL de Twitter"
                                />
                            </div>
                        </div>
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
                            {isEditing ? "Guardar" : "Crear Jugador"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
