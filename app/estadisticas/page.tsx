import { getTopScorers, getTopAssists, getMvpRanking, getMatches } from "@/lib/data"
import { Trophy, Target, Handshake, Star } from "lucide-react"

export const metadata = {
  title: "Estadisticas | Futbolito 2026",
  description: "Rankings de goleadores, asistencias, MVPs y estadisticas generales.",
}

export default async function EstadisticasPage() {
  const scorers = await getTopScorers(20)
  const assists = await getTopAssists(20)
  const mvps = await getMvpRanking(20)
  const matches = await getMatches()
  const playedMatches = matches.filter((m) => m.status === "jugado")
  const hasData = playedMatches.length > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Estadisticas</h1>
      <p className="mb-8 text-muted-foreground">
        Rankings individuales y estadisticas generales de la temporada.
      </p>

      {!hasData ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">Sin datos todavia</h2>
          <p className="text-muted-foreground">
            Las estadisticas se generan automaticamente cuando se cargan resultados de partidos. Volve despues del primer partido.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Goleadores */}
          <StatTable
            title="Goleadores"
            icon={<Target className="h-4 w-4 text-primary" />}
            columns={["Jugador", "Goles", "Prom."]}
            rows={scorers.map((s, i) => ({
              rank: i + 1,
              cells: [s.name, String(s.goals), String(s.average)],
            }))}
          />

          {/* Asistencias */}
          <StatTable
            title="Asistencias"
            icon={<Handshake className="h-4 w-4 text-primary" />}
            columns={["Jugador", "Asist."]}
            rows={assists.map((a, i) => ({
              rank: i + 1,
              cells: [a.name, String(a.assists)],
            }))}
          />

          {/* MVPs */}
          <StatTable
            title="Ranking MVP"
            icon={<Star className="h-4 w-4 text-primary" />}
            columns={["Jugador", "Veces"]}
            rows={mvps.map((m, i) => ({
              rank: i + 1,
              cells: [m.name, String(m.count)],
            }))}
          />
        </div>
      )}
    </div>
  )
}

interface StatTableProps {
  title: string
  icon: React.ReactNode
  columns: string[]
  rows: { rank: number; cells: string[] }[]
}

function StatTable({ title, icon, columns, rows }: StatTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="p-5 text-center text-sm text-muted-foreground">Sin datos</div>
      ) : (
        <div className="divide-y divide-border">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-2">
            <span className="w-8 text-xs text-muted-foreground">#</span>
            {columns.map((col, i) => (
              <span
                key={col}
                className={`text-xs text-muted-foreground ${i === 0 ? "flex-1" : "w-14 text-right"}`}
              >
                {col}
              </span>
            ))}
          </div>
          {/* Rows */}
          {rows.map((row) => (
            <div key={row.rank} className="flex items-center gap-2 px-5 py-3 transition-colors hover:bg-secondary/20">
              <span className="flex h-6 w-8 items-center justify-center text-xs font-bold text-primary">
                {row.rank}
              </span>
              {row.cells.map((cell, i) => (
                <span
                  key={i}
                  className={`text-sm ${i === 0 ? "flex-1 font-medium text-foreground" : "w-14 text-right text-muted-foreground"
                    }`}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
