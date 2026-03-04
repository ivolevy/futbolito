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

export type VideoType = "jugada" | "blooper" | "gol"

export interface MatchVideo {
  id: string
  matchId: string
  type: VideoType
  title: string
  url: string
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

export async function getVenues(): Promise<Venue[]> {
  const { data } = await supabase.from("venues").select("*")
  return (data || []).map((v) => ({
    id: v.id,
    name: v.name,
    address: v.address,
    mapsUrl: v.maps_url,
    phone: v.phone,
    instagram: v.instagram,
    notes: v.notes,
    matchesPlayed: v.matches_played,
  }))
}

export async function getMatches(): Promise<Match[]> {
  const { data } = await supabase.from("matches").select("*").order('date', { ascending: false })
  return (data || []).map((m) => ({
    id: m.id,
    date: m.date,
    time: m.time,
    venueId: m.venue_id,
    teamA: m.team_a || [],
    teamB: m.team_b || [],
    scoreA: m.score_a,
    scoreB: m.score_b,
    scorers: m.scorers || [],
    status: m.status as MatchStatus
  }))
}

export async function getPlayers(): Promise<Player[]> {
  const { data } = await supabase.from("players").select("*")
  return (data || []).map(p => ({
    id: p.id,
    name: p.name,
    nickname: p.nickname,
    number: p.number,
    photo: p.photo,
    skills: p.skills || [],
    weaknesses: p.weaknesses || [],
    social: p.social || {}
  }))
}

export async function getNews(): Promise<News[]> {
  const { data } = await supabase.from("news").select("*").order('date', { ascending: false })
  return (data || []).map(n => ({
    id: n.id,
    title: n.title,
    subtitle: n.subtitle,
    content: n.content,
    image: n.image,
    date: n.date
  }))
}

export async function getMatchVideos(matchId: string): Promise<MatchVideo[]> {
  const { data } = await supabase.from("videos").select("*").eq('match_id', matchId)
  return (data || []).map(v => ({
    id: v.id,
    matchId: v.match_id,
    type: v.type as VideoType,
    title: v.title,
    url: v.url
  }))
}

export async function getAllPlayers() {
  const dbPlayers = await getPlayers()
  const dbMatches = await getMatches()

  const playerMap: Record<string, {
    id: string;
    name: string;
    matches: number;
    goals: number;
    skills?: string[];
    weaknesses?: string[];
    social?: { instagram?: string; twitter?: string };
    photo?: string;
  }> = {}

  // Initialize map with all players from DB
  dbPlayers.forEach(p => {
    const norm = p.name.toLowerCase()
    playerMap[norm] = {
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

  // Calculate matches and goals
  dbMatches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      const allPlayersInMatch = [...match.teamA, ...match.teamB]
      allPlayersInMatch.forEach((p) => {
        const norm = p.toLowerCase()
        if (!playerMap[norm]) {
          playerMap[norm] = { id: norm, name: p, matches: 0, goals: 0 }
        }
        playerMap[norm].matches += 1
      })

      match.scorers.forEach((s) => {
        const playerName = typeof s === 'string' ? s : s.player
        const norm = playerName.toLowerCase()
        if (!playerMap[norm]) {
          playerMap[norm] = { id: norm, name: playerName, matches: 0, goals: 0 }
        }
        playerMap[norm].goals += (s.goals || 1)
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
  const venues = await getVenues()
  return venues.find(v => v.id === id)
}

export async function getNextMatch(): Promise<Match | undefined> {
  const matches = await getMatches()
  const now = new Date().toISOString().split("T")[0]
  return matches.find(m => m.status === "programado" && m.date >= now)
}

export async function getLastPlayedMatch(): Promise<Match | undefined> {
  const matches = await getMatches()
  return matches.filter(m => m.status === "jugado")[0]
}

export async function getTopScorers(limit = 20) {
  const matches = await getMatches()
  const scorerMap: Record<string, { goals: number; matches: number }> = {}

  matches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      match.scorers.forEach((s) => {
        if (!scorerMap[s.player]) scorerMap[s.player] = { goals: 0, matches: 0 }
        scorerMap[s.player].goals += s.goals
      })
      const allPlayersInMatch = [...match.teamA, ...match.teamB]
      allPlayersInMatch.forEach((p) => {
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
