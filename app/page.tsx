import { NextMatchCard } from "@/components/next-match-card"
import { NewsSection } from "@/components/news-section"
import { getNews } from "@/lib/data"
import { FileText, Calendar } from "lucide-react"

const matchAnalysis = {
  title: "Análisis de la Fecha 1: Con más ganas que fútbol",
  content: "La jornada inaugural del Futbolito 2026 en el Poli de Cramer ha superado las expectativas, no solo por el volumen de goles, sino por el compromiso táctico —y emocional— de los protagonistas. Si bien el ritmo de juego acusó el impacto de la pretemporada y la falta de cardio fue el denominador común en el segundo tiempo, se empezaron a vislumbrar 'cositas' interesantes: triangulaciones punzantes, relevos solidarios y una jerarquía individual que promete un torneo de altísimo vuelo.\n\nEl despliegue físico de algunos veteranos del certamen fue, cuanto menos, conmovedor, compensando con oficio lo que el aire no llega a cubrir. Las canchas lucieron impecables, permitiendo un flujo de balón que solo se vio interrumpido por la lógica imprecisión del debut. Para la próxima fecha, el ajuste es estrictamente metabólico; el fútbol está, solo falta la nafta.\n\nEn lo personal, no puedo cerrar esta crónica sin destacar un momento que resume la esencia de este grupo: la ducha grupal post partido. Esa comunión bajo el agua caliente, donde las fricciones del campo se disuelven en camaradería, es lo que realmente hace grande a este torneo. Hay equipo, hay espíritu y, sobre todo, hay Futbolito.",
  author: "Por Matias Costa - Periodista",
  date: "2026-03-04"
}

export default async function HomePage() {
  const news = await getNews()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle pitch pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-foreground" />
          <div className="absolute left-0 top-1/4 h-1/2 w-1/5 rounded-r-full border-2 border-foreground" />
          <div className="absolute right-0 top-1/4 h-1/2 w-1/5 rounded-l-full border-2 border-foreground" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-medium tracking-wide text-primary">
                  Temporada 2026
                </span>
              </div>
              <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Futbolito{" "}
                <span className="text-primary">2026</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Unidos por Stilman.
              </p>
            </div>

            {/* Next Match in Hero */}
            <div className="w-full max-w-md md:w-[400px]">
              <NextMatchCard />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        <NewsSection news={news} />

        {/* Editorial Analysis Section */}
        <section className="relative">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              El Análisis de la Fecha
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-primary/30" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary">La mirada experta</p>
              <span className="h-px w-8 bg-primary/30" />
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            <article className="prose prose-lg prose-invert mx-auto">
              <div className="mb-8 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {matchAnalysis.date}
                </div>
                <span className="h-1 w-1 rounded-full bg-border" />
                <div className="text-primary">{matchAnalysis.author}</div>
              </div>

              <h3 className="mb-8 text-center text-2xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
                {matchAnalysis.title}
              </h3>

              <div className="relative space-y-6">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/50 to-transparent" />
                {matchAnalysis.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`text-xl leading-relaxed text-muted-foreground italic ${idx === 0 ? "first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left" : ""
                      }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <div className="mt-12 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
