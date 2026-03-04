import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

if (supabaseUrl === "https://placeholder.supabase.co") {
    console.warn("⚠️ Supabase URL is missing! Using placeholder. Check your .env.local file.")
} else {
    console.log("✅ Supabase client initialized with URL:", supabaseUrl)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
