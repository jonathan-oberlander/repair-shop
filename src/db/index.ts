import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

config({ path: '.env.local' })

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const sql = neon(process.env.DATABASE_URL!)

// logger
const db = drizzle(sql, { logger: true })

export { db }
