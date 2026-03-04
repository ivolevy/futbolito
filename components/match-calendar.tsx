"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Clock, Trophy, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { MatchDetailsModal } from "@/components/match-details-modal"

interface MatchCalendarProps {
    matches: any[]
    venues: any[]
}

export function MatchCalendar({ matches, venues }: MatchCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)) // Default to March 2026
    const [selectedMatch, setSelectedMatch] = useState<any | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
        setSelectedMatch(null)
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
        setSelectedMatch(null)
    }

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const totalDays = daysInMonth(year, month)
    const firstDay = firstDayOfMonth(year, month)

    // Get matches for the current month
    const monthMatches = matches.filter(m => {
        const d = new Date(m.date + "T12:00:00")
        return d.getFullYear() === year && d.getMonth() === month
    })

    const playedDates = monthMatches
        .filter(m => m.status === "jugado")
        .map(m => m.date)

    const scheduledDates = monthMatches
        .filter(m => m.status === "programado")
        .map(m => m.date)

    const handleDateClick = (dateStr: string) => {
        const match = monthMatches.find(m => m.date === dateStr)
        if (match) {
            setSelectedMatch(match)
            setIsModalOpen(true)
        }
    }

    const selectedVenue = selectedMatch ? venues.find(v => v.id === selectedMatch.venueId) : null

    const days = []
    // Add empty slots for the first week
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10 md:h-12 md:w-12" />)
    }

    // Add month days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        const isPlayed = playedDates.includes(dateStr)
        const isScheduled = scheduledDates.includes(dateStr)
        const isSelected = selectedMatch?.date === dateStr

        days.push(
            <button
                key={day}
                onClick={() => handleDateClick(dateStr)}
                disabled={!isPlayed && !isScheduled}
                className={cn(
                    "relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg text-sm transition-all",
                    isPlayed ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 scale-105 cursor-pointer hover:brightness-110" :
                        isScheduled ? "bg-primary/10 text-primary border border-primary/30 font-medium cursor-pointer hover:bg-primary/20" :
                            "text-muted-foreground cursor-default",
                    isSelected && "ring-2 ring-white ring-offset-2 ring-offset-background z-10 scale-110"
                )}
            >
                {day}
                {isPlayed && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary-foreground" />
                )}
            </button>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground">Temporada 2026</h3>
                            <p className="text-sm text-primary font-medium">{monthNames[month]} {year}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevMonth}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                            aria-label="Mes anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                            aria-label="Siguiente mes"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map(day => (
                        <div key={day} className="h-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {day}
                        </div>
                    ))}
                    {days}
                </div>

                <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
                    <div className="flex items-center gap-2 text-xs">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">Partido Jugado</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="h-3 w-3 rounded-full border border-primary/30 bg-primary/10" />
                        <span className="text-muted-foreground">Programado</span>
                    </div>
                </div>
            </div>

            <MatchDetailsModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                match={selectedMatch}
                venue={selectedVenue}
            />
        </div>
    )
}
