import { config } from "dotenv"
config({ path: ".env.local" })
import { supabase } from "./lib/supabase"

async function run() {
  const { data } = await supabase.from("matches").select("*").eq("id", "match-001");
  console.log("Team A raw:", data![0].team_a)
  console.log("Team A type:", typeof data![0].team_a)
}
run()
