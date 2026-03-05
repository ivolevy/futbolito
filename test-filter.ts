import { getMatches } from "./lib/data"

async function run() {
  const matches = await getMatches()
  const year = 2026
  const month = 2
  const monthMatches = matches.filter(m => {
    const d = new Date(m.date + "T12:00:00")
    return d.getFullYear() === year && d.getMonth() === month
  })
  
  const matchStr = "2026-03-03"
  const m = monthMatches.find(x => x.date === matchStr)
  console.log("calendar filter result:", m)
}
run()
