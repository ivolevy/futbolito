import { getMatches } from "./lib/data"
import { supabase } from "./lib/supabase"

async function run() {
  const matches = await getMatches()
  console.log(JSON.stringify(matches, null, 2))
}
run()
