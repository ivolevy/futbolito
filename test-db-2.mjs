import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase.from("matches").select("*")
  if (error) {
    console.error("Error fetching matches:", error)
  } else {
    console.log(JSON.stringify(data[0].team_a, null, 2))
    console.log("Team A type from DB:", typeof data[0].team_a)
    console.log("Is array?", Array.isArray(data[0].team_a))
  }
}
run()
