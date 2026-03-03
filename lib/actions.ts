"use server"

import { supabase } from "./supabase"
import { revalidatePath } from "next/cache"

export async function addMatch(match: any) {
    const { data, error } = await supabase.from("matches").insert(match).select()
    if (error) throw error
    revalidatePath("/")
    revalidatePath("/partidos")
    return data
}

export async function updateMatch(id: string, updates: any) {
    const { data, error } = await supabase.from("matches").update(updates).eq("id", id).select()
    if (error) throw error
    revalidatePath("/")
    revalidatePath("/partidos")
    return data
}

export async function deleteMatch(id: string) {
    const { error } = await supabase.from("matches").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/")
    revalidatePath("/partidos")
}

export async function addVenue(venue: any) {
    const { data, error } = await supabase.from("venues").insert(venue).select()
    if (error) throw error
    revalidatePath("/canchas")
    return data
}

export async function updateVenue(id: string, updates: any) {
    const { data, error } = await supabase.from("venues").update(updates).eq("id", id).select()
    if (error) throw error
    revalidatePath("/canchas")
    return data
}

export async function deleteVenue(id: string) {
    const { error } = await supabase.from("venues").delete().eq("id", id)
    if (error) throw error
    revalidatePath("/canchas")
}
