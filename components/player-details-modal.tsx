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
            <DialogContent className="max-w-[700px] w-[95vw] p-0 overflow-hidden border-none bg-background/95 backdrop-blur-3xl outline-none shadow-2xl rounded-[2rem]">
                {/* Minimal Header with Large Initial Watermark */}
                <div className="relative border-b border-border/5 px-6 py-8 md:px-10 md:py-10 flex flex-col items-center text-center overflow-hidden">
                    {player.photo ? (
                        <div className="absolute inset-0 z-0 opacity-10 blur-xl">
                            <img src={player.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-primary/5 blur-sm pointer-events-none select-none">
                            {player.name.substring(0, 1).toUpperCase()}
                        </span>
                    )}
                    <div className="relative z-10 w-full flex flex-col items-center">
                        {player.photo && (
                            <img src={player.photo} alt={player.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-background shadow-xl mb-4" />
                        )}
                        <DialogTitle className="text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase italic break-words leading-none">
                            {player.name}
                        </DialogTitle>
                        {player.nickname && (
                            <p className="mt-2 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-primary/70">
                                "{player.nickname}"
                            </p>
                        )}
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-widest">{player.matches || 0} PARTIDOS</span>
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-widest">{player.goals || 0} GOLES</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Skills & Weaknesses */}
                    <div className="grid gap-8">
                        {player.skills && Array.isArray(player.skills) && player.skills.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Puntos Fuertes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {player.skills.map((skill: string) => (
                                        <span key={skill} className="text-sm font-medium text-foreground bg-primary/5 px-3 py-1 rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {player.weaknesses && Array.isArray(player.weaknesses) && player.weaknesses.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Áreas de Mejora</h4>
                                <div className="flex flex-wrap gap-2">
                                    {player.weaknesses.map((weakness: string) => (
                                        <span key={weakness} className="text-sm text-muted-foreground border border-border px-3 py-1 rounded-md">
                                            {weakness}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!(player.skills?.length ?? 0 > 0) && !(player.weaknesses?.length ?? 0 > 0) && (
                            <p className="text-sm text-center text-muted-foreground my-8">
                                Perfil técnico en desarrollo...
                            </p>
                        )}
                    </div>

                    {/* Social Logic */}
                    {(player.social?.instagram || player.social?.twitter || player.instagram || player.twitter) && (
                        <div className="pt-8 border-t border-border/10 flex justify-center gap-6">
                            {(player.social?.instagram || player.instagram) && (
                                <a
                                    href={player.social?.instagram || player.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                            )}
                            {(player.social?.twitter || player.twitter) && (
                                <a
                                    href={player.social?.twitter || player.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
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
