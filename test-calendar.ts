import { getMatches } from "./lib/data"

async function run() {
  const matches = await getMatches()
  console.log("Matches:", matches.map(m => m.date))
  const year = 2026
  const month = 2
  const monthMatches = matches.filter(m => {
      const d = new Date(m.date + "T12:00:00")
      return d.getFullYear() === year && d.getMonth() === month
  })
  console.log("Month Matches:", monthMatches)
  
  const searchStr = "2026-03-03"
  console.log("Match for '2026-03-03':", monthMatches.find(m => m.date === searchStr))
}
run()
