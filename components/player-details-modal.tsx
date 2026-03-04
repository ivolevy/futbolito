'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Target, ShieldCheck, TrendingUp, Instagram, Twitter, Eye, CreditCard, Award } from "lucide-react"

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
            <DialogContent className="max-w-md p-0 overflow-hidden border-border/20 bg-background/95 backdrop-blur-3xl outline-none rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
                {/* Minimal Header */}
                <div className="relative border-b border-border/10 px-6 py-6 md:px-8 md:py-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase italic">{player.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-8 rounded-full bg-primary" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Technical Profile</p>
                            </div>
                        </div>
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-secondary/50 border border-border/10 text-muted-foreground/60 backdrop-blur-md">
                            <Eye className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Stats Layout - More Sophisticated */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative overflow-hidden rounded-2xl border border-border/10 bg-secondary/20 p-4 md:p-6 transition-all duration-300 hover:bg-secondary/30">
                            <div className="absolute -right-2 -top-2 opacity-[0.05]">
                                <Target className="h-20 w-20" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Goles Totales</p>
                            <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums tracking-tighter">{player.goals}</span>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-border/10 bg-secondary/20 p-4 md:p-6 transition-all duration-300 hover:bg-secondary/30">
                            <div className="absolute -right-2 -top-2 opacity-[0.05]">
                                <ShieldCheck className="h-20 w-20" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Partidos</p>
                            <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums tracking-tighter">{player.matches}</span>
                        </div>
                        <div className="col-span-2 relative overflow-hidden rounded-2xl border border-border/10 bg-primary/5 p-6 border-l-4 border-l-primary">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/50 mb-1">Promedio de Gol</p>
                                    <span className="text-2xl md:text-3xl font-black text-primary tabular-nums tracking-tighter">{player.goalsPerMatch.toFixed(2)}</span>
                                </div>
                                <Award className="h-10 w-10 text-primary opacity-20" />
                            </div>
                        </div>
                    </div>

                    {/* Skills Section - Clean List */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                            {player.skills && player.skills.length > 0 ? (
                                player.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="rounded-lg border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-bold text-primary">
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic px-2">Sin datos de habilidades registrados.</p>
                            )}
                        </div>
                    </div>

                    {/* Social Links - Discreet */}
                    {(player.social?.instagram || player.social?.twitter) && (
                        <div className="flex items-center gap-4 pt-4 border-t border-border/10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 flex-1 text-right mr-4">Conectar</p>
                            {player.social?.instagram && (
                                <a href={player.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            )}
                            {player.social?.twitter && (
                                <a href={player.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
