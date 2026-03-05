require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase.from('matches').select('*').eq('id', 'match-001');
  if (error) console.error(error);
  
  const m = data[0];
  console.log("Raw team_a:", m.team_a);
  
  let parsedA = [];
  if (typeof m.team_a === 'string') {
    parsedA = JSON.parse(m.team_a);
  } else if (Array.isArray(m.team_a)) {
    parsedA = m.team_a;
  }
  
  console.log("Parsed A:", parsedA);
  console.log("Length A:", parsedA.length);
}
run();
