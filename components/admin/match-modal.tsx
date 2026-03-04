"use client"

import { useState } from "react"
import { X, Save, Loader2 } from "lucide-react"
import { addMatch, updateMatch } from "@/lib/actions"
import { toast } from "sonner"

interface MatchModalProps {
    match?: any
    venues: any[]
    onClose: () => void
}

export function MatchModal({ match, venues, onClose }: MatchModalProps) {
    const isEditing = !!match
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        date: match?.date || new Date().toISOString().split("T")[0],
        time: match?.time || "21:00",
        venue_id: match?.venueId || match?.venue_id || venues[0]?.id || "",
        status: match?.status || "programado",
        score_a: match?.scoreA ?? match?.score_a ?? "",
        score_b: match?.scoreB ?? match?.score_b ?? "",
        team_a: match?.teamA || match?.team_a || [],
        team_b: match?.teamB || match?.team_b || [],
    })

    const [teamAText, setTeamAText] = useState(formData.team_a.join(", "))
    const [teamBText, setTeamBText] = useState(formData.team_b.join(", "))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            ...formData,
            team_a: teamAText.split(",").map((n: string) => n.trim()).filter(Boolean),
            team_b: teamBText.split(",").map((n: string) => n.trim()).filter(Boolean),
            score_a: formData.score_a === "" ? null : Number(formData.score_a),
            score_b: formData.score_b === "" ? null : Number(formData.score_b),
        }

        try {
            if (isEditing) {
                await updateMatch(match.id, payload)
                toast.success("Match updated successfully")
            } else {
                await addMatch(payload)
                toast.success("Match created successfully")
            }
            onClose()
        } catch (error) {
            toast.error("Error saving match")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="flex h-full max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-border bg-card shadow-lg">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 className="text-lg font-bold">
                        {isEditing ? "Editar Partido" : "Programar Partido"}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Fecha</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Hora</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="21:00 hs"
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Cancha</label>
                                <select
                                    required
                                    value={formData.venue_id}
                                    onChange={e => setFormData({ ...formData, venue_id: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                >
                                    {venues.map(v => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Estado</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                >
                                    <option value="programado">Programado</option>
                                    <option value="jugado">Jugado</option>
                                </select>
                            </div>
                            {formData.status === "jugado" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium">Goles A</label>
                                        <input
                                            type="number"
                                            value={formData.score_a}
                                            onChange={e => setFormData({ ...formData, score_a: e.target.value })}
                                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium">Goles B</label>
                                        <input
                                            type="number"
                                            value={formData.score_b}
                                            onChange={e => setFormData({ ...formData, score_b: e.target.value })}
                                            className="w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 space-y-4 border-t border-border pt-6">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium">Equipo A (separados por coma)</label>
                            <textarea
                                value={teamAText}
                                onChange={e => setTeamAText(e.target.value)}
                                className="h-20 w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                placeholder="Jugador 1, Jugador 2, ..."
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium">Equipo B (separados por coma)</label>
                            <textarea
                                value={teamBText}
                                onChange={e => setTeamBText(e.target.value)}
                                className="h-20 w-full rounded-lg border border-input bg-secondary/30 px-3 py-2 text-sm"
                                placeholder="Jugador 1, Jugador 2, ..."
                            />
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
                            {isEditing ? "Guardar Cambios" : "Crear Partido"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
