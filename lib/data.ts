import { supabase } from "./supabase"

export type MatchStatus = "programado" | "jugado"

export interface Scorer {
  player: string
  goals: number
  team: "A" | "B"
}

export interface Match {
  id: string
  date: string
  time: string
  venueId: string
  teamA: string[]
  teamB: string[]
  scoreA: number | null
  scoreB: number | null
  scorers: Scorer[]
  status: MatchStatus
}

export interface Venue {
  id: string
  name: string
  address: string
  mapsUrl: string
  phone?: string
  instagram?: string
  notes?: string
  matchesPlayed: number
}

export interface News {
  id: string
  title: string
  subtitle: string
  content: string
  image?: string
  date: string
}

export interface Player {
  id: string
  name: string
  nickname?: string
  number?: number
  photo?: string
  skills?: string[]
  weaknesses?: string[]
  social?: {
    instagram?: string
    twitter?: string
  }
}

// Hardcoded Venues
export const venues: Venue[] = [
  {
    id: "poli-cramer",
    name: "Poli de Cramer",
    address: "Av. Crámer 3249",
    mapsUrl: "https://www.google.com/maps/place/poli+de+cramer/data=!4m2!3m1!1s0x95bcb68498961e29:0x1e71d5172fcb6eea",
    notes: "Cancha de futbol 8. Buen estado del cesped sintetico.",
    matchesPlayed: 1
  }
]

export interface Analysis {
  id: string
  title: string
  content: string
  author: string
  date: string
}

export const matchAnalysis: Analysis = {
  id: "analysis-1",
  title: "Análisis de la Fecha 1: Con más ganas que fútbol",
  content: "La jornada inaugural del Futbolito 2026 en el Poli de Cramer ha superado las expectativas, no solo por el volumen de goles, sino por el compromiso táctico —y emocional— de los protagonistas. Si bien el ritmo de juego acusó el impacto de la pretemporada y la falta de cardio fue el denominador común en el segundo tiempo, se empezaron a vislumbrar 'cositas' interesantes: triangulaciones punzantes, relevos solidarios y una jerarquía individual que promete un torneo de altísimo vuelo.\n\nEl despliegue físico de algunos veteranos del certamen fue, cuanto menos, conmovedor, compensando con oficio lo que el aire no llega a cubrir. Las canchas lucieron impecables, permitiendo un flujo de balón que solo se vio interrumpido por la lógica imprecisión del debut. Para la próxima fecha, el ajuste es estrictamente metabólico; el fútbol está, solo falta la nafta.\n\nEn lo personal, no puedo cerrar esta crónica sin destacar un momento que resume la esencia de este grupo: la ducha grupal post partido. Esa comunión bajo el agua caliente, donde las fricciones del campo se disuelven en camaradería, es lo que realmente hace grande a este torneo. Hay equipo, hay espíritu y, sobre todo, hay Futbolito.",
  author: "Por Matias Costa - Periodista",
  date: "2026-03-04"
}

// Hardcoded News
export const news: News[] = [
  {
    id: "news-1",
    title: "La vuelta de Stilman, está para atajar en Boca?",
    subtitle: "El guardameta volvió a las canchas con una actuación que dejó a todos boquiabiertos.",
    content: "Tras una larga ausencia, Stilman regresó bajo los tres palos en el Poli de Cramer. Con reflejos intactos y una voz de mando que se extrañaba, lideró a su defensa con solvencia. ¿Es exagerado pensar en el Xeneize? Para los presentes en el Futbolito 2026, la respuesta es clara: calidad le sobra.",
    date: "2026-03-04"
  },
  {
    id: "news-2",
    title: "El chino, mas en guerra que nunca",
    subtitle: "Goleador, líder y guerrero. Una radiografía de la mentalidad ganadora que domina el torneo.",
    content: "No solo fueron los 5 goles en el último partido. Fue la forma en que disputó cada pelota. El Chino ha dejado claro que este 2026 no viene a pasear. 'La gloria es para los que la luchan', declaró tras el pitazo final. Un mensaje directo para sus rivales.",
    date: "2026-03-04"
  },
  {
    id: "news-3",
    title: "La dupla 'Obel' no hace pie",
    subtitle: "Zanon y Greco, una defensa con menos movilidad que una calesita sin volante.",
    content: "Preocupación en el búnker defensivo. La dupla conformada por Zanon y Greco, bautizada irónicamente como 'Obel', parece tener el paso bloqueado. En el último encuentro, la falta de reacción y la nula movilidad permitieron que los delanteros rivales pasaran como 'canilla abierta'. Se espera que para la próxima fecha el ajuste táctico sea drástico, o que al menos le pongan un poco de WD-40 a las rodillas.",
    date: "2026-03-04"
  }
]

// Hardcoded Players (Updated with specific skills)
export const players: Player[] = [
  {
    id: "ivo",
    name: "Ivo",
    skills: ["Velocidad", "Gambeta", "Liderazgo"],
    social: { instagram: "https://instagram.com/ivo" },
    photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "panchi",
    name: "Panchi",
    skills: ["Defensa", "Pase filtrado"],
    social: { instagram: "https://instagram.com/panchi" }
  },
  {
    id: "mati-c",
    name: "Mati C.",
    skills: ["Visión", "Pase"],
  },
  {
    id: "roberto",
    name: "Roberto",
    skills: ["Striker", "Definición"]
  },
  {
    id: "stilman",
    name: "Stilman",
    skills: ["Acrobacia", "Gato"]
  },
  {
    id: "ayax",
    name: "Ayax",
    skills: ["Pase", "Ida y vuelta"]
  },
  {
    id: "tizi",
    name: "Tizi",
    skills: ["Despeje"]
  },
  {
    id: "dami",
    name: "Dami",
    skills: ["Pase", "Visión de juego"]
  },
  {
    id: "chino",
    name: "Chino",
    skills: ["Gambeta", "Definición"],
    social: { instagram: "https://instagram.com/chino" }
  },
  {
    id: "nico",
    name: "Nico",
    skills: ["Altura", "Control"]
  },
  { id: "mati-v", name: "Mati V" },
  { id: "maxi", name: "Maxi (Amigo Mati)" },
  { id: "luca", name: "Luca (Amigo Chino)" },
  { id: "lautaro", name: "Lautaro (Amigo Chino)" },
  { id: "enzo", name: "Enzo (Amigo Chino)" },
  { id: "ilo", name: "Ilo (Amigo Ivo)" },
  { id: "tomi", name: "Tomi (Amigo Ivo)" }
]

