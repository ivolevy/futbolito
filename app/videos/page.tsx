import { getMatches, getVenues } from "@/lib/data"
import Link from "next/link"
import { Play, MapPin } from "lucide-react"

export const metadata = {
    title: "Videos | Futbolito 2026",
    description: "Reviví los mejores momentos, goles y bloopers de la temporada.",
}

export default async function VideosPage() {
    const [matches, venues] = await Promise.all([getMatches(), getVenues()])

    // Only show matches that have been played
    const playedMatches = matches
        .filter(m => m.status === "jugado")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const getVenueName = (id: string) => venues.find(v => v.id === id)?.name || "Sede por confirmar"

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
            <div className="mb-12 border-b border-border pb-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">Videos</h1>
                <p className="text-lg text-muted-foreground mt-1">Reviví la magia y la tragedia de cada fecha</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {playedMatches.map((match) => (
                    <Link
                        key={match.id}
                        href={`/videos/${match.id}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
                    >
                        {/* Background accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-primary mb-1">
                                    {new Date(match.date + "T12:00:00").toLocaleDateString('es-AR', { dateStyle: 'long' })}
                                </p>
                                <h3 className="text-xl font-bold text-foreground">
                                    {match.teamA.length} vs {match.teamB.length} Jugadores
                                </h3>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                <Play className="h-4 w-4 fill-current" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-6 flex items-center gap-2 rounded-xl bg-background p-4 text-sm font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Sede: <strong className="text-foreground">{getVenueName(match.venueId)}</strong></span>
                        </div>

                        <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span className="flex-1 border-t border-border" />
                            <span className="uppercase tracking-widest">Ver clips del partido</span>
                            <span className="flex-1 border-t border-border" />
                        </div>
                    </Link>
                ))}

                {playedMatches.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="text-lg font-medium text-foreground">Aún no hay videos disponibles</h3>
                        <p className="text-muted-foreground mt-2">Los videos aparecerán aquí a medida que se jueguen los partidos.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
