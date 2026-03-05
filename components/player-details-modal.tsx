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
        nickname?: string
        matches: number
        goals: number
        goalsPerMatch: number
        skills?: string[]
        weaknesses?: string[]
        instagram?: string
        twitter?: string
        social?: {
            instagram?: string
            twitter?: string
        }
        photo?: string
    } | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function PlayerDetailsModal({ player, isOpen, onOpenChange }: PlayerDetailsModalProps) {
    if (!player) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[850px] w-[95vw] p-0 overflow-hidden border-none bg-background/95 backdrop-blur-3xl outline-none shadow-2xl rounded-[2rem] flex flex-col md:flex-row">

                {/* Left Side: 30% Cover Image */}
                <div className="w-full h-48 md:w-[35%] md:h-auto relative bg-secondary/20 flex flex-col items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-border/10">
                    {player.photo ? (
                        <>
                            <div className="absolute inset-0 z-0 opacity-40 blur-2xl">
                                <img src={player.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                            <img src={player.photo} alt={player.name} className="relative z-10 w-full h-full object-cover md:object-cover" style={{ objectPosition: 'top' }} />
                        </>
                    ) : (
                        <div className="relative flex w-full h-full items-center justify-center bg-primary/5 overflow-hidden">
                            <span className="text-[100px] md:text-[150px] font-black text-primary/10 select-none pointer-events-none">
                                {player.name.substring(0, 1).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right Side: 70% Technical Details */}
                <div className="w-full md:w-[65%] p-6 md:p-8 flex flex-col max-h-[85vh] overflow-y-auto">
                    {/* Header Info */}
                    <div className="mb-6 border-b border-border/10 pb-6">
                        <DialogTitle className="text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase italic break-words leading-none">
                            {player.name}
                        </DialogTitle>
                        {player.nickname && (
                            <p className="mt-2 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-primary/80">
                                "{player.nickname}"
                            </p>
                        )}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-secondary/80 rounded-full text-[10px] md:text-xs font-bold text-foreground uppercase tracking-widest border border-border/50">{player.matches || 0} PARTIDOS</span>
                            <span className="px-3 py-1 bg-secondary/80 rounded-full text-[10px] md:text-xs font-bold text-foreground uppercase tracking-widest border border-border/50">{player.goals || 0} GOLES</span>
                            {player.matches > 0 && (
                                <span className="px-3 py-1 bg-primary/10 rounded-full text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest border border-primary/20">{(player.goals / player.matches).toFixed(1)} G/P</span>
                            )}
                        </div>
                    </div>

                    {/* Skills & Weaknesses */}
                    <div className="grid gap-6 md:gap-8 flex-1">
                        {player.skills && Array.isArray(player.skills) && player.skills.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="h-4 w-4 text-primary" />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Puntos Fuertes</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {player.skills.map((skill: string) => (
                                        <span key={skill} className="text-xs md:text-sm font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {player.weaknesses && Array.isArray(player.weaknesses) && player.weaknesses.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Áreas de Mejora</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {player.weaknesses.map((weakness: string) => (
                                        <span key={weakness} className="text-xs md:text-sm text-foreground border border-border/50 bg-secondary/30 px-3 py-1.5 rounded-lg">
                                            {weakness}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!(player.skills?.length ?? 0 > 0) && !(player.weaknesses?.length ?? 0 > 0) && (
                            <div className="flex flex-col items-center justify-center py-8 text-center bg-secondary/20 rounded-xl border border-border/40 border-dashed">
                                <ShieldCheck className="h-8 w-8 text-muted-foreground/40 mb-3" />
                                <p className="text-sm text-muted-foreground font-medium">Perfil técnico en desarrollo...</p>
                            </div>
                        )}
                    </div>

                    {/* Social Logic */}
                    {(player.social?.instagram || player.social?.twitter || player.instagram || player.twitter) && (
                        <div className="pt-6 mt-6 border-t border-border/10 flex justify-start gap-4">
                            {(player.social?.instagram || player.instagram) && (
                                <a
                                    href={player.social?.instagram || player.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-2 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                    <Instagram className="h-4 w-4" />
                                </a>
                            )}
                            {(player.social?.twitter || player.twitter) && (
                                <a
                                    href={player.social?.twitter || player.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-2 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                    <Twitter className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
