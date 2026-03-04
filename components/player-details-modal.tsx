'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Target, ShieldCheck, TrendingUp, Instagram, Twitter, AlertCircle, CheckCircle2 } from "lucide-react"

interface PlayerDetailsModalProps {
    player: {
        name: string
        matches: number
        goals: number
        goalsPerMatch: number
        position?: string
        skills?: string[]
        weaknesses?: string[]
        social?: {
            instagram?: string
            twitter?: string
        }
    } | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function PlayerDetailsModal({ player, isOpen, onOpenChange }: PlayerDetailsModalProps) {
    if (!player) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl p-0 overflow-hidden outline-none">
                <div className="relative h-32 bg-primary/10">
                    <div className="absolute -bottom-12 left-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-background bg-secondary text-2xl font-bold text-secondary-foreground shadow-sm">
                            {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-8 pt-16">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{player.name}</h2>
                            <p className="text-sm font-medium text-primary">
                                {player.position || "Jugador"}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {player.social?.instagram && (
                                <a href={player.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-primary">
                                    <Instagram className="h-4 w-4" />
                                </a>
                            )}
                            {player.social?.twitter && (
                                <a href={player.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-primary">
                                    <Twitter className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <StatBox
                            icon={<Target className="h-4 w-4 text-primary" />}
                            label="Goles"
                            value={player.goals}
                        />
                        <StatBox
                            icon={<TrendingUp className="h-4 w-4 text-primary" />}
                            label="Promedio"
                            value={player.goalsPerMatch.toFixed(2)}
                        />
                        <StatBox
                            icon={<ShieldCheck className="h-4 w-4 text-primary" />}
                            label="Partidos"
                            value={player.matches}
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Habilidades */}
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Habilidades
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {player.skills && player.skills.length > 0 ? (
                                    player.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="rounded-md px-2 py-1 bg-green-500/10 text-green-600 border-none">
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">Por definir...</p>
                                )}
                            </div>
                        </div>

                        {/* Debilidades */}
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                Debilidades
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {player.weaknesses && player.weaknesses.length > 0 ? (
                                    player.weaknesses.map((weakness) => (
                                        <Badge key={weakness} variant="secondary" className="rounded-md px-2 py-1 bg-amber-500/10 text-amber-600 border-none">
                                            {weakness}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">Por definir...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4">
            {icon}
            <span className="mt-2 text-lg font-bold text-foreground">{value}</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">{label}</span>
        </div>
    )
}
