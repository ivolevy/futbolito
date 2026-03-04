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
            <DialogContent className="max-w-xl p-0 overflow-hidden border-border/40 bg-background/95 backdrop-blur-2xl outline-none sm:rounded-[2.5rem] shadow-2xl">
                <div className="relative h-44 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                    {/* Decorative patterns */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                    <div className="absolute -bottom-16 left-8">
                        <div className="relative group">
                            <div className="absolute inset-0 animate-pulse rounded-[2rem] bg-primary/20 blur-2xl transition-opacity" />
                            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border-8 border-background bg-gradient-to-br from-card to-secondary/30 text-4xl font-black text-primary shadow-xl ring-1 ring-primary/10">
                                {player.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-10 pt-20">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-black tracking-tighter text-foreground drop-shadow-sm">{player.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
                                    Ficha Técnica 2026
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {player.social?.instagram && (
                                <a href={player.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/50 backdrop-blur-md border border-primary/5 text-muted-foreground hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            )}
                            {player.social?.twitter && (
                                <a href={player.social.twitter} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/50 backdrop-blur-md border border-primary/5 text-muted-foreground hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-10 grid grid-cols-3 gap-5">
                        <StatBox
                            icon={<Target className="h-5 w-5 text-primary" />}
                            label="Goles"
                            value={player.goals}
                        />
                        <StatBox
                            icon={<TrendingUp className="h-5 w-5 text-primary" />}
                            label="Promedio"
                            value={player.goalsPerMatch.toFixed(2)}
                        />
                        <StatBox
                            icon={<ShieldCheck className="h-5 w-5 text-primary" />}
                            label="Partidos"
                            value={player.matches}
                        />
                    </div>

                    {/* Habilidades (Optimized Design) */}
                    <div className="mt-10">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.2em] text-foreground/40">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Habilidades Destacadas
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {player.skills && player.skills.length > 0 ? (
                                player.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="rounded-xl px-4 py-2.5 bg-primary/5 text-primary border border-primary/5 font-bold text-xs hover:bg-primary/10 transition-colors">
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic bg-secondary/30 rounded-xl px-4 py-3 w-full">Pendiente de evaluación técnica...</p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-primary/5 bg-secondary/30 p-5 transition-all duration-300 hover:bg-secondary/50">
            <div className="mb-2.5 rounded-xl bg-background/50 p-2.5 shadow-sm ring-1 ring-primary/5">
                {icon}
            </div>
            <span className="text-xl font-black text-foreground tabular-nums">{value}</span>
            <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground/60">{label}</span>
        </div>
    )
}
