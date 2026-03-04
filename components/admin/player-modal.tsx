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
            skills: formData.skills.split(",").map((s: string) => s.trim()).filter(Boolean),
            weaknesses: formData.weaknesses.split(",").map((s: string) => s.trim()).filter(Boolean),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl">
            <div className="flex h-full max-h-[85vh] w-full max-w-lg flex-col rounded-3xl border border-border/10 bg-background shadow-2xl">
                <div className="flex items-center justify-between border-b border-border/5 p-6">
                    <h2 className="text-xl font-black uppercase italic tracking-tight text-foreground">
                        {isEditing ? player.name : "Nuevo Jugador"}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border-b border-border bg-transparent px-0 py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Ej: Ivo Levy"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Apodo</label>
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                                    className="w-full border-b border-border bg-transparent px-0 py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="El Chino"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Número</label>
                                <input
                                    type="number"
                                    value={formData.number}
                                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                                    className="w-full border-b border-border bg-transparent px-0 py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="10"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-border/5">
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                    Habilidades (sep. por coma)
                                </label>
                                <textarea
                                    value={formData.skills}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                    className="min-h-[60px] w-full border-b border-border bg-transparent px-0 py-2 text-base focus:border-primary focus:outline-none transition-colors resize-y"
                                    placeholder="Velocidad, Gambeta, Liderazgo..."
                                />
                            </div>
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Debilidades (sep. por coma)
                                </label>
                                <textarea
                                    value={formData.weaknesses}
                                    onChange={e => setFormData({ ...formData, weaknesses: e.target.value })}
                                    className="min-h-[60px] w-full border-b border-border bg-transparent px-0 py-2 text-base focus:border-primary focus:outline-none transition-colors resize-y"
                                    placeholder="Falta de aire, Definición..."
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border/5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Conexiones</p>
                            <div className="flex items-center gap-4">
                                <Instagram className="h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                    className="flex-1 border-b border-border bg-transparent px-0 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
                                    placeholder="URL de Instagram"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Twitter className="h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                    className="flex-1 border-b border-border bg-transparent px-0 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
                                    placeholder="URL de Twitter"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-end gap-4 pb-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-widest transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            {isEditing ? "Guardar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
