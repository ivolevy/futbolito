// Futbolito 2026 - Data Layer
// This is the central data store for all matches, venues, and stats.
import { supabase } from "./supabase"

export type MatchStatus = "programado" | "jugado"

export interface Scorer {
  player: string
  goals: number
  team: "A" | "B"
}

export interface Assist {
  player: string
  assists: number
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
  assists: Assist[]
  mvp: string | null
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

export async function getVenues(): Promise<Venue[]> {
  const { data, error } = await supabase.from("venues").select("*").order("name")
  if (error) {
    console.error("Error fetching venues:", error)
    return []
  }
  return data || []
}

export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase.from("matches").select("*").order("date", { ascending: false })
  if (error) {
    console.error("Error fetching matches:", error)
    return []
  }
  return data || []
}

export interface Player {
  id: string
  name: string
  nickname?: string
  position?: string
  number?: number
}

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase.from("players").select("*").order("name")
  if (error) {
    console.error("Error fetching players:", error)
    return []
  }
  return data || []
}

export async function getAllPlayers(): Promise<{
  name: string
  matches: number
  goals: number
  assists: number
  mvps: number
  goalsPerMatch: number
}[]> {
  const matches = await getMatches()
  const playerMap: Record<
    string,
    { matches: number; goals: number; assists: number; mvps: number }
  > = {}

  matches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      const allPlayers = [...match.teamA, ...match.teamB]
      allPlayers.forEach((p) => {
        if (!playerMap[p])
          playerMap[p] = { matches: 0, goals: 0, assists: 0, mvps: 0 }
        playerMap[p].matches += 1
      })
      match.scorers.forEach((s) => {
        if (!playerMap[s.player])
          playerMap[s.player] = { matches: 0, goals: 0, assists: 0, mvps: 0 }
        playerMap[s.player].goals += s.goals
      })
      match.assists.forEach((a) => {
        if (!playerMap[a.player])
          playerMap[a.player] = { matches: 0, goals: 0, assists: 0, mvps: 0 }
        playerMap[a.player].assists += a.assists
      })
      if (match.mvp && playerMap[match.mvp]) {
        playerMap[match.mvp].mvps += 1
      }
    })

  return Object.entries(playerMap)
    .map(([name, data]) => ({
      name,
      ...data,
      goalsPerMatch:
        data.matches > 0 ? +(data.goals / data.matches).toFixed(2) : 0,
    }))
    .sort((a, b) => b.matches - a.matches || b.goals - a.goals)
}

// Helper functions
export async function getVenueById(id: string): Promise<Venue | undefined> {
  const { data, error } = await supabase.from("venues").select("*").eq("id", id).single()
  if (error) return undefined
  return data
}

export async function getNextMatch(): Promise<Match | undefined> {
  const now = new Date().toISOString().split("T")[0]
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "programado")
    .gte("date", now)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(1)
    .single()

  if (error) return undefined
  return data
}

export async function getLastPlayedMatch(): Promise<Match | undefined> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "jugado")
    .order("date", { ascending: false })
    .order("time", { ascending: false })
    .limit(1)
    .single()

  if (error) return undefined
  return data
}

export async function getTopScorers(limit = 5) {
  const matches = await getMatches()
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

export async function getTopAssists(limit = 5) {
  const matches = await getMatches()
  const assistMap: Record<string, number> = {}
  matches
    .filter((m) => m.status === "jugado")
    .forEach((match) => {
      match.assists.forEach((a) => {
        if (!assistMap[a.player]) assistMap[a.player] = 0
        assistMap[a.player] += a.assists
      })
    })

  return Object.entries(assistMap)
    .map(([name, assists]) => ({ name, assists }))
    .sort((a, b) => b.assists - a.assists)
    .slice(0, limit)
}

export async function getMvpRanking(limit = 5) {
  const matches = await getMatches()
  const mvpMap: Record<string, number> = {}
  matches
    .filter((m) => m.status === "jugado" && m.mvp)
    .forEach((match) => {
      if (!mvpMap[match.mvp!]) mvpMap[match.mvp!] = 0
      mvpMap[match.mvp!] += 1
    })

  return Object.entries(mvpMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00")
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  const formatted = date.toLocaleDateString("es-AR", options)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00")
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }
  return date.toLocaleDateString("es-AR", options)
}
