'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CalendarDays, MapPin, Clock, Trophy, Users } from "lucide-react"

interface MatchDetailsModalProps {
    match: any | null
    venue: any | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function MatchDetailsModal({ match, venue, isOpen, onOpenChange }: MatchDetailsModalProps) {
    if (!match) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[900px] w-[95vw] p-0 overflow-hidden border-border/20 bg-background/95 backdrop-blur-3xl outline-none rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
                {/* Minimal Header */}
                <DialogHeader className="relative border-b border-border/10 px-6 py-6 md:px-8 md:py-8 text-left">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase italic">Detalles del Partido</DialogTitle>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-8 rounded-full bg-primary" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                    {match.status === "jugado" ? "Resultado Final" : "Encuentro Finalizado"}
                                </p>
                            </div>
                        </div>
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-secondary/50 border border-border/10 text-muted-foreground/60 backdrop-blur-md">
                            <Trophy className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Tech Data & Result */}
                    <div className="space-y-8">
                        {/* Event Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <CalendarDays className="h-4 w-4 text-primary/70" />
                                <span>Fecha: <strong>{new Date(match.date + "T12:00:00").toLocaleDateString('es-AR', { dateStyle: 'long' })}</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <Clock className="h-4 w-4 text-primary/70" />
                                <span>Hora: <strong>{match.time} hs</strong></span>
                            </div>
                            {venue && (
                                <div className="flex items-center gap-3 text-sm text-foreground">
                                    <MapPin className="h-4 w-4 text-primary/70" />
                                    <span>Sede: <strong>{venue.name}</strong></span>
                                </div>
                            )}
                        </div>

                        {/* Result (Only Winner) */}
                        {match.status === "jugado" && (
                            <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20 text-center flex flex-col items-center justify-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/50 mb-3">Resultado Final</p>
                                <p className="text-2xl font-black text-primary uppercase italic">
                                    {match.scoreA > match.scoreB ? "Victoria Equipo A" : match.scoreB > match.scoreA ? "Victoria Equipo B" : "Empate"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Teams */}
                    <div className="grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-border/10 pt-8 md:pt-0 md:pl-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 border-b border-border/10 pb-2">
                                <Users className="h-4 w-4 text-primary/70" />
                                <p className="text-xs font-black uppercase tracking-tight text-foreground">Equipo A</p>
                            </div>
                            <div className="space-y-1.5">
                                {(match.teamA || []).map((p: string) => (
                                    <div key={p} className="flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-primary/40" />
                                        <p className="text-xs text-muted-foreground font-medium">{p}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 border-b border-border/10 pb-2">
                                <Users className="h-4 w-4 text-primary/70" />
                                <p className="text-xs font-black uppercase tracking-tight text-foreground">Equipo B</p>
                            </div>
                            <div className="space-y-1.5">
                                {(match.teamB || []).map((p: string) => (
                                    <div key={p} className="flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-primary/40" />
                                        <p className="text-xs text-muted-foreground font-medium">{p}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