// Hardcoded Matches
export const matches: Match[] = [
  {
    id: "match-001",
    date: "2026-03-03",
    time: "22:00",
    venueId: "poli-cramer",
    teamA: ["Mati C.", "Mati V", "Maxi (Amigo Mati)", "Nico", "Chino", "Luca (Amigo Chino)", "Lautaro (Amigo Chino)", "Enzo (Amigo Chino)"],
    teamB: ["Roberto", "Ayax", "Panchi", "Tizi", "Ivo", "Dami", "Ilo (Amigo Ivo)", "Tomi (Amigo Ivo)"],
    scoreA: 8,
    scoreB: 5,
    scorers: [
      { player: "Chino", goals: 5, team: "A" },
      { player: "Mati C.", goals: 2, team: "A" },
      { player: "Nico", goals: 1, team: "A" }
    ],
    status: "jugado"
  }
]

export async function getVenues(): Promise<Venue[]> {
  return venues
}

export async function getMatches(): Promise<Match[]> {
  return matches
}

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase.from("players").select("*")
  if (error) {
    console.error("Error fetching players:", error)
    return players // Fallback to hardcoded
  }
  return (data || []).map(p => ({
    id: p.id,
    name: p.name,
    nickname: p.nickname,
    number: p.number,
    photo: p.photo,
    skills: p.skills,
    weaknesses: p.weaknesses,
    social: {
      instagram: p.instagram,
      twitter: p.twitter
    }
  }))
}

export async function getAllPlayers() {
  const dbPlayers = await getPlayers()
  const playerMap: Record<string, {
    id?: string;
    name: string;
    matches: number;
    goals: number;
    position?: string;
    skills?: string[];
    weaknesses?: string[];
    social?: { instagram?: string; twitter?: string };
    photo?: string;
  }> = {}

  // Initialize with DB players
  dbPlayers.forEach(p => {
    playerMap[p.name] = {
      id: p.id,
      name: p.name,
      matches: 0,
      goals: 0,
      skills: p.skills,
      weaknesses: p.weaknesses,
      social: p.social,
      photo: p.photo
    }
  })

  // Add hardcoded players if they don't exist in DB
  players.forEach(p => {
    if (!playerMap[p.name]) {
      playerMap[p.name] = {
        name: p.name,
        matches: 0,
        goals: 0,
        skills: p.skills,
        weaknesses: p.weaknesses,
        social: p.social,
        photo: p.photo
      }
    }
  })

  const { data: dbMatches, error } = await supabase.from("matches").select("*")
  const allMatches = error ? matches : dbMatches

  allMatches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      const allPlayers = [...(match.teamA || match.team_a || []), ...(match.teamB || match.team_b || [])]
      allPlayers.forEach((p) => {
        if (!playerMap[p])
          playerMap[p] = { name: p, matches: 0, goals: 0 }
        playerMap[p].matches += 1
      })
      const scorers = match.scorers || []
      scorers.forEach((s: any) => {
        const playerName = typeof s === 'string' ? s : s.player
        if (!playerMap[playerName])
          playerMap[playerName] = { name: playerName, matches: 0, goals: 0 }
        playerMap[playerName].goals += (s.goals || 1)
      })
    })

  return Object.values(playerMap)
    .map((data) => ({
      ...data,
      goalsPerMatch: data.matches > 0 ? +(data.goals / data.matches).toFixed(2) : 0,
    }))
    .sort((a, b) => b.matches - a.matches || b.goals - a.goals)
}

export async function getVenueById(id: string): Promise<Venue | undefined> {
  return venues.find(v => v.id === id)
}

export async function getNextMatch(): Promise<Match | undefined> {
  const now = new Date().toISOString().split("T")[0]
  return matches.find(m => m.status === "programado" && m.date >= now)
}

export async function getLastPlayedMatch(): Promise<Match | undefined> {
  return matches.filter(m => m.status === "jugado").sort((a, b) => b.date.localeCompare(a.date))[0]
}

export async function getTopScorers(limit = 20) {
  const scorerMap: Record<string, { goals: number; matches: number }> = {}
  matches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      match.scorers.forEach((s) => {
        if (!scorerMap[s.player]) scorerMap[s.player] = { goals: 0, matches: 0 }
        scorerMap[s.player].goals += s.goals
      })
      const allPlayers = [...match.teamA, ...match.teamB]
      allPlayers.forEach((p) => {
        if (!scorerMap[p]) scorerMap[p] = { goals: 0, matches: 0 }
        scorerMap[p].matches += 1
      })
    })

  return Object.entries(scorerMap)
    .map(([name, data]) => ({
      name,
      goals: data.goals,
      matches: data.matches,
      average: data.matches > 0 ? +(data.goals / data.matches).toFixed(2) : 0,
    }))
    .filter((s) => s.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, limit)
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00")
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  const formatted = date.toLocaleDateString("es-AR", options)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00")
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
  return date.toLocaleDateString("es-AR", options)
}
