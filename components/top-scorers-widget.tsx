import { getTopScorers } from "@/lib/data"
import { Target } from "lucide-react"
import Link from "next/link"

export async function TopScorersWidget() {
  const scorers = await getTopScorers(5)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Top Goleadores
          </h3>
        </div>
        <Link
          href="/estadisticas"
          className="text-xs font-medium text-primary hover:underline"
        >
          Ver todas
        </Link>
      </div>

      {scorers.length === 0 ? (
        <div className="p-6">
          <p className="text-center text-sm text-muted-foreground">
            Aun no hay goles registrados. Los datos se actualizan despues de cada partido.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {scorers.map((scorer, index) => (
            <div
              key={scorer.name}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/20"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold tabular-nums text-primary">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{scorer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {scorer.matches} {scorer.matches === 1 ? "partido" : "partidos"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tabular-nums text-primary">{scorer.goals}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
