import pg from 'pg'
const { Pool } = pg
import 'dotenv/config'

 
export const pool = new Pool({
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
})
const { rows } = result; 
  res.json(rows);
 
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})