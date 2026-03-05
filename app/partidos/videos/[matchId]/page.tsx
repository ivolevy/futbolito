import { getMatches, getMatchVideos, formatDateLong } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Play, Clapperboard, Trophy, AlertTriangle } from "lucide-react"

export const metadata = {
    title: "Videos del Partido | Futbolito 2026",
    description: "Reviví las mejores jugadas, goles y bloopers del partido.",
}

// Map video types to friendly labels and icons
const videoTypeConfig = {
    jugada: { label: "Mejores Jugadas", icon: Clapperboard, color: "text-blue-500", bg: "bg-blue-500/10" },
    gol: { label: "Goles Inolvidables", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
    blooper: { label: "Bloopers", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
}

export const revalidate = 0

export default async function MatchVideosPage({ params }: { params: { matchId: string } }) {
    const matches = await getMatches()
    const match = matches.find((m) => m.id === params.matchId)

    if (!match) {
        notFound()
    }

    const videos = await getMatchVideos(params.matchId)

    // Group videos by type
    const groupedVideos = videos.reduce((acc, video) => {
        if (!acc[video.type]) acc[video.type] = []
        acc[video.type].push(video)
        return acc
    }, {} as Record<string, typeof videos>)

    // Define display order for groups
    const groupOrder: ("gol" | "jugada" | "blooper")[] = ["gol", "jugada", "blooper"]

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
            {/* Header and Navigation */}
            <div className="mb-10 flex flex-col items-start gap-6 border-b border-border/50 pb-8">
                <Link
                    href="/partidos"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Volver a Partidos
                </Link>

                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic">
                            Videos del Partido
                        </h1>
                    </div>
                    <p className="mt-3 text-lg font-medium text-primary flex items-center gap-2">
                        <span className="h-1.5 w-8 rounded-full bg-primary" />
                        {formatDateLong(match.date)}
                    </p>
                </div>
            </div>

            {/* Match Recap Card */}
            <div className="mb-12 overflow-hidden rounded-[2rem] border border-primary/20 bg-background/50 p-6 shadow-2xl backdrop-blur-3xl md:p-10 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Resultado Final</p>
                <div className="flex items-center justify-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl md:text-7xl font-black text-foreground">{match.scoreA}</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Equipo A</span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 border border-border/10 text-muted-foreground/60 backdrop-blur-md">
                        <span className="text-sm font-bold">VS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl md:text-7xl font-black text-foreground">{match.scoreB}</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Equipo B</span>
                    </div>
                </div>
            </div>

            {/* Video Content */}
            {videos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50">
                        <Clapperboard className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Sin videos disponibles</h3>
                    <p className="mt-2 text-muted-foreground">Aún no se han subido las cámaras de seguridad (o no quisimos dejarlos en evidencia).</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {groupOrder.map((type) => {
                        const groupVideos = groupedVideos[type]
                        if (!groupVideos || groupVideos.length === 0) return null

                        const config = videoTypeConfig[type]
                        const Icon = config.icon

                        return (
                            <section key={type} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground">{config.label}</h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {groupVideos.map((video) => (
                                        <a
                                            key={video.id}
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                <Play className="h-5 w-5 fill-current ml-1" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {video.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Ver en YouTube</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
