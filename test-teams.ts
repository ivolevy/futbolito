import { getMatches } from "./lib/data"

async function run() {
  const matches = await getMatches()
  const m = matches.find(x => x.id === "match-001")
  console.log("Team A length:", m?.teamA.length)
  console.log("Team A contents:", m?.teamA)
}
run()
