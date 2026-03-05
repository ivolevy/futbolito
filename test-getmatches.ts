import { getMatches } from "./lib/data"

async function run() {
  const matches = await getMatches()
  const p = matches.find(m => m.id === "match-001" || m.status === "jugado")
  console.log(JSON.stringify(p, null, 2))
}
run()
