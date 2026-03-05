import { getMatches } from "./lib/data"

async function run() {
  const matches = await getMatches()
  console.log("Found matches:", matches.length)
  console.log("Match [0]:", matches[0])
}
run()
