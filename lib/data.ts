// Futbolito 2026 - Data Layer
// Reverted to hardcoded data for reliability and performance.
// Removed assists and MVP as requested.

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

export interface Player {
  id: string
  name: string
  nickname?: string
  position?: string
  number?: number
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

// Hardcoded Players (Updated with friends and siblings)
export const players: Player[] = [
  { id: "ivo", name: "Ivo" },
  { id: "panchi", name: "Panchi" },
  { id: "mati-c", name: "Mati C." },
  { id: "roberto", name: "Roberto" },
  { id: "stilman", name: "Stilman" },
  { id: "ayax", name: "Ayax" },
  { id: "tizi", name: "Tizi" },
  { id: "dami", name: "Dami" },
  { id: "chino", name: "Chino" },
  { id: "nico", name: "Nico" },
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
  return players
}

export async function getAllPlayers() {
  const playerMap: Record<string, { matches: number; goals: number }> = {}

  // Initialize with the hardcoded players list
  players.forEach(p => {
    playerMap[p.name] = { matches: 0, goals: 0 }
  })

  matches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      const allPlayers = [...match.teamA, ...match.teamB]
      allPlayers.forEach((p) => {
        if (!playerMap[p])
          playerMap[p] = { matches: 0, goals: 0 }
        playerMap[p].matches += 1
      })
      match.scorers.forEach((s) => {
        if (!playerMap[s.player])
          playerMap[s.player] = { matches: 0, goals: 0 }
        playerMap[s.player].goals += s.goals
      })
    })

  return Object.entries(playerMap)
    .map(([name, data]) => ({
      name,
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
